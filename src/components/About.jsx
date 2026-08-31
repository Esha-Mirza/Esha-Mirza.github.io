import React from "react";

function About() {
  try {
    const technicalTraits = [
      { label: 'Neural Modeling', value: 'High Precision', icon: 'icon-brain' },
      { label: 'System Logic', value: 'Optimized', icon: 'icon-cpu' },
      { label: 'Data Flow', value: 'Streamlined', icon: 'icon-database' }
    ];

    return (
      <section id="about" className="py-20 md:py-32 relative overflow-hidden scroll-reveal">
        <style>{`
          @keyframes aboutBadgeGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.25), inset 0 0 15px rgba(59,130,246,0.08); }
            50% { box-shadow: 0 0 34px rgba(59,130,246,0.55), inset 0 0 20px rgba(59,130,246,0.18); }
          }
          .protocol-badge {
            animation: aboutBadgeGlow 3s ease-in-out infinite;
          }
          @keyframes aboutShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .protocol-shimmer-text {
            background: linear-gradient(90deg, #ffffff 20%, #93c5fd 45%, #ffffff 70%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: aboutShimmer 3.5s linear infinite;
          }
          #about .about-para {
            opacity: 0;
            transform: translateY(14px);
            transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          #about .about-para.is-revealed {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            <div className="lg:w-5/12 relative slide-left flex items-center justify-center lg:justify-start">
              <div className="relative z-10 w-full max-w-sm lg:max-w-none mx-auto">
                <div className="relative rounded-3xl overflow-hidden border-2 border-blue-500/20 p-2 bg-slate-900/50 backdrop-blur-sm group img-zoom">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                    <img
                      src="assets/images/profilepic-520.webp"
                      srcSet="assets/images/profilepic-520.webp 520w, assets/images/profilepic-1040.webp 1040w"
                      sizes="(min-width: 1024px) 520px, (min-width: 640px) 24rem, 90vw"
                      width="520"
                      height="650"
                      alt="Esha Mirza"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/80 via-transparent to-blue-500/10 opacity-60"></div>
                  </div>
                </div>

                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                
                <div className="absolute -bottom-6 -right-6 glassmorphism px-6 py-4 border-blue-500/30 lofi-glow protocol-badge rotate-3 hidden md:block transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-blue-400 font-black uppercase tracking-widest">Protocol</span>
                    <span className="protocol-shimmer-text font-bold text-lg">AI_ARCHITECT</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-10 left-10 right-[-20px] bottom-[-20px] border border-blue-500/10 rounded-3xl -z-10 transition-all duration-700 group-hover:border-blue-500/30 hidden lg:block"></div>
            </div>

            <div className="lg:w-7/12 flex flex-col justify-center slide-right">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6 scroll-reveal">
                  <div className="h-[1px] w-12 bg-blue-500 transition-all duration-500 hover:w-20 hover:shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                  <span className="text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-[0.3em] md:tracking-[0.4em]">Section_01 // Bio_Matrix</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-10 scroll-reveal reveal-delay-1">
                  CRAFTING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">INTELLIGENCE</span> FROM DATA.
                </h2>
                
                <div className="space-y-5 md:space-y-6 mb-10 md:mb-12">
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed scroll-reveal about-para transition-colors duration-300 hover:text-slate-200" style={{transitionDelay: '0.15s'}}>
                   I'm an AI engineer building across 
                   <span className="text-blue-300"> RAG pipelines</span> using 
                   <span className="text-blue-300"> LangChain</span>, 
                   <span className="text-blue-300">machine learning models</span> trained across 
                   different algorithms and use cases, and 
                   <span className="text-blue-300"> 25+ LLM and NLP applications</span> spanning 
                   healthcare, finance, and legal tech. My work focuses on taking ideas from 
                  concept to <span className="text-blue-300">fully working systems</span>.
                  </p>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed scroll-reveal about-para transition-colors duration-300 hover:text-slate-200" style={{transitionDelay: '0.35s'}}>
                    I'm currently pursuing my BS in Artificial Intelligence at Bahria University, 
                    where I specialize in <span className="text-blue-300">deep learning</span>, 
                    <span className="text-blue-300">CNN architectures</span>, and 
                    <span className="text-blue-300"> model optimization</span>. My focus extends to 
                    <span className="text-blue-300"> NLP</span>, 
                    <span className="text-blue-300">computer vision</span>, and 
                    <span className="text-blue-300"> MLOps</span>, with the goal of becoming a 
                    machine learning engineer who bridges cutting-edge research with real-world deployment. 
                  </p>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed scroll-reveal about-para transition-colors duration-300 hover:text-slate-200" style={{transitionDelay: '0.55s'}}>
                    With a deep focus on <span className="text-blue-300">Neural Architectures </span> 
                    and <span className="text-blue-300">Natural Language Understanding</span>, 
                    I bridge the gap between raw information and actionable insights. I build the 
                    technical foundations for a future where technology understands intent.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 scroll-reveal reveal-delay-5">
                  {technicalTraits.map((trait, i) => (
                    <div key={i} className="glassmorphism p-5 border-white/5 hover:border-blue-500/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`${trait.icon} text-blue-400 text-lg group-hover:scale-110 transition-transform duration-300`}></div>
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">{trait.label}</span>
                      </div>
                      <div className="text-white font-bold text-sm tracking-tight group-hover:text-blue-300 transition-colors duration-300">{trait.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex flex-wrap gap-6 md:gap-10 scroll-reveal reveal-delay-6">
                   <div className="flex flex-col group">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest mb-1 transition-colors duration-300 group-hover:text-blue-400">Status</span>
                      <a
                        href="https://www.upwork.com/freelancers/~01d58e69574b649cd1?mp_source=share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group w-fit link-underline"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                        <span className="text-white font-bold text-sm uppercase group-hover:text-blue-400 transition-colors duration-300">Freelancer at Upwork</span>
                        <div className="icon-external-link text-[10px] text-slate-500 group-hover:text-blue-400 transition-colors duration-300 group-hover:translate-x-0.5"></div>
                      </a>
                   </div>
                   <div className="flex flex-col group">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest mb-1 transition-colors duration-300 group-hover:text-blue-400">Origin</span>
                      <span className="text-white font-bold text-sm uppercase transition-colors duration-300 group-hover:text-blue-300">Islamabad, Pakistan</span>
                   </div>
                   <div className="flex flex-col group">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest mb-1 transition-colors duration-300 group-hover:text-blue-400">Education</span>
                      <span className="text-blue-400 font-bold text-sm uppercase transition-colors duration-300 group-hover:text-blue-300">BSAI (2024-2028)</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-blue-500/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-px h-64 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
  }
}
export default About;
