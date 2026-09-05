'use client';

import { useEffect, useRef } from 'react';
import { createRenderer } from './black-hole-utils/renderer';

export function BlackHole({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createRenderer({ canvas });
    void renderer.ready;

    return () => renderer.dispose();
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black${className ? ` ${className}` : ''}`}>
      <canvas ref={canvasRef} className="block h-full w-full touch-none" />
    </div>
  );
}

export default BlackHole;
