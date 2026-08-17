import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function Contact() {
  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState('Idea Submission');
  const [submitted, setSubmitted] = useState(false);

  const intents = [
    'Idea Submission',
    'Incubation Application',
    'IPR Request',
    'Mentor Request',
    'Partnership Request',
    'General Enquiry'
  ];

  const handleNext = () => setStep((s) => Math.min(3, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));
  
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
    }, 4000);
  };

  if (submitted) {
    return (
      <section id="contact" className="w-full">
        <div className="bg-[#111111] text-white py-20 px-6 sm:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-display">
              Submission Received.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Thank you for reaching out. A reviewer will get back to you shortly.
            </p>
          </div>
        </div>
        <div className="bg-[#f9f9f6] py-32 px-6 min-h-[400px] flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-[#c23a22]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <UploadCloud className="w-8 h-8 text-[#c23a22]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">We've got your idea!</h3>
            <p className="text-gray-500">Redirecting you back...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full">
      {/* Dark Header Area */}
      <div className="bg-[#111111] text-white py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-display">
            Tell us what you are building.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Three short steps. A reviewer from the relevant vertical responds within one working week.
          </p>
        </div>
      </div>

      {/* Light Form Area */}
      <div className="bg-[#f9f9f6] py-16 px-6 sm:px-12 lg:px-24 min-h-[600px]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Form Steps */}
          <div className="flex-1">
            {/* Stepper */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1">
                <div className={`h-[2px] w-full mb-3 transition-colors duration-300 ${step >= 1 ? 'bg-[#c23a22]' : 'bg-gray-300'}`} />
                <div className={`font-mono text-[10px] tracking-widest font-bold uppercase ${step === 1 ? 'text-[#c23a22]' : 'text-gray-500'}`}>01 · Intent</div>
              </div>
              <div className="flex-1">
                <div className={`h-[2px] w-full mb-3 transition-colors duration-300 ${step >= 2 ? 'bg-[#c23a22]' : 'bg-gray-300'}`} />
                <div className={`font-mono text-[10px] tracking-widest font-bold uppercase ${step === 2 ? 'text-[#c23a22]' : 'text-gray-500'}`}>02 · About You</div>
              </div>
              <div className="flex-1">
                <div className={`h-[2px] w-full mb-3 transition-colors duration-300 ${step >= 3 ? 'bg-[#c23a22]' : 'bg-gray-300'}`} />
                <div className={`font-mono text-[10px] tracking-widest font-bold uppercase ${step === 3 ? 'text-[#c23a22]' : 'text-gray-500'}`}>03 · Your Idea</div>
              </div>
            </div>

            {/* Step 1: Intent */}
            {step === 1 && (
              <div className="animate-fade-in">
                <label className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block mb-6">What is this about?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                  {intents.map((item) => (
                    <button
                      key={item}
                      onClick={() => setIntent(item)}
                      className={`text-left px-6 py-5 text-[15px] font-medium transition-colors ${intent === item ? 'bg-[#c23a22] text-white' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="mt-12">
                  <button onClick={handleNext} className="bg-[#c23a22] hover:bg-[#a02c18] text-white px-8 py-3 rounded-full font-medium transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: About You */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block mb-4">Full Name</label>
                    <input type="text" placeholder="Your name" className="w-full bg-white border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-gray-900" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block mb-4">Email</label>
                    <input type="email" placeholder="you@ppsu.ac.in" className="w-full bg-white border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-gray-900" />
                  </div>
                </div>
                <div className="w-full sm:w-[calc(50%-1rem)] mb-12">
                  <label className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block mb-4">School / Department</label>
                  <input type="text" placeholder="School of Engineering" className="w-full bg-white border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-gray-900" />
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium transition-colors">
                    Back
                  </button>
                  <button onClick={handleNext} className="bg-[#c23a22] hover:bg-[#a02c18] text-white px-8 py-3 rounded-full font-medium transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Your Idea */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <label className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block mb-4">Describe the problem and your approach</label>
                  <textarea rows={5} placeholder="What problem are you solving, for whom, and what have you built or tested so far?" className="w-full bg-white border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-gray-400 transition-colors resize-none placeholder:text-gray-400 text-gray-900" />
                </div>
                <div className="mb-12">
                  <label className="font-mono text-[10px] tracking-widest text-gray-500 uppercase block mb-4">Supporting Document (Optional)</label>
                  <div className="border border-dashed border-[#c23a22] bg-white p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[#fdf9f8] transition-colors">
                    <UploadCloud className="w-6 h-6 text-gray-400 mb-3" />
                    <span className="text-[15px] font-medium text-gray-800 mb-1">Drag a file here, or click to browse</span>
                    <span className="text-[12px] text-gray-500">PDF or images, max 10 MB</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium transition-colors">
                    Back
                  </button>
                  <button onClick={handleSubmit} className="bg-[#c23a22] hover:bg-[#a02c18] text-white px-8 py-3 rounded-full font-medium transition-colors">
                    Submit
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right: Sidebar Information */}
          <div className="lg:w-80 shrink-0 space-y-10 pt-2">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-3">Visit</div>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                Innovation & Entrepreneurship Cell<br/>
                P P Savani University, NH-8, Kosamba<br/>
                Surat, Gujarat, India
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-3">Write</div>
              <p className="text-[13px] text-gray-700">ie@ppsu.ac.in</p>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-3">Response Time</div>
              <p className="text-[13px] text-gray-700 leading-relaxed">
                One working week for idea submissions; two for incubation applications.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
