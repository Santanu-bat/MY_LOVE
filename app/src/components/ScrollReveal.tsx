import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'down';
  distance?: number;
  duration?: number;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    };

    if (direction === 'up') fromVars.y = distance;
    if (direction === 'down') fromVars.y = -distance;
    if (direction === 'left') fromVars.x = distance;
    if (direction === 'right') fromVars.x = -distance;

    gsap.from(el, fromVars);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay, direction, distance, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
