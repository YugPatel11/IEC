import { journeySteps } from '@/lib/data';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Journey() {
  const { targetRef: sectionRef, isIntersecting: isVisible } = useIntersectionObserver();

  return (
    <section id="journey" ref={sectionRef} className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="container-ledger">
        <div className={`text-center mb-16 sm:mb-24 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="eyebrow justify-center mb-4">The Pipeline</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-tight">
            Idea to impact — six stages, one system.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {journeySteps.map((step, i) => (
            <div 
              key={step.stage}
              className={`group relative p-8 sm:p-10 rounded-2xl border border-border bg-[#fafafa] hover:bg-white transition-all duration-500 ease-out hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 overflow-hidden`}
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(48px)',
                transitionDelay: `${i * 150}ms` 
              }}
            >
              <div className="absolute -right-4 -bottom-8 font-display text-[120px] font-bold text-black/[0.02] group-hover:text-accent-red/[0.05] transition-colors duration-500 pointer-events-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              
              <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center mb-8 group-hover:border-accent-red/30 group-hover:bg-accent-red/5 transition-all duration-300 shadow-sm">
                <span className="font-mono text-[13px] font-bold text-accent-red">{String(i + 1).padStart(2, '0')}</span>
              </div>
              
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-4 group-hover:text-accent-red transition-colors duration-300">
                {step.stage}
              </h3>
              
              <p className="text-muted leading-relaxed text-[15px] relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
