'use client';

import { useEffect, useRef } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
      o: Math.random(),
      speed: Math.random() * 0.02,
    }));

    let animId: number;
    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 244, 248, ${s.o})`;
        ctx.fill();
        s.o += s.speed;
        if (s.o > 0.8) s.o = 0.1;
      });
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] text-center px-4">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      <div className="relative z-10">
        <h1
          className="text-5xl sm:text-6xl font-bold tracking-tight mb-4"
          style={{
            background: 'linear-gradient(135deg, #F0F4F8 0%, #38BDF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SQUAD
        </h1>

        <p className="text-lg text-lunar max-w-md mx-auto mb-10 leading-relaxed">
          Mission Control for Founders.
          <br />
          Your AI team builds while you steer.
        </p>

        <button
          onClick={onStart}
          className="bg-aurora text-void font-semibold px-8 py-4 rounded-full text-base hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
        >
          Enter Mission Control →
        </button>

        <div className="mt-12 flex items-center gap-6 text-sm text-nebula">
          <div className="flex items-center gap-2">
            <span className="text-aurora">●</span> 8 AI Specialists
          </div>
          <div className="flex items-center gap-2">
            <span className="text-success">●</span> Zero Jargon
          </div>
          <div className="flex items-center gap-2">
            <span className="text-dawn">●</span> Start Free
          </div>
        </div>
      </div>
    </div>
  );
}
