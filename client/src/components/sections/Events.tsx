import { flagshipEvents } from '@/lib/data';
import { Calendar, ArrowUpRight } from 'lucide-react';

export default function Events() {
  return (
    <section id="events" className="py-24 sm:py-32 bg-canvas-alt">
      <div className="container-ledger">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14 animate-slide-up">
          <div>
            <div className="eyebrow mb-4">Events & Programs</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
              Where the ecosystem meets.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 animate-slide-up">
          {flagshipEvents.map((event) => (
            <div key={event.title} className="ledger-card group relative flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 bg-accent-red/8 text-accent-red rounded-sm font-semibold border border-accent-red/10">
                  {event.tag}
                </span>
                <ArrowUpRight className="w-4 h-4 text-border-strong group-hover:text-accent-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2 tracking-tight">
                {event.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
                {event.description}
              </p>
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Calendar className="w-3.5 h-3.5 text-muted" />
                <span className="font-mono text-[11px] tracking-wider text-muted font-medium">
                  {event.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
