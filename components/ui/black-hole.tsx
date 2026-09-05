"use client";

import { useEffect, useRef } from "react";

const VERTEX_SRC = `#version 300 es
in vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// A lightweight ray-marched gravitational-lensing shader: light rays bend as
// they pass near the hole, so the far side of the accretion disk is lensed
// into a ring that wraps above and below the event horizon — the classic
// "Interstellar" look — rather than a disk that's simply hidden behind it.
const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Procedural starfield sampled by ray direction.
vec3 stars(vec3 dir) {
  vec3 col = vec3(0.0);
  vec2 uv = dir.xy / (1.0 + abs(dir.z)) * 3.0;
  for (int layer = 0; layer < 2; layer++) {
    float scale = layer == 0 ? 42.0 : 90.0;
    vec2 cell = floor(uv * scale);
    float h = hash(cell + float(layer) * 17.0);
    if (h > 0.986) {
      vec2 f = fract(uv * scale) - 0.5;
      float d = length(f);
      float star = smoothstep(0.10, 0.0, d);
      float tw = 0.6 + 0.4 * sin(u_time * (1.5 + h * 4.0) + h * 30.0);
      col += vec3(star * tw * (0.7 + 0.3 * h));
    }
  }
  return col;
}

// Warm-to-cool accretion-disk color ramp with fine concentric banding.
vec3 diskColor(float r, float innerR, float outerR, float theta) {
  float frac = clamp((r - innerR) / (outerR - innerR), 0.0, 1.0);
  vec3 hot   = vec3(1.00, 0.98, 0.90);
  vec3 amber = vec3(1.00, 0.78, 0.42);
  vec3 orange= vec3(1.00, 0.45, 0.18);
  vec3 deep  = vec3(0.55, 0.12, 0.06);
  vec3 col = mix(hot, amber, smoothstep(0.0, 0.35, frac));
  col = mix(col, orange, smoothstep(0.25, 0.65, frac));
  col = mix(col, deep, smoothstep(0.55, 1.0, frac));

  float bands = 0.5 + 0.5 * sin(r * 5.0 - u_time * 1.4 + sin(theta * 6.0) * 0.6);
  col *= 0.72 + 0.5 * bands;

  float innerGlow = smoothstep(innerR + 0.9, innerR, r);
  col += hot * innerGlow * 1.4;

  float outerFade = smoothstep(outerR, outerR - 1.2, r);
  col *= mix(0.15, 1.0, outerFade);

  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  // Camera: looking slightly down at the disk. Pulled back further on
  // portrait/narrow viewports (mobile) so the hole doesn't swallow the frame.
  float aspect = u_resolution.x / u_resolution.y;
  float distScale = max(1.0, 1.6 / max(aspect, 0.001));
  vec3 camPos = vec3(0.0, 1.35 * distScale, -6.2 * distScale);
  vec3 fwd = normalize(vec3(0.0, -0.16, 1.0));
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  float fov = 1.15;
  vec3 dir = normalize(fwd + uv.x * fov * right + uv.y * fov * up);

  vec3 pos = camPos;
  float horizonR = 1.0;
  float innerDiskR = 1.55;
  float outerDiskR = 4.6;
  float bendStrength = 0.6;

  vec3 result = vec3(0.0);
  bool hitDisk = false;
  bool hitHorizon = false;
  float dt = 0.14;

  for (int i = 0; i < 170; i++) {
    float r = length(pos);
    if (r < horizonR) { hitHorizon = true; break; }
    if (r > 40.0) break;

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
        float theta = atan(hitPos.z, hitPos.x) + u_time * 0.18;
        vec3 c = diskColor(rHit, innerDiskR, outerDiskR, theta);
        float edgeOn = 1.0 - abs(newDir.y) * 0.6;
        result = c * edgeOn;
        hitDisk = true;
      }
    }

    dt = min(dt * 1.012, 0.5);
  }

  vec3 color;
  if (hitHorizon) {
    color = vec3(0.0);
  } else if (hitDisk) {
    color = result;
  } else {
    color = stars(dir) + vec3(0.01, 0.008, 0.014);
  }

  // Photon-ring boost: rays that grazed close to the horizon without falling
  // in read as a bright rim even when they didn't cross the disk.
  float closest = length(pos);
  float ring = smoothstep(horizonR * 1.55, horizonR * 1.02, closest);
  if (!hitHorizon) {
    color += vec3(1.0, 0.92, 0.78) * ring * ring * 0.9;
  }

  float vignette = 1.0 - smoothstep(0.7, 1.35, length(uv));
  color *= mix(0.82, 1.0, vignette);

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
 * A ray-marched gravitational-lensing black hole (WebGL2): the accretion
 * disk's far side bends into a ring above and below the event horizon.
 * Falls back to a plain black canvas if WebGL2 or shader compilation is
 * unavailable. Freezes to a single frame under prefers-reduced-motion.
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
      gl!.useProgram(program);
      gl!.bindVertexArray(vao);
      gl!.uniform2f(u_resolution, W, H);
      gl!.uniform1f(u_time, t / 1000);
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
        if (reduceMotion) render(0);
      }, 120);
    }

    let ro: ResizeObserver | undefined;

    try {
      resizeCanvas();
      if (reduceMotion) {
        render(0);
      } else {
        raf = requestAnimationFrame(loop);
      }
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
      aria-hidden="true"
    />
  );
}

export default BlackHole;
