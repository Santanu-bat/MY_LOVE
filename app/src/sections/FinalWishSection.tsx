import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalWishSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll('.reveal-item');
      if (elements) {
        gsap.from(elements, {
          y: 25,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-32 md:py-40 lg:py-52 relative z-10">
      <div className="content-container max-w-[600px] text-center">
        {/* Divider */}
        <div className="reveal-item divider-line mb-12" />

        {/* Quote */}
        <div className="reveal-item">
          <p
            className="font-accent text-rose-gold/50 italic leading-relaxed"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.5 }}
          >
            "In all the world, there is no heart for me like yours. In all the
            world, there is no love for you like mine."
          </p>
        </div>

        {/* Closing Message */}
        <div className="reveal-item mt-12">
          <p className="text-moonlight/25 font-body font-light leading-[1.9] max-w-[480px] mx-auto" style={{ fontSize: '0.85rem' }}>
            Happy Birthday, my love. May this year bring you as much happiness
            as you've brought into my life. I am so grateful for every moment
            with you. Here's to celebrating you today, tomorrow, and always.
          </p>
        </div>

        {/* Signature */}
        <div className="reveal-item mt-10">
          <p className="font-accent text-blush-rose/40" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)' }}>
            With all my love,
          </p>
          <div className="font-accent text-blush-rose/40 mt-1 space-y-1" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)' }}>
            <p>Your Totla</p>
            <p>Your Biya Paglu</p>
            <p>❤️ Your Beyadob Chela ❤️</p>
          </div>
        </div>

        {/* Back to Top */}
        <div className="reveal-item mt-16">
          <button
            onClick={handleBackToTop}
            className="w-10 h-10 rounded-full border border-blush-rose/15 bg-blush-rose/5 flex items-center justify-center mx-auto hover:bg-blush-rose/10 hover:border-blush-rose/25 transition-all duration-500 hover:scale-105"
            aria-label="Back to top"
          >
            <svg
              className="text-blush-rose/30"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>

        {/* Footer Note */}
        <div className="reveal-item mt-20">
          <p className="text-cream/10 font-body text-[10px] tracking-[0.3em]">
            Made with love
          </p>
        </div>
      </div>
    </section>
  );
}
