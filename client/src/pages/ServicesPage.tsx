import Services from '@/components/sections/Services';
import { useEffect } from 'react';

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-grow pt-24 bg-canvas-alt/30">
      <Services />
    </div>
  );
}
