import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LoveLetterSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(sealRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        delay: 0.4,
      });

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          delay: 0.6,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="letter" className="section-padding relative z-10">
      <div className="content-container flex flex-col items-center">
        {/* Section Label */}
        <div className="text-center mb-16">
          <div className="divider-line mb-6" />
          <p className="text-blush-rose/50 font-body text-[10px] uppercase tracking-[0.3em]">
            From my heart
          </p>
        </div>

        {/* Letter Card */}
        <div
          ref={cardRef}
          className="love-letter-card rounded-3xl p-8 md:p-14 lg:p-16 max-w-[640px] w-full relative"
        >
          {/* Wax Seal */}
          <div ref={sealRef} className="flex justify-center mb-10">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, #b85c6e, #8b3a4a)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#d4a5b5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Letter Content */}
          <div ref={contentRef}>
            <p className="font-accent text-blush-rose/80" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
              Amar Chitra,
            </p>

            <div className="mt-8 space-y-6">
              <p className="font-body font-light text-stardust/80 leading-[1.95]" style={{ fontSize: '0.92rem' }}>
                Ai prothom hoa too ai name taa use korchee haa ai name ta amar deoa tokaa puro name taa Chitralekha ["Chitra" Akta khub bhalo basa see Tar protita chobi taa see tar akta onno rokom modhurota futia tola ar "Lekha" - See likhta jana, See lekha taa pran dita para,Se lekha kaa porta bhalo basa]....ami short aa chitra bola dakboo toka...haa Dak name tor name ar thakao onek taa boro jani but ai name taa boddo mistii janish ar Toka dakboo too ai name aa taii tokhon ai name taa aro sundor hoa jabe...
              </p>
              <p className="font-body font-light text-stardust/80 leading-[1.95]" style={{ fontSize: '0.92rem' }}>
                Toka nia amar hajaro sopno dekha.....jani naa sesh obdhi kota puron hoba kintuu ami amar jibon dia chesta korboo sob sob sopnoo jaa tui dekhachees taa ami puron korta parii.....Haaa tor korar khomota ache kintu tor sopnoo gulo dia ami nijer sopno kaa aro sundor kora tulta chai.....Ai mayatar sob sopno jodi puron korta parii jodi take agla bhalo kora rakhta pari jodi take ami amar sob taa dia ake bhaba pagol ar moto bhalo basta parii tobae amar arr kichu chai naaa kichu naa sottie karon ai mayata amar kachee sob parbo naa aii pagli take chara
              </p>
              <p className="font-body font-light text-stardust/80 leading-[1.95]" style={{ fontSize: '0.92rem' }}>
                Ajjj tomar jonmo din tumi 21 bochor aa porlaa jani ai 21 bochor aa onek jhor brishti onek kichu asachee tomar life aa tumi onek onek baar bhanga porachoo abar utha dariachoo aii baro parba notun bhaba aii bara tumi nijaka abar sajia tulba ar ami achee tomar kothay tomar Totla,Biya Paglu,Beyadob chela taa tomar pasa sara ta jibon ar jonno badha pora gachee kothao jata parba naa tumi suddhu themo naa agia jaoo ami suddhu tomake agia jeta dekhta chai jekhana aktu thakba ami tomake thala nia jabo tomar protita podokhepa aa tomar sathi hobo tomar hasi,kanna,anondo sob kichur bhaag neboo ar tomar daitto ami nebo ajj aii boro akta dina ami tomar kachee abar notun kora badha porchee ai badha chara amar sadhoo kothao naii goo....
              </p>
              <p className="font-body font-light text-stardust/80 leading-[1.95]" style={{ fontSize: '0.92rem' }}>
                Amar jibonar sob thaka alo kono dino akta fota ach lagta debo naa, Tomar protita chokh ar jol ar  mullo amar kachee onek onek ta boro akash soman boro amar kachee,amar hasi amar kachee golapeer paprir cheyao komol....Amar kachee tumie amar Parvati, Tumie amar Radha ami tomar kache tor Shiv ar Krishna hoar opekhay roilam.....aii jee ai tumi taa amar jibona onek ta mullo ban kono dino bhulao haria felbo naa tomay....Tomar jee naa dhora hath ami dhora rakhachee taa ami kono dino charbo naa ajj tomar kachee atoo boro boro protigga korman jaa ami kono dino mittha hota debo naa.....Ami amar sob taa tomar kachee rakha diachee sob taa sob thaka boro Amar kachee bhalobasa se ami tomake puro taa sopa diache.....Ai ak bhaba pagol hoa ami suddhu tomakae bhalobasa jata chai tomar prem aa protidin ai bhabae pora jeta chai....
              </p>
              <p className="font-body font-light text-stardust/80 leading-[1.95]" style={{ fontSize: '0.92rem' }}>
                Subho Jonmo Din amar Priyo manush take amar Kuchupu kaa(Sonna janish aroo kichu likhtam amar laptop kaaj korcheelo naa majha dhus kii boli ar baki kichu thakla whatsapp aa bola deboo plzzz plzzzzz 11:45 baja akhon 15 min bakii upload oo marbo ata jalddiiii....)
              </p>
            </div>

            <div className="mt-12 text-right">
              <p className="font-accent text-rose-gold/70" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}>
                Forever Yours,
              </p>
              <div className="font-accent text-rose-gold/100 mt-1 space-y-1 font-medium tracking-[0.01em]" style={{ fontSize: 'clamp(1.5rem, 2vw, 1.7rem)' }}>
                <p>You Totla,</p>
                <p>Your Biya Paglu,</p>
                <p>Your Beyadob Chela</p>
                <p className="text-rose-gold/100 text-[0.9em]">Etc...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
