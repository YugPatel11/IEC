import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Rocket } from 'lucide-react';

// ========================================
// 106 FUNDED STARTUP IMAGES
// Add all startup poster images here.
// Images should be placed in /images/startups/
// ========================================
const startupImages = [
  '/images/startups/startup-1.jpg',
  '/images/startups/startup-2.jpg',
  '/images/startups/startup-3.jpg',
  '/images/startups/startup-4.jpg',
  '/images/startups/startup-5.jpg',
  // Add remaining startup images below (6–106)
  // '/images/startups/startup-6.jpg',
  // ...
  // '/images/startups/startup-106.jpg',
];

const ITEMS_PER_PAGE = 12;

export default function Startups() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [countAnimated, setCountAnimated] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const totalPages = Math.ceil(startupImages.length / ITEMS_PER_PAGE);

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate the "106" counter
  useEffect(() => {
    if (!isVisible) return;
    const target = 106;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out expo
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountAnimated(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible]);

  const currentItems = startupImages.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  return (
    <section
      id="startups"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-ink"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-canvas) 1px, transparent 1px), linear-gradient(90deg, var(--color-canvas) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-red/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-teal/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-ledger relative">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent-red font-semibold mb-6 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-accent-red/50" />
            Ecosystem
            <span className="inline-block w-8 h-px bg-accent-red/50" />
          </div>

          {/* Prominent 106 counter */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-7xl sm:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-none">
                {countAnimated}
              </span>
              <span className="font-display text-3xl sm:text-4xl font-bold text-accent-red">
                +
              </span>
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Funded Startups
          </h2>
          <p className="text-canvas/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Under the Student Startup &amp; Innovation Policy (SSIP) at PP Savani University
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-8 flex-wrap">
            <div className="flex items-center gap-2 text-canvas/30">
              <Rocket className="w-4 h-4 text-accent-red" />
              <span className="font-mono text-[11px] tracking-wide uppercase">
                SSIP Funded
              </span>
            </div>
            <div className="h-4 w-px bg-canvas/10" />
            <div className="flex items-center gap-2 text-canvas/30">
              <span className="font-mono text-[11px] tracking-wide uppercase">
                PP Savani University
              </span>
            </div>
          </div>
        </div>

        {/* Startup image grid */}
        <div
          className={`transition-all duration-1000 delay-300 ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {currentItems.map((src, index) => (
              <div
                key={`${currentPage}-${index}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-500 ease-out-expo hover:border-accent-red/30 hover:shadow-[0_8px_40px_rgba(194,58,34,0.12)]"
                style={{
                  animationDelay: `${index * 60}ms`,
                }}
              >
                {/* Image */}
                <img
                  src={src}
                  alt={`SSIP Funded Startup ${currentPage * ITEMS_PER_PAGE + index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Index badge */}
                <div className="absolute top-3 left-3 font-mono text-[10px] tracking-wider text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  #{String(currentPage * ITEMS_PER_PAGE + index + 1).padStart(3, '0')}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-12">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-canvas/50 hover:text-white hover:border-white/25 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? 'w-8 bg-accent-red'
                        : 'w-2 bg-white/15 hover:bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-canvas/50 hover:text-white hover:border-white/25 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom note */}
          <div className="text-center mt-10">
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-canvas/20">
              Showcasing {startupImages.length} of 106 funded startups — more coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
