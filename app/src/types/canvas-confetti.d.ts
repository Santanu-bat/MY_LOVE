declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: ('circle' | 'square' | 'star')[];
    gravity?: number;
    scalar?: number;
    ticks?: number;
    startVelocity?: number;
    decay?: number;
    drift?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
    resize?: boolean;
    useWorker?: boolean;
  }

  function confetti(options?: ConfettiOptions): Promise<void>;
  export default confetti;
}
