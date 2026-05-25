import { useState, useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  {
    question: 'Amar Tor Sob thaka Kii Pochondoo...???',
    options: ['Tor Hasii', 'Tor Chokh', 'Tor Sundor Chul', 'Amar Puroo Minamma ta kaaa'],
    correct: 3,
  },
  {
    question: 'Amar Priyo Chobi...?',
    options: ['Merun Saree Pora Toka', 'Holud Saree Pora Toka', "Kalo Sada Pora Saree toka", 'Ghiyaa Saree Pora Toka'],
    correct: 1,
  },
  {
    question: 'Amader Sob thaka Priyo Jaigaa',
    options: ['Shyambazar', 'Sovabazar ', 'Hedua', 'College🤣'],
    correct: 2,
  },
  {
    question: 'Ami Kii Baynaa kora thakii khuubbb...??',
    options: ['Chobiiiii Dibi', 'Amay Biya korbiii', 'Ghumii Ghumiii','Jol Khaa'],
    correct: 0,
  },
  {
    question: 'Ami Kise raag kori...??',
    options: ['Jol naa khala', 'Thank You ar Sorry Bolla'],
    correct: 1,
  },
];

export default function LoveQuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scoreAnim, setScoreAnim] = useState(0);
  const questionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const score = answers.filter((a) => a === true).length;
  const progress = ((currentQ + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  const getMessage = () => {
    if (score === 4) return 'You know my heart perfectly';
    if (score === 3) return 'You know me so well';
    return "We have so much to discover together";
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === QUESTIONS[currentQ].correct;
    setAnswers((prev) => [...prev, correct]);
  };

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= QUESTIONS.length) {
      setShowResult(true);
    } else {
      if (questionRef.current) {
        gsap.to(questionRef.current, {
          x: -20,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentQ((q) => q + 1);
            setSelected(null);
            gsap.fromTo(
              questionRef.current,
              { x: 20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0.05 }
            );
          },
        });
      }
    }
  }, [currentQ]);

  useEffect(() => {
    if (showResult) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: score,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => setScoreAnim(Math.round(obj.val)),
      });
    }
  }, [showResult, score]);

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

      gsap.from(cardRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const resetQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
    setScoreAnim(0);
  };

  const getOptionClass = (idx: number) => {
    if (selected === null) {
      return 'border-white/[0.05] hover:border-blush-rose/20 hover:bg-white/[0.02]';
    }
    if (idx === QUESTIONS[currentQ].correct) {
      return 'border-emerald-500/30 bg-emerald-500/5';
    }
    if (idx === selected && idx !== QUESTIONS[currentQ].correct) {
      return 'border-red-400/20 bg-red-400/5';
    }
    return 'border-white/[0.02] opacity-40';
  };

  return (
    <section id="quiz" className="section-padding relative z-10">
      <div className="content-container">
        <div ref={headingRef} className="text-center mb-12">
          <div className="divider-line mb-6" />
          <p className="text-blush-rose/50 font-body text-[10px] uppercase tracking-[0.3em] mb-6">
            Playful moments
          </p>
          <h2
            className="font-display font-semibold text-cream/80"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2 }}
          >
            The Love Quiz
          </h2>
        </div>

        <div ref={cardRef} className="max-w-[520px] mx-auto glass-card rounded-3xl p-8 md:p-12">
          {!showResult ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-cream/20 text-[10px] uppercase tracking-[0.2em]">
                    {currentQ + 1} / {QUESTIONS.length}
                  </span>
                  <span className="text-cream/20 text-[10px] uppercase tracking-[0.2em]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #e89ab5, #f0b4c8)',
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div ref={questionRef}>
                <h3 className="font-display text-cream/70 text-lg md:text-xl leading-relaxed mb-8">
                  {QUESTIONS[currentQ].question}
                </h3>

                {/* Options */}
                <div className="space-y-2">
                  {QUESTIONS[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 ${getOptionClass(i)}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-body font-light text-cream/50 text-sm">
                          {String.fromCharCode(65 + i)}. {opt}
                        </span>
                        {selected !== null && i === QUESTIONS[currentQ].correct && (
                          <svg className="w-4 h-4 text-emerald-400/60 flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {selected !== null && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleNext}
                      className="text-blush-rose/60 font-body text-xs uppercase tracking-[0.2em] hover:text-blush-rose transition-colors duration-300"
                    >
                      {currentQ + 1 >= QUESTIONS.length ? 'See Result' : 'Next'}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-cream/20 text-[10px] uppercase tracking-[0.3em] mb-6">Your score</p>
              <div className="mb-6">
                <span
                  className="font-display font-semibold text-blush-rose/60"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 5rem)', lineHeight: 1 }}
                >
                  {scoreAnim}
                </span>
                <span className="font-display text-cream/20 text-2xl ml-1">/{QUESTIONS.length}</span>
              </div>
              <p className="text-cream/40 font-body font-light text-sm">
                {getMessage()}
              </p>
              <button
                onClick={resetQuiz}
                className="mt-8 text-cream/20 font-body text-[10px] uppercase tracking-[0.2em] hover:text-blush-rose/50 transition-colors duration-300"
              >
                Retake
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
