import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Letter', href: '#letter' },
  { label: 'Memories', href: '#memories' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Gift', href: '#gift' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'glass-nav'
          : 'bg-transparent'
      }`}
    >
      <div className="content-container flex items-center justify-between h-24 md:h-28">
        <div className="w-[92px] md:w-[112px]" />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-14">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-cream/40 text-base font-body uppercase tracking-[0.2em] hover:text-blush-rose transition-colors duration-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-3"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-[1px] bg-cream/50 transition-all duration-500 ${
              menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
            }`}
          />
          <span
            className={`w-5 h-[1px] bg-cream/50 transition-all duration-500 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-5 h-[1px] bg-cream/50 transition-all duration-500 ${
              menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-nav px-6 pb-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-cream/50 text-base font-body uppercase tracking-[0.2em] hover:text-blush-rose transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
