import { useState, useEffect } from 'react';
import { mentorCoordinators, mentorBoard, ebcCoreMembers } from '@/lib/data';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';

const DarkCarousel = ({ title, members }: { title: string, members: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else if (window.innerWidth < 1280) setCardsToShow(3);
      else setCardsToShow(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, members.length - cardsToShow);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="bg-[#121b27] rounded-3xl relative overflow-hidden w-full py-16 px-6 sm:px-12 shadow-2xl border border-white/5 mb-12">
      {/* Abstract Background Animations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e3323a] opacity-[0.07] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 opacity-[0.05] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 animate-pulse" style={{ animationDuration: '10s' }} />
      
      <div className="relative z-10 flex flex-col items-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-wider text-center uppercase">
          {title}
        </h2>
        <div className="w-24 h-1.5 bg-[#e3323a] mt-6 rounded-full" />
      </div>

      <div className="relative z-10 flex items-center justify-center">
        {maxIndex > 0 && (
          <button onClick={handlePrev} className="absolute left-0 z-20 p-3 text-white/70 hover:text-white transition-all bg-[#1a2636] hover:bg-[#e3323a] rounded-full shadow-xl border border-white/10 hover:scale-110 -translate-x-2 sm:-translate-x-6">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="overflow-hidden w-full">
          <div 
            className="flex transition-transform duration-700 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
          >
            {members.map((person, idx) => (
              <div 
                key={person.name + idx} 
                className="px-3 shrink-0" 
                style={{ width: `${100 / cardsToShow}%` }}
              >
                <div className="group bg-[#172232]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col items-center hover:border-[#e3323a]/40 hover:shadow-[0_10px_40px_-10px_rgba(227,50,58,0.2)] transition-all duration-500 relative overflow-hidden h-full">
                  {/* Top red glow line on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e3323a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-28 h-28 md:w-32 md:h-32 mb-6 rounded-full p-1.5 border-2 border-dashed border-white/20 group-hover:border-[#e3323a] transition-all duration-700">
                    <div className="w-full h-full rounded-full bg-[#0d141e] border-[3px] border-[#1a2636] overflow-hidden flex items-center justify-center relative shadow-inner">
                      {person.image ? (
                        <img 
                          src={person.image} 
                          alt={person.name} 
                          className={`w-full h-full object-cover ${person.name === 'Aman Sinha' ? 'object-[center_25%] scale-[1.3]' : 'object-top'}`} 
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-500 group-hover:text-gray-400 transition-colors" />
                      )}
                    </div>
                  </div>
                  
                  <h4 className="font-display text-lg md:text-xl font-bold text-white text-center mb-2 group-hover:text-[#e3323a] transition-colors">{person.name}</h4>
                  <p className="text-sm text-gray-400 text-center font-medium leading-relaxed">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {maxIndex > 0 && (
          <button onClick={handleNext} className="absolute right-0 z-20 p-3 text-white/70 hover:text-white transition-all bg-[#1a2636] hover:bg-[#e3323a] rounded-full shadow-xl border border-white/10 hover:scale-110 translate-x-2 sm:translate-x-6">
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
      
      {/* Pagination Dots */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-12 relative z-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-[#e3323a] w-10' : 'bg-white/20 w-2 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Team() {
  // Merge the two mentor arrays into a single unified list
  const combinedMentors = [...mentorCoordinators, ...mentorBoard];

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="container-ledger max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="animate-slide-up">
          <DarkCarousel title="Our Mentors & Coordinators" members={combinedMentors} />
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
          <DarkCarousel title="Our EBC Core Members" members={ebcCoreMembers} />
        </div>
      </div>
    </section>
  );
}
