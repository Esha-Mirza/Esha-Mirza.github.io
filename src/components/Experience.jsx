import React from "react";

function Experience() {
  try {
    const experienceData = [
      {
        role: "AI Engineer Intern",
        company: "School of AI",
        duration: "Dec 2025 - Aug 2026",
        description: "A portfolio of 25+ LLM and NLP applications spanning AI's practical value across healthcare, finance, and legal domains, cutting manual effort, improving decision-making, and expanding access to services. Each one is built to solve a real problem, not just demonstrate a technique. Together, they reflect a focus on impact over complexity.",
        status: "Completed",
        icon: "icon-briefcase"
      }
    ];

    return (
      <section id="experience" className="section-spacing relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="exp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#exp-grid)" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold lofi-text mb-4">Professional Experience</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full transition-all duration-500 hover:w-24 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-blue-900/20 to-transparent hidden md:block timeline-draw"></div>
            
            {experienceData.map((exp, index) => (
              <div key={index} className="relative mb-12 last:mb-0 scroll-reveal">
                <div className="absolute left-[-8px] md:left-1/2 transform md:-translate-x-1/2 top-0 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)] z-20 border-2 border-slate-900 hidden md:block dot-pulse"></div>
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'} ml-8 md:ml-0`}>
                  <div className="glassmorphism p-6 md:p-8 lofi-card border border-white/5 hover:border-blue-500/30 transition-all duration-500 group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600/20 group-hover:border-blue-500/40 group-hover:scale-110 transition-all duration-300">
                        <div className={`${exp.icon} text-2xl text-blue-400 transition-transform duration-300 group-hover:scale-110`}></div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 bg-blue-950/30 px-2 py-0.5 rounded border border-blue-900/30 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-900/40">
                          {exp.status}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                          {exp.role}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 mb-4">
                      <p className="text-blue-300 font-semibold transition-colors duration-300 group-hover:text-blue-200">{exp.company}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-sm font-mono transition-colors duration-300 group-hover:text-gray-400">
                        <div className="icon-calendar text-xs"></div>
                        {exp.duration}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4 transition-colors duration-300 group-hover:text-gray-300">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="md:w-1/2 md:ml-auto md:pl-12 ml-8 md:ml-0 mt-8 scroll-reveal reveal-delay-2">
               <div className="flex items-center gap-4 text-gray-600 font-mono text-xs uppercase tracking-widest italic transition-colors duration-300 hover:text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse"></div>
                  Ongoing Professional Development...
               </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Experience component error:', error);
  }
}
export default Experience;
