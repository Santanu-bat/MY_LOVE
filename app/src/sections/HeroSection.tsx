import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      delay: 0.4,
      onComplete: () => setLoaded(true),
    });

    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.style.opacity = window.scrollY > 80 ? '0' : '1';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = () => {
    const el = document.querySelector('#letter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Loading Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-cosmic transition-none ${
          loaded ? 'pointer-events-none' : ''
        }`}
      >
        <div className="animate-pulse">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blush-rose/50">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 z-10 overflow-hidden">
        <div className="relative z-10 max-w-[800px] text-center flex flex-col items-center">
          {/* Elegant divider line */}
          <div
            ref={lineRef}
            className="w-12 h-[1px] bg-gradient-to-r from-transparent via-blush-rose/40 to-transparent mb-10"
            style={{ transformOrigin: 'center' }}
          />

          <p className="text-moonlight/50 font-body text-xs md:text-sm uppercase tracking-[0.35em] mb-8">
            Amar Priyo manush Tir jonno aktu Chithi
          </p>

          <h1
            ref={titleRef}
            className="font-display font-semibold text-cream/90 opacity-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            <span className="hero-shimmer animate-shimmer">
              Happy Birthday
            </span>
          </h1>

          <div
            ref={subtitleRef}
            className="font-accent mt-5 opacity-0 flex flex-col items-center gap-2"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            }}
          >
            <span
              className="text-blush-rose/90 drop-shadow-[0_0_14px_rgba(232,154,181,0.45)]"
              style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)' }}
            >
              My Chitra
            </span>

            <div className="flex items-center justify-center gap-2 text-[0.65em] md:text-[0.75em] tracking-[0.12em] whitespace-nowrap">
              <span className="text-blush-rose/45">My Minammmaa</span>
              <span className="text-blush-rose/45">My Chuchuuu</span>
              <span className="text-blush-rose/45">My Kuchupuuuu</span>
            </div>

            <span className="text-blush-rose/45 text-[0.65em] md:text-[0.75em] tracking-[0.12em] whitespace-nowrap text-center">
              Meli Raniii
            </span>
          </div>

          <p
            className="text-moonlight/60 font-body font-light mt-8 max-w-[520px] opacity-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            ref={(el) => {
              if (el) {
                setTimeout(() => {
                  gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
                }, 2000);
              }
            }}
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.0rem)',
              lineHeight: 1.9,
              letterSpacing: '0.02em',
            }}
          >
            Ajj ker ai din taa amar kachee koto taa koto taa special ami bola bojhata parbo naa.....Ajjjj amiii khuuub khuuub khuuub khushii karon ajjj Moner manush ar Jonmoo din.......Jee manush taa amar atoo atoo taa kachee Joto taa kachee see jana taar thakao oneeek taa kacheer....
          </p>

          <button
            ref={ctaRef}
            onClick={handleCtaClick}
            className="gradient-btn mt-12 opacity-0"
          >
            Begin
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-700"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-cream/20 text-[9px] uppercase tracking-[0.3em]">Scroll</span>
            <svg
              className="animate-bounce text-blush-rose/30"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
