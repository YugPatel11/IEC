import { siteConfig } from '@/lib/data';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function About() {
  const { targetRef: sectionRef, isIntersecting: isVisible } = useIntersectionObserver();

  return (
    <section id="about" ref={sectionRef} className="py-24 sm:py-32">
      <div className="container-ledger">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="eyebrow mb-6">About Us</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1] mb-6">
              Building Gujarat's next generation of founders — since 2020.
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>The Innovation & Entrepreneurship Cell at PP Savani University was established to close the gap between classroom learning and market-ready ventures. We don't just teach entrepreneurship — we practice it alongside our students.</p>
              <p>From a single room with three student teams, we've grown into a full-stack support system: FabLab, co-working spaces, a 50+ mentor network, direct funding channels, and structured programs that have backed 120+ startups across healthcare, agritech, edtech, and clean energy.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`ledger-card relative overflow-hidden transition-all duration-1000 delay-200 ease-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(194,58,34,0.12)] cursor-pointer ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-red" />
              <div className="pl-5">
                <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent-red font-semibold mb-3">Our Vision</h3>
                <p className="text-ink leading-relaxed font-medium">Enable 5% of PPSU graduates to become job creators — not just job seekers — driving Gujarat's innovation economy forward.</p>
              </div>
            </div>

            <div className={`ledger-card relative overflow-hidden transition-all duration-1000 delay-300 ease-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(20,184,166,0.12)] cursor-pointer ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-teal" />
              <div className="pl-5">
                <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent-teal font-semibold mb-3">Our Mission</h3>
                <p className="text-ink leading-relaxed font-medium">Provide end-to-end startup support — mentorship, infrastructure, funding access, IPR protection, and community — so that no viable student idea fails for lack of resources.</p>
              </div>
            </div>

            <div className={`grid grid-cols-3 gap-2 sm:gap-4 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[{ val: '8+', label: 'Years Active' }, { val: '500+', label: 'Community' }, { val: '6', label: 'Programs' }].map((s) => (
                <div key={s.label} className="text-center p-2 sm:p-4 bg-canvas-alt rounded-md border border-border hover:border-accent-red/30 hover:bg-white transition-all duration-300 hover:-translate-y-1">
                  <div className="font-display text-2xl font-bold text-ink">{s.val}</div>
                  <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-muted mt-1 truncate">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          {[
            { src: '/images/campus-event.jpg', alt: 'Campus event at PPSU' },
            { src: '/images/infrastructure-event.jpg', alt: 'Innovation infrastructure' },
            { src: '/images/mentorship-event.jpg', alt: 'Mentorship session' },
            { src: '/images/ipr-event.jpg', alt: 'IPR workshop' },
          ].map((img) => (
            <div key={img.alt} className="overflow-hidden rounded-md border border-border aspect-[4/3]">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
