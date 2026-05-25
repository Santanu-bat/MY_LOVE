import { forwardRef, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  { text: "Tor amar Dika Raga Takano", num: "01" },
  { text: "Tor Ak gaal hasi HAHAHAHAHAHA amon taaa", num: "02" },
  { text: "Tor Kajol Pora Chokh", num: "03" },
  { text: "Tor Lomba Sundor Kalo Chul", num: "04" },
  { text: "Tor Kotha Bolaa", num: "05" },
  { text: "Holud Saree pora Toka", num: "06" },
  { text: "Tor Mon Khula Bachaa Tuii", num: "07" },
  { text: "Tor Amake Boka Deoa", num: "08" },
  { text: "Tor sob kichuu rr Jonno", num: "09" },
  { text: "Ar je bhaba Ai Pagol Chalatake Bujha nis tar jonno", num: "10" },
];

const ReasonCard = forwardRef<HTMLButtonElement, { reason: typeof REASONS[0]; onReveal: () => void }>(function ReasonCard(
  { reason, onReveal },
  ref
) {
  const [revealed, setRevealed] = useState(false);

  const handleClick = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    onReveal();
  }, [revealed, onReveal]);

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`group relative w-full text-left p-6 md:p-8 rounded-2xl transition-all duration-700 cursor-pointer ${
        revealed
          ? 'bg-blush-rose/15 border border-blush-rose/30 shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
          : 'bg-white/[0.06] border border-white/10 hover:bg-white/[0.09] hover:border-blush-rose/25'
      }`}
    >
      {/* Number */}
      <span className={`font-display text-2xl transition-colors duration-700 ${
        revealed ? 'text-cream/85' : 'text-cream/30 group-hover:text-cream/55'
      }`}>
        {reason.num}
      </span>

      {/* Content */}
      <div className="mt-3">
        {!revealed ? (
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blush-rose/60" />
            <span className="text-cream/45 font-body text-xs font-medium tracking-[0.16em] uppercase">
              Click to reveal
            </span>
          </div>
        ) : (
          <p className="text-cream/90 font-body font-medium text-sm leading-relaxed transition-all duration-700">
            {reason.text}
          </p>
        )}
      </div>

      {/* Subtle glow on reveal */}
      {revealed && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blush-rose/5 to-transparent pointer-events-none" />
      )}
    </button>
  );
});

export default function ReasonsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          y: 25,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad, { once: true });

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  const handleReveal = useCallback(() => {
    setRevealedCount((c) => c + 1);
  }, []);

  return (
    <section id="reasons" className="section-padding relative z-10">
      <div className="content-container">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="divider-line mb-6" />
          <p className="text-blush-rose/50 font-body text-[10px] uppercase tracking-[0.3em] mb-6">
            {revealedCount > 0 ? `${revealedCount} of ${REASONS.length} revealed` : 'Discover'}
          </p>
          <h2
            className="font-display font-semibold text-cream/80"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2 }}
          >
            What Do I Like ?
          </h2>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {REASONS.map((reason, i) => (
            <div
              key={i}
              className={i === REASONS.length - 1 ? 'lg:col-start-2' : ''}
            >
              <ReasonCard
                reason={reason}
                onReveal={handleReveal}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
