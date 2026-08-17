import { announcements } from '@/lib/data';
import { Megaphone } from 'lucide-react';

export default function AnnouncementTicker() {
  // Duplicate for seamless loop
  const items = [...announcements, ...announcements];

  return (
    <div className="ticker-strip">
      <div className="ticker-content">
        {items.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-8 text-[13px] font-medium tracking-wide">
            <Megaphone className="w-3.5 h-3.5 text-accent-red flex-shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
