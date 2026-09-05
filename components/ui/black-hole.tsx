"use client";

import { useEffect, useRef } from "react";

const VERTEX_SRC = `#version 300 es
in vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// A ray-marched gravitational-lensing shader: light bends as it passes near
// the hole, so the far side of the accretion disk is lensed into a ring that
// wraps above and below the event horizon. Camera orbits on drag.
const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_azimuth;
uniform float u_elevation;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.55;
  }
  return v;
}

vec3 stars(vec3 dir) {
  vec3 col = vec3(0.0);
  vec2 uv = dir.xy / (1.0 + abs(dir.z)) * 3.0;
  for (int layer = 0; layer < 2; layer++) {
    float scale = layer == 0 ? 42.0 : 90.0;
    vec2 cell = floor(uv * scale);
    float h = hash(cell + float(layer) * 17.0);
    if (h > 0.986) {
      vec2 f = fract(uv * scale) - 0.5;
      float star = smoothstep(0.10, 0.0, length(f));
      float tw = 0.6 + 0.4 * sin(u_time * (1.5 + h * 4.0) + h * 30.0);
      col += vec3(star * tw * (0.7 + 0.3 * h));
    }
  }
  return col;
}

// Accretion-disk shading: hot near the horizon fading to deep orange at the
// outer edge, streaked with sheared turbulent flow lines, brightened on the
// approaching (Doppler-blueshifted) side and dimmed on the receding side.
vec3 diskColor(float r, float innerR, float outerR, float theta, float dopplerSide) {
  float frac = clamp((r - innerR) / (outerR - innerR), 0.0, 1.0);
  vec3 hot    = vec3(1.05, 1.02, 0.96);
  vec3 amber  = vec3(1.00, 0.74, 0.40);
  vec3 orange = vec3(0.95, 0.42, 0.16);
  vec3 deep   = vec3(0.42, 0.10, 0.05);
  vec3 col = mix(hot, amber, smoothstep(0.0, 0.4, frac));
  col = mix(col, orange, smoothstep(0.3, 0.7, frac));
  col = mix(col, deep, smoothstep(0.6, 1.0, frac));

  // Sheared streaks: stretched along theta, drifting inward over time.
  vec2 flowUv = vec2(theta * 2.4, r * 1.6 - u_time * 0.22);
  float streak = fbm(flowUv * vec2(3.0, 1.0));
  float fine = fbm(flowUv * vec2(9.0, 2.2) + 4.0);
  float texture = streak * 0.6 + fine * 0.4;
  col *= 0.55 + 0.85 * texture;

  float innerGlow = smoothstep(innerR + 0.55, innerR, r);
  col += hot * innerGlow * 1.6;

  float outerFade = smoothstep(outerR, outerR - 0.7, r);
  col *= mix(0.08, 1.0, outerFade);

  // Doppler beaming: the side rotating toward the camera reads brighter/whiter.
  float doppler = mix(0.45, 1.9, 0.5 + 0.5 * dopplerSide);
  col *= doppler;

  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  // Orbit camera: distance scales up on narrow/portrait viewports so the
  // hole never swallows the frame; azimuth/elevation are drag-controlled.
  float aspect = u_resolution.x / u_resolution.y;
  float distScale = max(1.0, 1.5 / max(aspect, 0.001));
  float dist = 9.5 * distScale;
  float az = u_azimuth;
  float el = u_elevation;

  vec3 camPos = dist * vec3(sin(az) * cos(el), sin(el), -cos(az) * cos(el));
  vec3 fwd = normalize(-camPos);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  float fov = 0.85;
  vec3 dir = normalize(fwd + uv.x * fov * right + uv.y * fov * up);

  vec3 pos = camPos;
  float horizonR = 1.0;
  float innerDiskR = 1.5;
  float outerDiskR = 3.1;
  float bendStrength = 0.6;

  vec3 result = vec3(0.0);
  bool hitDisk = false;
  bool hitHorizon = false;
  float minDist = 1000.0;
  float dt = 0.12;

  for (int i = 0; i < 200; i++) {
    float r = length(pos);
    minDist = min(minDist, r);
    if (r < horizonR) { hitHorizon = true; break; }
    if (r > 50.0) break;

    vec3 accel = -normalize(pos) * (bendStrength / (r * r));
    vec3 newDir = normalize(dir + accel * dt);

    vec3 prevPos = pos;
    pos += newDir * dt;
    dir = newDir;

    if (sign(prevPos.y) != sign(pos.y) && !hitDisk) {
      float t = prevPos.y / (prevPos.y - pos.y);
      vec3 hitPos = mix(prevPos, pos, t);
      float rHit = length(hitPos.xz);
      if (rHit > innerDiskR && rHit < outerDiskR) {
        float theta = atan(hitPos.z, hitPos.x) + u_time * 0.15;
        // approaching side of the disk (Keplerian rotation direction) reads brighter
        float dopplerSide = sin(theta);
        vec3 c = diskColor(rHit, innerDiskR, outerDiskR, theta, dopplerSide);
        float edgeOn = 1.0 - abs(newDir.y) * 0.55;
        result = c * edgeOn;
        hitDisk = true;
      }
    }

    dt = min(dt * 1.01, 0.4);
  }

  vec3 color;
  if (hitHorizon) {
    color = vec3(0.0);
  } else if (hitDisk) {
    color = result;
  } else {
    color = stars(dir) + vec3(0.008, 0.006, 0.011);
  }

  // Photon ring: driven by the true closest approach during the whole flight
  // (not the chaotic final position), so it reads as a clean, stable ring
  // instead of streaking artifacts.
  if (!hitHorizon) {
    float ring = smoothstep(horizonR * 1.34, horizonR * 1.0, minDist);
    color += vec3(1.05, 0.98, 0.88) * ring * ring * 1.1;
  }

  float vignette = 1.0 - smoothstep(0.75, 1.5, length(uv));
  color *= mix(0.85, 1.0, vignette);

  fragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // eslint-disable-next-line no-console
    console.error("[BlackHole] shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export type BlackHoleProps = {
  className?: string;
};

/**
 * A ray-marched gravitational-lensing black hole (WebGL2), draggable to
 * orbit. Falls back to a plain black canvas if WebGL2 is unavailable.
 * Freezes to a single frame under prefers-reduced-motion (drag still works).
 */
export function BlackHole({ className }: BlackHoleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrap = canvas.parentElement;
    if (!wrap) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl2", {
      antialias: true,
      preserveDrawingBuffer: true,
    });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error("[BlackHole] program link error:", gl.getProgramInfoLog(program));
      return;
    }

    const posLoc = gl.getAttribLocation(program, "a_pos");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_azimuth = gl.getUniformLocation(program, "u_azimuth");
    const u_elevation = gl.getUniformLocation(program, "u_elevation");

    // Orbit state — drag to rotate, defaults to a fixed 3/4 view.
    const baseElevation = 0.30;
    let azimuth = -0.35;
    let elevation = baseElevation;
    let targetAzimuth = azimuth;
    let targetElevation = elevation;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let autoDrift = !reduceMotion;

    function clampElevation(e: number) {
      return Math.min(0.95, Math.max(-0.3, e));
    }

    function pointerDown(e: PointerEvent) {
      dragging = true;
      autoDrift = false;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas!.style.cursor = "grabbing";
      canvas!.setPointerCapture(e.pointerId);
    }
    function pointerMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetAzimuth -= dx * 0.006;
      targetElevation = clampElevation(targetElevation + dy * 0.006);
      // Render synchronously on the drag itself — don't depend solely on the
      // rAF loop, which browsers can throttle/pause for backgrounded tabs.
      azimuth = targetAzimuth;
      elevation = targetElevation;
      render(performance.now());
    }
    function pointerUp(e: PointerEvent) {
      dragging = false;
      canvas!.style.cursor = "grab";
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    let raf = 0;
    let disposed = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let W = 0,
      H = 0;

    function resizeCanvas() {
      const rect = wrap!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = Math.max(1, Math.round(rect.width * dpr));
      H = Math.max(1, Math.round(rect.height * dpr));
      canvas!.width = W;
      canvas!.height = H;
      canvas!.style.width = rect.width + "px";
      canvas!.style.height = rect.height + "px";
      gl!.viewport(0, 0, W, H);
    }

    function render(t: number) {
      azimuth += (targetAzimuth - azimuth) * 0.12;
      elevation += (targetElevation - elevation) * 0.12;
      if (autoDrift) {
        targetAzimuth -= 0.0009;
      }
      // Reduced motion: freeze the disk's time-based animation (streaks,
      // star twinkle, auto-drift) but keep responding to the user's own drag.
      const shaderTime = reduceMotion ? 0 : t / 1000;
      gl!.useProgram(program);
      gl!.bindVertexArray(vao);
      gl!.uniform2f(u_resolution, W, H);
      gl!.uniform1f(u_time, shaderTime);
      gl!.uniform1f(u_azimuth, azimuth);
      gl!.uniform1f(u_elevation, elevation);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function loop(t: number) {
      render(t);
      raf = requestAnimationFrame(loop);
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (disposed) return;
        resizeCanvas();
      }, 120);
    }

    let ro: ResizeObserver | undefined;

    try {
      resizeCanvas();
      autoDrift = !reduceMotion;
      canvas.style.cursor = "grab";
      canvas.style.touchAction = "none";
      canvas.addEventListener("pointerdown", pointerDown);
      canvas.addEventListener("pointermove", pointerMove);
      canvas.addEventListener("pointerup", pointerUp);
      canvas.addEventListener("pointercancel", pointerUp);

      // Always run the loop — dragging must keep working even when
      // prefers-reduced-motion disables the ambient animation.
      raf = requestAnimationFrame(loop);
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(handleResize);
        ro.observe(wrap);
      } else {
        window.addEventListener("resize", handleResize);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[BlackHole] render setup failed:", err);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro?.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      if (vao) gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", background: "#000" }}
    />
  );
}

export default BlackHole;
