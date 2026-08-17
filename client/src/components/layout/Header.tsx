import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navItems } from '@/lib/data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // Navigating TO a dedicated page (e.g. Startups, Services)
    if (href.endsWith('-page')) {
      window.location.hash = href;
      window.scrollTo({ top: 0 });
      return;
    }

    // Navigating FROM a dedicated page to a section
    if (window.location.hash.endsWith('-page')) {
      window.location.hash = href === '#home' ? '' : href;
      setTimeout(() => {
        if (href === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    if (href === '#home') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out bg-[#111111] ${
        scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : ''
      }`}
    >
      <div className="container-ledger">
        <div className="flex items-center justify-between py-4 lg:py-5">

          {/* Logo Group */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 sm:gap-4 shrink min-w-0"
          >
            {/* PPSU Logo */}
            <img
              src="/logos/ppsu-logo.png"
              alt="PPSU"
              className="h-8 sm:h-14 w-auto max-w-[100px] sm:max-w-none object-contain shrink min-w-0"
            />

            {/* Divider */}
            <div className="h-6 sm:h-8 w-px bg-white/15 hidden sm:block shrink-0" />

            {/* IEC Logo */}
            <img
              src="/logos/iec-logo.jpg"
              alt="IEC"
              className="h-6 sm:h-12 w-auto max-w-[40px] sm:max-w-none rounded-lg object-contain shrink min-w-0"
            />

            {/* EBC Logo */}
            <img
              src="/logos/ebc-logo.png"
              alt="EBC"
              className="h-6 sm:h-11 w-auto max-w-[40px] sm:max-w-none object-contain shrink min-w-0"
            />

            {/* SSIP Logo */}
            <img
              src="/logos/ssip-logo.png"
              alt="SSIP"
              className="h-5 sm:h-10 w-auto max-w-[35px] sm:max-w-none object-contain shrink min-w-0"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative px-3 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors duration-300 cursor-pointer group"
              >
                {item.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-accent-red rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}

            <div className="ml-3 h-5 w-px bg-white/10" />
            <button
              onClick={() => handleNavClick('#submit-idea-page')}
              className="ml-3 inline-flex items-center gap-2 bg-accent-red text-white font-semibold text-[13px] py-2 px-5 rounded-md hover:bg-accent-red-hover hover:shadow-[0_4px_20px_rgba(194,58,34,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Submit Idea <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <Menu className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#111111] border-t border-white/10 overflow-hidden animate-fade-in">
          <div className="container-ledger py-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10">
              <button onClick={() => handleNavClick('#submit-idea-page')} className="btn btn-primary w-full justify-center">
                Submit Your Idea <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
