import { Lightbulb, HandCoins, Copyright, GraduationCap } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function SSIP() {
  const { targetRef: sectionRef, isIntersecting: isVisible } = useIntersectionObserver();

  return (
    <section id="ssip" ref={sectionRef} className="py-24 sm:py-32 bg-white relative">
      <div className="container-ledger">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-red tracking-tight inline-block border-b-4 border-[#0056b3] pb-2 px-2">
            About SSIP
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative">
          <div className={`z-10 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h3 className="font-display text-2xl sm:text-[1.75rem] font-bold text-[#344a5e] tracking-tight mb-6">
              SSIP at P P Savani University
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed text-justify">
              <p>The Student Startup and Innovation Policy (SSIP) at P P Savani University helps students and researchers transform their creative ideas into tangible projects and startups. The program fosters an innovative mindset, encouraging young minds to think critically, solve real-world problems, and contribute meaningfully to society.</p>
              <p>SSIP provides students with valuable opportunities and support. You can receive financial assistance of up to <strong>₹2.5 lakhs</strong> to build prototypes and working models. For ideas that require protection, IPR (Intellectual Property Rights) support of up to <strong>₹75,000</strong> is also available. In addition to funding, SSIP connects you with industry experts and mentors who offer guidance on refining your idea, developing your product, and understanding the market. This comprehensive support system aims to empower students to become future entrepreneurs and leaders.</p>
            </div>
          </div>

          <div className={`relative z-20 transition-all duration-1000 delay-400 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10 shadow-sm translate-x-6 translate-y-6 opacity-80 hidden lg:block">
               <img src="/images/campus-event.jpg" alt="PPSU Campus" className="w-full h-full object-cover opacity-30" />
            </div>
            
            <div className="bg-[#f0f8ff] border border-blue-100 rounded-[1.5rem] p-8 sm:p-10 shadow-sm relative z-10">
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-[#d32f2f] rounded-full p-1.5 flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Encourages innovation and supports young minds.
                  </p>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-[#d32f2f] rounded-full p-1.5 flex-shrink-0">
                    <HandCoins className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Financial help up to <strong>₹2.5 lakhs</strong> for prototyping and working models.
                  </p>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-[#d32f2f] rounded-full p-1.5 flex-shrink-0">
                    <Copyright className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>IPR (Intellectual Property Rights) support up to <strong>₹75,000</strong>.</p>
                    <p>Connects with <strong>industry experts</strong> and mentors.</p>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-[#d32f2f] rounded-full p-1.5 flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Fosters future <strong>entrepreneurs and leaders</strong>.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
