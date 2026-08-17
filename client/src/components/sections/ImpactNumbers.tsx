import { useState, useEffect, useRef } from 'react';
import { impactNumbers } from '@/lib/data';
import { typewriterCount } from '@/lib/animations';

function useInView(ref: React.RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function StatCounter({ value, suffix, prefix, label }: { value: number; suffix: string; prefix: string; label: string; }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView && !done) {
      typewriterCount(value, 2200, setCount, () => setDone(true));
    }
  }, [inView, done, value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-ink tracking-tight mb-2 tabular-nums">
        <span className="font-mono text-accent-red text-[0.6em] align-top mr-0.5">{prefix}</span>
        {count.toLocaleString()}
        <span className="text-accent-red">{suffix}</span>
      </div>
      <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-muted font-medium">
        {label}
      </div>
    </div>
  );
}

export default function ImpactNumbers() {
  return (
    <section className="py-20 sm:py-24 bg-canvas-alt border-y border-border">
      <div className="container-ledger">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 animate-fade-in">
          {impactNumbers.map((stat) => (
            <div key={stat.label}>
              <StatCounter {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
