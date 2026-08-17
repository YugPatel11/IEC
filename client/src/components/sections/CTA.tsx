import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(var(--color-canvas) 1px, transparent 1px), linear-gradient(90deg, var(--color-canvas) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-ledger relative text-center">
        <div className="animate-slide-up">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent-red font-semibold mb-6">
            Ready to start?
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Got an idea?
            <br />
            <span className="text-white">Let's build it together.</span>
          </h2>
          <p className="text-canvas/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            No pitch deck. No 50-page business plan. Start with a conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#submit-idea-page" className="btn btn-primary group text-base py-3.5 px-8">
              Submit Your Idea
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a href="#services" className="btn text-canvas/50 border border-canvas/15 hover:border-canvas/40 hover:text-white transition-all duration-300 text-base py-3.5 px-8">
              Explore Pathways
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
