import { services } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-canvas-alt">
      <div className="container-ledger">
        <div className="mb-16 animate-slide-up">
          <div className="eyebrow mb-4">What We Offer</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight max-w-lg">
            Six pillars of startup support — nothing generic about it.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-slide-up">
          {services.map((service) => (
            <div key={service.id} className="ledger-card group relative">
              <div className="absolute top-5 right-5 font-mono text-[11px] tracking-wider text-border-strong font-semibold">{service.number}</div>
              <h3 className="font-display text-xl font-bold text-ink mb-3 tracking-tight">{service.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">{service.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {service.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 bg-canvas-alt border border-border rounded-sm text-muted">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
