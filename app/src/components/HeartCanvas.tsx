import { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  amp: number;
  freq: number;
  opacity: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

const COLORS = ['#e89ab5', '#f0b4c8', '#d4a5b5', '#b08e9b'];

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string,
  opacity: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
  ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.2, 0, size);
  ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.2, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
  ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HeartParticle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 60;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 3 + Math.random() * 8,
        speedY: 0.15 + Math.random() * 0.5,
        amp: 0.2 + Math.random() * 0.8,
        freq: 0.003 + Math.random() * 0.008,
        opacity: 0.05 + Math.random() * 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: 0.001 + Math.random() * 0.004,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(p.y * p.freq) * p.amp;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }

        drawHeart(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
