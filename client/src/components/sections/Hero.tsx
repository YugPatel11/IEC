import { ArrowRight, ArrowDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const TYPING_TEXT = 'INNOVATION & ENTREPRENEURSHIP CELL';

export default function Hero() {
  const [textVisible, setTextVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const typingIndex = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!textVisible) return;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (typingIndex.current < TYPING_TEXT.length) {
          setDisplayedText(TYPING_TEXT.slice(0, typingIndex.current + 1));
          typingIndex.current += 1;
        } else {
          clearInterval(interval);
          setTypingDone(true);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(startDelay);
  }, [textVisible]);

  const scrollToAbout = () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Single Background Image - College Entrance */}
      <div className="absolute inset-0">
        <img
          src="/images/college-entrance.jpg"
          alt="P.P. Savani University Entrance"
          className="w-full h-full object-cover"
          style={{
            animation: 'heroZoom 20s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />

      {/* Animated Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content - Centered */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* PP Savani University Label */}
        <div
          className={`transition-all duration-700 ease-out ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent-red opacity-70" />
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent-red font-semibold">
              PP Savani University
            </span>
            <div className="w-8 h-px bg-accent-red opacity-70" />
          </div>
        </div>

        {/* Main Typing Headline */}
        <h1
          className={`font-display text-[clamp(1.8rem,5vw,4rem)] font-extrabold text-white leading-[1.1] tracking-[0.02em] mb-6 transition-opacity duration-700 ease-out break-words hyphens-auto ${
            textVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {displayedText}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto font-light italic transition-all duration-700 ease-out ${
            typingDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          IGNITE - INSPIRE - INNOVATE
        </p>

        {/* Buttons - Centered */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 ease-out ${
            typingDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a href="#submit-idea-page" className="group inline-flex items-center gap-2 bg-accent-red text-white font-semibold text-sm px-8 py-4 rounded-md hover:bg-accent-red-hover hover:shadow-[0_4px_20px_rgba(194,58,34,0.4)] hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider">
            Apply for Start-Up Support
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a href="#journey-page" className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-8 py-4 rounded-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider">
            Explore Pathways
          </a>
        </div>
      </div>


      {/* Scroll Indicator */}
      <button onClick={scrollToAbout} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-accent-red transition-colors cursor-pointer z-20">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>

      {/* Typing cursor blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
