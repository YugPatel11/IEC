import Journey from '@/components/sections/Journey';
import { useEffect } from 'react';

export default function JourneyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-grow pt-24 bg-canvas-alt/30">
      <Journey />
    </div>
  );
}
