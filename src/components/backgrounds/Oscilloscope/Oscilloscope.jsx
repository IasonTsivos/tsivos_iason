import { useEffect, useRef } from "react";
import "./Oscilloscope.css";

// Three white traces: the bright signal, a softer harmonic and a faint reference
const TRACES = [
  { color: "255, 255, 255", alpha: 0.9, width: 2, freq: 1, speed: 1.4, amp: 1, glow: 14 },
  { color: "255, 255, 255", alpha: 0.4, width: 1.5, freq: 2.3, speed: -0.9, amp: 0.55, glow: 8 },
  { color: "255, 255, 255", alpha: 0.18, width: 1, freq: 0.6, speed: 0.5, amp: 0.35, glow: 0 },
];

const GRID = 80;

/**
 * A scope screen: faint graticule with glowing signal traces.
 * `energyRef.current` (0 and up) swells the amplitude, e.g. with scroll velocity.
 * Runs only while visible; with reduced motion it draws a single still frame.
 */
const Oscilloscope = ({ energyRef, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = false;
    let energy = 0;
    let time = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const drawGrid = () => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.beginPath();
      for (let x = (width % GRID) / 2; x < width; x += GRID) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = (height % GRID) / 2; y < height; y += GRID) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // Centre axis with small ticks, like a real graticule
      const mid = Math.round(height / 2) + 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.09)";
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(width, mid);
      for (let x = 0; x < width; x += GRID / 5) {
        ctx.moveTo(x + 0.5, mid - 3);
        ctx.lineTo(x + 0.5, mid + 3);
      }
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      const mid = height / 2;
      const base = height * 0.08 * (1 + energy * 2.4);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      TRACES.forEach((trace) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const u = x / width;
          // Fade the signal in and out at the screen edges
          const envelope = Math.sin(Math.PI * u) ** 0.6;
          const k = u * Math.PI * 2 * trace.freq * 2.5;
          const wave =
            Math.sin(k + time * trace.speed) * 0.7 +
            Math.sin(k * 2.7 - time * trace.speed * 1.6) * 0.2 * (1 + energy) +
            Math.sin(k * 7.1 + time * 3) * 0.1 * energy;
          const y = mid + wave * base * trace.amp * envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = trace.width;
        ctx.strokeStyle = `rgba(${trace.color}, ${trace.alpha})`;
        ctx.shadowColor = `rgba(${trace.color}, 0.8)`;
        ctx.shadowBlur = trace.glow;
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
    };

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = Math.min(3, energyRef?.current ?? 0);
      energy += (target - energy) * (1 - Math.exp(-dt / 0.25));
      time += dt * (1 + energy * 1.5);
      draw();
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    observer.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro.disconnect();
    };
  }, [energyRef]);

  return <canvas ref={canvasRef} className={`oscilloscope ${className}`} aria-hidden="true" />;
};

export default Oscilloscope;
