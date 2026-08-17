import { useState, useEffect } from 'react';
import { UploadCloud, ArrowLeft, ArrowRight, CheckCircle2, Rocket, TrendingUp, Users } from 'lucide-react';

export default function SubmitIdeaPage() {
  const [step, setStep] = useState(0); 
  const [intent, setIntent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', department: '', problem: '', document_url: '' });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    try {
      const res = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, document_url: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const changeStep = (newStep: number) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(newStep);
      setAnimating(false);
    }, 300);
  };

  const handleSelectProgram = (program: string) => {
    setIntent(program);
    changeStep(1);
  };

  const handleNext = () => changeStep(Math.min(2, step + 1));
  const handleBack = () => changeStep(Math.max(0, step - 1));
  
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.problem) return;

    try {
      await fetch('http://localhost:3001/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          department: formData.department,
          problem: formData.problem,
          proposed_solution: formData.problem,
          document_url: formData.document_url,
          user_type: 'Student',
          idea_title: intent
        })
      });
    } catch (error) {
      console.error('Submission failed:', error);
    }

    setSubmitted(true);
    setTimeout(() => {
      window.location.hash = ''; 
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f6] flex flex-col w-full relative overflow-hidden pt-20"> 
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#c23a22]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {step === 0 && !submitted ? (
        <div className="flex-1 py-16 px-6 sm:px-12 lg:px-24 relative z-10 animate-fade-in">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#c23a22] font-display mb-4">Startup Support</h1>
            <p className="text-xl text-gray-500 mb-12">We are here to help you</p>
            <h2 className="text-2xl font-bold text-gray-900">What type of support do you need?</h2>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
              <div className="h-48 flex items-center justify-center mb-6">
                <Rocket className="w-32 h-32 text-gray-800 group-hover:text-[#c23a22] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-6">Incubation Program</h3>
              <button onClick={() => handleSelectProgram('Incubation Program')} className="bg-[#c23a22] hover:bg-[#a02c18] text-white px-6 py-2.5 rounded text-sm font-bold mb-6 transition-colors shadow-md">
                Click Here to Apply!
              </button>
              <p className="text-[13px] text-gray-900 leading-relaxed font-medium">
                The PPSU <span className="font-bold">Incubation Program</span> Assists Beginners In The Idea Stage To Kickstart Their Startup Idea. We Provide Support And Guidance To Transform Ideas Into Successful Ventures.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
              <div className="h-48 flex items-center justify-center mb-6">
                <TrendingUp className="w-32 h-32 text-gray-800 group-hover:text-[#c23a22] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-6">Growth Pad Program</h3>
              <button onClick={() => handleSelectProgram('Growth Pad Program')} className="bg-[#c23a22] hover:bg-[#a02c18] text-white px-6 py-2.5 rounded text-sm font-bold mb-6 transition-colors shadow-md">
                Learn More!
              </button>
              <p className="text-[13px] text-gray-900 leading-relaxed font-medium">
                The <span className="font-bold">Growth Pad</span> Initiative Is Tailored For Startups In The Product Stage, Ready To Enter The Market. We Offer Targeted Support And Guidance To Accelerate The Growth And Success Of These Ventures.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
              <div className="h-48 flex items-center justify-center mb-6">
                <Users className="w-32 h-32 text-gray-800 group-hover:text-[#c23a22] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-6">Need Based Support</h3>
              <button onClick={() => handleSelectProgram('Need Based Support')} className="bg-[#c23a22] hover:bg-[#a02c18] text-white px-6 py-2.5 rounded text-sm font-bold mb-6 transition-colors shadow-md">
                Click Here to Apply
              </button>
              <p className="text-[13px] text-gray-900 leading-relaxed font-medium">
                The <span className="font-bold">Need-Based Support</span> Program Is Designed Specifically For Startups Already In The Market. We Offer Tailored Assistance To Address Specific Needs And Enhance Their Growth Trajectory.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Dark Header Area for Form */}
          <div className="bg-[#111111] pt-24 pb-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden border-b border-white/10">
            <div className="max-w-6xl mx-auto relative z-10">
              <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display leading-tight animate-slide-up">
                {submitted ? 'Submission Received.' : `Applying for ${intent}`}
              </h2>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl font-light animate-slide-up" style={{ animationDelay: '100ms' }}>
                {submitted 
                  ? 'Thank you for reaching out. A reviewer will get back to you shortly.' 
                  : 'Two short steps. A reviewer from the relevant vertical responds within one working week.'}
              </p>
            </div>
            <div className="absolute top-0 right-10 w-px h-full bg-white/5" />
            <div className="absolute top-0 right-40 w-px h-full bg-white/5" />
          </div>

          {/* Form Area */}
          <div className="flex-1 py-12 px-6 sm:px-12 lg:px-24 relative z-10">
            <div className="max-w-6xl mx-auto">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                  <div className="w-24 h-24 bg-[#c23a22]/10 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-[#c23a22]/20">
                    <CheckCircle2 className="w-12 h-12 text-[#c23a22]" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 font-display">We've got your idea!</h3>
                  <p className="text-gray-500 text-lg">Redirecting you back to the home page...</p>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                  {/* Left: Form Steps */}
                  <div className="flex-1">
                    {/* Stepper */}
                    <div className="flex items-center gap-4 mb-12">
                      {[
                        { num: 1, label: 'About You' },
                        { num: 2, label: 'Your Idea' }
                      ].map((s) => (
                        <div key={s.num} className="flex-1 relative">
                          <div className={`h-[2px] w-full mb-3 transition-colors duration-500 ease-in-out ${step >= s.num ? 'bg-[#c23a22]' : 'bg-gray-200'}`} />
                          <div className={`font-mono text-[10px] tracking-widest font-bold uppercase transition-colors duration-500 ${step === s.num ? 'text-[#c23a22]' : 'text-gray-400'}`}>
                            0{s.num} · {s.label}
                          </div>
                          {step === s.num && (
                             <div className="absolute -top-1 left-0 w-full h-[4px] bg-[#c23a22] rounded-full blur-sm opacity-50 transition-all duration-300" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className={`transition-all duration-300 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                      {/* Step 1: About You */}
                      {step === 1 && (
                        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-black/5 border border-black/5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            <div>
                              <label className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block mb-4 font-semibold">Full Name</label>
                              <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-[#c23a22] focus:ring-1 focus:ring-[#c23a22] transition-all rounded-xl placeholder:text-gray-400 text-gray-900" />
                            </div>
                            <div>
                              <label className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block mb-4 font-semibold">Email</label>
                              <input type="email" placeholder="you@ppsu.ac.in" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-[#c23a22] focus:ring-1 focus:ring-[#c23a22] transition-all rounded-xl placeholder:text-gray-400 text-gray-900" />
                            </div>
                          </div>
                          <div className="w-full sm:w-[calc(50%-1rem)] mb-12">
                            <label className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block mb-4 font-semibold">School / Department</label>
                            <input type="text" placeholder="School of Engineering" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-[#c23a22] focus:ring-1 focus:ring-[#c23a22] transition-all rounded-xl placeholder:text-gray-400 text-gray-900" />
                          </div>
                          <div className="flex justify-between items-center">
                            <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium">
                              <ArrowLeft className="w-4 h-4" /> Back to Programs
                            </button>
                            <button onClick={handleNext} disabled={!formData.name || !formData.email || !formData.department} className={`group text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-lg flex items-center gap-2 ${(!formData.name || !formData.email || !formData.department) ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-[#c23a22] hover:bg-[#a02c18] hover:shadow-xl hover:-translate-y-0.5'}`}>
                              Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Your Idea */}
                      {step === 2 && (
                        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-black/5 border border-black/5">
                          <div className="mb-8">
                            <label className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block mb-4 font-semibold">Describe the problem and your approach</label>
                            <textarea rows={5} placeholder="What problem are you solving, for whom, and what have you built or tested so far?" value={formData.problem} onChange={e => setFormData({ ...formData, problem: e.target.value })} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 text-[15px] focus:outline-none focus:border-[#c23a22] focus:ring-1 focus:ring-[#c23a22] transition-all rounded-xl resize-none placeholder:text-gray-400 text-gray-900" />
                          </div>
                          <div className="mb-12">
                            <label className="font-mono text-[10px] tracking-widest text-gray-400 uppercase block mb-4 font-semibold">Supporting Document (Optional)</label>
                            <label className="border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-[#c23a22]/5 hover:border-[#c23a22]/50 p-10 flex flex-col items-center justify-center cursor-pointer transition-all rounded-xl group relative overflow-hidden">
                              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".pdf,image/*" disabled={uploading} />
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                <UploadCloud className={`w-6 h-6 ${formData.document_url ? 'text-green-500' : 'text-[#c23a22]'}`} />
                              </div>
                              <span className="text-[15px] font-medium text-gray-800 mb-1">
                                {uploading ? 'Uploading...' : formData.document_url ? 'File uploaded successfully' : 'Drag a file here, or click to browse'}
                              </span>
                              <span className="text-[12px] text-gray-500">
                                {formData.document_url ? 'Click or drag to replace' : 'PDF or images, max 10 MB'}
                              </span>
                            </label>
                          </div>
                          <div className="flex justify-between items-center">
                            <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium">
                              <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                            <button onClick={handleSubmit} disabled={!formData.problem} className={`text-white px-10 py-3.5 rounded-full font-medium transition-all shadow-lg ${!formData.problem ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-[#c23a22] hover:bg-[#a02c18] hover:shadow-xl hover:-translate-y-0.5'}`}>
                              Submit Application
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Sidebar Information */}
                  <div className="lg:w-72 shrink-0 space-y-10 pt-2">
                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                      <div className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold">Visit</div>
                      <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                        Innovation & Entrepreneurship Cell<br/>
                        P P Savani University, NH-8, Kosamba<br/>
                        Surat, Gujarat, India
                      </p>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                      <div className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold">Write</div>
                      <a href="mailto:ebc@ppsu.ac.in" className="text-[13px] text-[#c23a22] hover:text-[#a02c18] font-medium transition-colors">
                        ebc@ppsu.ac.in
                      </a>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                      <div className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold">Response Time</div>
                      <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                        One working week for idea submissions; two for incubation applications.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
