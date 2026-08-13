import { Sparkles } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GenerateProps = {
  handleGeneratePlaylist: (event: React.FormEvent<HTMLFormElement>) => void;
  moodText: string;
  setMoodText: (value: string) => void;
  isLoading: boolean;
  currentStepIndex: number;
  error: string;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

const STEPS = [
  "Understanding your mood",
  "Finding the perfect tracks",
  "Crafting your playlist",
  "Almost ready...",
];

export default function GeneratePromptForm({
  handleGeneratePlaylist,
  moodText,
  setMoodText,
  isLoading,
  currentStepIndex,
  error,
}: GenerateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (particlesRef.current.length === 0) {
      const count = 40;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.2 + 0.1,
        targetAlpha: Math.random() * 0.3 + 0.1,
      }));
    }

    const drawLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hasText = moodText.trim().length > 0;
      const speedModifier = isLoading ? 3.5 : hasText ? 1.8 : 1.0;

      particlesRef.current.forEach((p) => {
        p.x += p.vx * speedModifier;
        p.y += p.vy * speedModifier;

        p.alpha += (p.targetAlpha - p.alpha) * 0.01;
        if (Math.abs(p.alpha - p.targetAlpha) < 0.02) {
          p.targetAlpha = Math.random() * (isLoading ? 0.6 : 0.3) + 0.1;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`;
        ctx.shadowBlur = isLoading ? 10 : 4;
        ctx.shadowColor = "#22c55e";
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoading, moodText]);

  return (
    /* Make the prompt area fixed in the viewport (between Topbar & Player)
       and allow internal scrolling while preventing the page from showing
       vertical scrollbars. Responsive offsets keep it aligned with the
       sidebar/right panel on larger screens. */
    <section
      ref={containerRef}
      className="fixed top-[72px] right-0 bottom-[88px] left-0 z-40 flex touch-none items-center justify-center overflow-hidden select-none md:left-64 xl:right-80"
    >
      {/* High-Performance Particle Engine Layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      />
      {/* Subtle Radial Visual Anchor Accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-[120px]" />
      <div className="relative z-10 flex max-h-full w-full max-w-2xl flex-col items-center justify-center overflow-auto px-6">
        <AnimatePresence mode="wait">
          {!isLoading ? (
            /* --- IDLE INPUT STATE --- */
            <motion.div
              key="prompt-entry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-center space-y-8 overflow-hidden text-center"
            >
              <div className="space-y-2.5">
                <h1 className="text-base font-bold tracking-tight text-zinc-100 sm:text-2xl md:text-base xl:text-3xl">
                  How are you feeling today?
                </h1>
                <p className="l:text-base text-xs font-medium tracking-tight text-zinc-400 sm:text-base md:text-base">
                  Tell our AI the vibe, and let us create the perfect soundtrack
                  for you.
                </p>
              </div>

              <form
                onSubmit={handleGeneratePlaylist}
                className="group relative w-full"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/0 opacity-40 blur-sm transition duration-500 group-focus-within:opacity-100" />

                <div className="relative flex items-center rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-2 pl-5 backdrop-blur-xl transition-all duration-300 focus-within:border-green-500/40">
                  <input
                    type="text"
                    value={moodText}
                    onChange={(event) => setMoodText(event.target.value)}
                    placeholder="For example: I feel stressed after a long day and need calm music."
                    maxLength={500}
                    className="w-full bg-transparent pr-4 text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={moodText.trim().length < 3}
                    className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold whitespace-nowrap text-black shadow-lg shadow-green-500/10 transition-all duration-200 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Sparkles size={16} />
                    <span>Generate playlist</span>
                  </button>
                </div>
              </form>

              <p className="text-xs tracking-wide text-zinc-500">
                Try describing your energy, vibe, or the feeling you want to
                carry with you.
              </p>
            </motion.div>
          ) : (
            /* --- ACTIVE SYSTEM GENERATION LOADING STATE --- */
            <motion.div
              key="orchestration-pipeline"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center space-y-6 overflow-hidden py-8"
            >
              <div className="flex flex-col items-start gap-4">
                {STEPS.map((step, idx) => {
                  const isFinished = currentStepIndex > idx;
                  const isActive = currentStepIndex === idx;

                  return (
                    <motion.div
                      key={step}
                      animate={{
                        opacity: isActive ? 1 : isFinished ? 0.35 : 0.12,
                        x: isActive ? 4 : 0,
                      }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-4"
                    >
                      <div className="relative flex h-5 w-5 items-center justify-center">
                        {isFinished ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-md shadow-green-500/50"
                          />
                        ) : isActive ? (
                          <>
                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                          </>
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-zinc-700" />
                        )}
                      </div>

                      <span
                        className={`text-base font-medium tracking-wide ${isActive ? "text-green-400" : "text-zinc-300"}`}
                      >
                        {step}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <div className="animate-fade-in absolute right-6 bottom-6 left-6 z-20 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400 backdrop-blur-md">
          {error}
        </div>
      )}
    </section>
  );
}
