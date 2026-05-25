import { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  size: number;
}

export default function GiftBoxSection() {
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const heartIdRef = useRef(0);

  const handleOpen = useCallback(() => {
    if (isOpened) return;

    const tl = gsap.timeline();

    tl.to(boxRef.current, {
      scale: 1.04,
      rotation: -3,
      duration: 0.05,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 5,
    });

    tl.to(boxRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.1,
    });

    tl.to(lidRef.current, {
      y: -60,
      rotationX: 25,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.out',
    });

    tl.call(() => {
      if (!boxRef.current) return;
      const rect = boxRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { x, y },
        colors: ['#e89ab5', '#f0b4c8', '#d4a5b5', '#f5ede4'],
        shapes: ['circle'],
        gravity: 0.8,
        scalar: 0.9,
        ticks: 80,
      });

      const hearts: FloatingHeart[] = [];
      for (let i = 0; i < 15; i++) {
        hearts.push({
          id: heartIdRef.current++,
          x: (Math.random() - 0.5) * 160,
          delay: Math.random() * 0.4,
          size: 10 + Math.random() * 12,
        });
      }
      setFloatingHearts(hearts);
    });

    tl.to(boxRef.current, {
      scale: 0.92,
      duration: 0.3,
      ease: 'power2.out',
    });

    tl.call(() => {
      setIsOpened(true);
      setShowMessage(true);
    });

    tl.fromTo(
      messageRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, [isOpened]);

  return (
    <section id="gift" className="min-h-[80vh] flex flex-col items-center justify-center section-padding relative z-10">
      <div className="content-container flex flex-col items-center">
        <div ref={headingRef} className="text-center mb-14">
          <div className="divider-line mb-6" />
          <p className="text-blush-rose/50 font-body text-[10px] uppercase tracking-[0.3em] mb-6">
            A surprise
          </p>
          <h2
            className="font-display font-semibold text-cream/80"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2 }}
          >
            Something Special
          </h2>
          <p className="text-moonlight/25 font-body font-light text-xs mt-4">
            {isOpened ? 'Your gift is revealed' : 'Tap to unwrap'}
          </p>
        </div>

        {/* Gift Box */}
        <div
          ref={boxRef}
          onClick={handleOpen}
          className={`relative cursor-pointer mb-10 ${!isOpened ? 'animate-gift-shake' : ''}`}
          style={{
            width: 'clamp(100px, 16vw, 140px)',
            height: 'clamp(100px, 16vw, 140px)',
            animationIterationCount: 'infinite',
            animationDuration: '3.5s',
            animationPlayState: isOpened ? 'paused' : 'running',
          }}
        >
          {/* Box Body */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(145deg, #c97a94, #a85e78)',
              boxShadow: '0 8px 30px rgba(200, 120, 150, 0.15)',
            }}
          />

          {/* Vertical Ribbon */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-6 rounded-sm"
            style={{ background: 'linear-gradient(180deg, #d4a5b5, #b08e9b)' }}
          />

          {/* Horizontal Ribbon */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-6 rounded-sm"
            style={{ background: 'linear-gradient(90deg, #d4a5b5, #b08e9b)' }}
          />

          {/* Lid */}
          <div
            ref={lidRef}
            className="absolute -top-2 left-0 right-0 rounded-lg"
            style={{
              height: '18%',
              background: 'linear-gradient(145deg, #d48aa8, #b56e8a)',
              transformOrigin: 'bottom center',
            }}
          />

          {/* Bow */}
          {!isOpened && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="flex gap-0.5">
                <div className="w-6 h-5 rounded-full border border-dusty-rose/60" style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent', transform: 'rotate(-25deg)' }} />
                <div className="w-6 h-5 rounded-full border border-dusty-rose/60" style={{ borderLeftColor: 'transparent', borderBottomColor: 'transparent', transform: 'rotate(25deg)' }} />
              </div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-dusty-rose/50" />
            </div>
          )}

          {/* Floating Hearts */}
          {floatingHearts.map((h) => (
            <div
              key={h.id}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 pointer-events-none"
              style={{ animation: `heart-float 2.5s ease-out ${h.delay}s forwards` }}
            >
              <svg
                width={h.size}
                height={h.size}
                viewBox="0 0 24 24"
                fill="#e89ab5"
                style={{ transform: `translateX(${h.x}px)`, opacity: 0.6 }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          ))}
        </div>

        {/* Surprise Message */}
        {showMessage && (
          <div
            ref={messageRef}
            className="glass-card rounded-3xl p-8 md:p-12 max-w-[460px] w-full text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="animate-pulse"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="rgba(232, 154, 181, 0.06)"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <p className="font-accent text-blush-rose/70 text-2xl md:text-3xl relative z-10">
              Gift Ta Kii...?</p>
            <div className="w-8 h-[1px] bg-blush-rose/20 mx-auto my-6" />
            <p className="text-moonlight/40 font-body font-light leading-[1.9] relative z-10" style={{ fontSize: '0.88rem' }}>
              Jani naa koto taa boro Gift ata kintu Ai manush amar life aa sob thaka boro Sob thaka priyoo tumii agao bolachee tar jonno basi kichu naa ami amar sob taa rakha diachee tar kachee ar koyekta choto choto promise atae amar torof thaka tomar Kachee akta choto gift....
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
