import HeartCanvas from '@/components/HeartCanvas';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import LoveLetterSection from '@/sections/LoveLetterSection';
import MemoriesSection from '@/sections/MemoriesSection';
import ReasonsSection from '@/sections/ReasonsSection';
import LoveQuizSection from '@/sections/LoveQuizSection';
import GiftBoxSection from '@/sections/GiftBoxSection';
import FinalWishSection from '@/sections/FinalWishSection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-cosmic overflow-x-hidden">
      {/* Persistent heart particle background */}
      <HeartCanvas />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <LoveLetterSection />
        <MemoriesSection />
        <ReasonsSection />
        <LoveQuizSection />
        <GiftBoxSection />
        <FinalWishSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
