import { partners } from '@/lib/data';
import { useState } from 'react';

const PartnerLogo = ({ partner }: { partner: { name: string, logo: string } }) => {
  const [error, setError] = useState(false);

  return (
    <div className="flex flex-shrink-0 items-center justify-center p-4 bg-transparent grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 w-40 sm:w-56 mx-4 sm:mx-8">
      {error ? (
        <span className="font-display text-sm md:text-base font-bold text-ink text-center uppercase tracking-wide">
          {partner.name}
        </span>
      ) : (
        <img 
          src={partner.logo} 
          alt={partner.name} 
          onError={() => setError(true)}
          className="max-h-12 sm:max-h-16 w-auto max-w-full object-contain"
        />
      )}
    </div>
  );
};

export default function Partners() {
  const scrollItems = [...partners, ...partners, ...partners];

  return (
    <section id="partners" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container-ledger mb-14 animate-slide-up flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-accent-red font-semibold">Partners</span>
          <div className="h-[2px] w-12 bg-accent-red hidden sm:block" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight leading-tight uppercase">
          Meet Our Partners
        </h2>
      </div>

      <div className="relative w-full overflow-hidden mt-8">
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden sm:block" />

        <div className="flex w-max items-center animate-gallery-scroll hover:[animation-play-state:paused]">
          {scrollItems.map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
