import { useState } from 'react';

const galleryImages = [
  { src: '/images/campus-event.jpg', alt: 'Campus event' },
  { src: '/images/infrastructure-event.jpg', alt: 'Infrastructure event' },
  { src: '/images/mentorship-event.jpg', alt: 'Mentorship event' },
  { src: '/images/ipr-event.jpg', alt: 'IPR event' },
  { src: '/images/Copy-of-DSC06537.JPG', alt: 'Event 2' },
  { src: '/images/Copy-of-DSC06592.JPG', alt: 'Event 3' },
  { src: '/images/Copy-of-DSC06593.JPG', alt: 'Event 4' },
  { src: '/images/Copy-of-DSC06597.JPG', alt: 'Event 5' },
  { src: '/images/Picture1.jpg', alt: 'Event 6' },
  { src: '/images/Picture2.jpg', alt: 'Event 7' },
  { src: '/images/amit-sir.jpg', alt: 'Event 8' },
  { src: '/images/certi.jpg', alt: 'Event 9' },
  { src: '/images/fdp.jpg', alt: 'Event 10' },
  { src: '/images/group.jpg', alt: 'Event 11' },
  { src: '/images/sir.jpg', alt: 'Event 12' },
  { src: '/images/event-2.jpg', alt: 'Event 13' },
];

export default function Gallery() {
  // Duplicate for seamless infinite scrolling
  const scrollItems = [...galleryImages, ...galleryImages];

  return (
    <section id="gallery" className="py-24 sm:py-32 overflow-hidden bg-canvas">
      <div className="container-ledger mb-12 animate-slide-up">
        <div className="eyebrow mb-4">Events</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
          Check Our Gallery
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left/Right fading gradients for a premium feel */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none hidden sm:block" />

        <div className="flex w-max animate-gallery-scroll hover:[animation-play-state:paused] will-change-transform" style={{ transform: 'translateZ(0)' }}>
          {scrollItems.map((img, i) => (
            <div
              key={i}
              className="w-[280px] sm:w-[360px] md:w-[420px] aspect-[4/3] flex-shrink-0 mx-3 sm:mx-4 overflow-hidden rounded-xl border border-border shadow-sm group bg-gray-100"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
