import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MEMORIES = [
  {
    title: 'Our First Long Walk',
    date: 'July 13, 2025',
    description: '',
    image: import.meta.env.BASE_URL + 'assets/5/Shov.jpeg',
  },
  {
    title: 'Our 5/10 Wala Special Day 👉👈',
    date: 'March 25',
    description: '',
    image: import.meta.env.BASE_URL + 'assets/5/10.jpeg',
  },
  {
    title: 'First Time Hedua Tour',
    date: 'May 14, 2026',
    description: '',
    image: import.meta.env.BASE_URL + 'assets/hedua.jpeg',
  },
  {
    title: 'First Time Hath Dia khaiya Deoa',
    date: 'May 20, 2026',
    description: '',
    image: import.meta.env.BASE_URL + 'assets/Hath.jpeg',
  },
  {
    title: 'First Time Bel Ful Deoa',
    date: 'May 20, 2026',
    description: '',
    image: import.meta.env.BASE_URL + 'assets/bel.jpg',
  },
  {
    title: 'Best of the best',
    date: 'Tor satha katano Protita Muhurtoo',
    description: 'Jar Kono Date naii...❤️',
    image: import.meta.env.BASE_URL + 'assets/5/US.jpeg',
  },
];

export default function MemoriesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="memories" className="section-padding relative z-10">
      <div className="content-container">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-20">
          <div className="divider-line mb-6" />
          <p className="text-blush-rose/50 font-body text-[10px] uppercase tracking-[0.3em] mb-6">
            Our journey
          </p>
          <h2
            className="font-display font-semibold text-cream/80"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2 }}
          >
            Beautiful Memories
          </h2>
          <p className="text-moonlight/30 font-body font-light text-sm mt-4 max-w-[360px] mx-auto" style={{ lineHeight: 1.7 }}>
            Every moment with you is a treasure I keep in my heart
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {MEMORIES.map((memory, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-cream/70 font-body text-[10px] uppercase tracking-[0.2em] mb-1">
                    {memory.date}
                  </p>
                  <p className="text-cream font-display text-lg">
                    {memory.title}
                  </p>
                </div>
              </div>
              {/* Title below image (visible always) */}
              <div className="mt-4 px-1">
                <p className="text-cream/50 font-body text-[10px] uppercase tracking-[0.2em]">
                  {memory.date}
                </p>
                <h3 className="text-cream/70 font-display text-base mt-1">
                  {memory.title}
                </h3>
                {memory.description ? (
                  <p className="text-moonlight/25 font-body font-light text-xs mt-1">
                    {memory.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
