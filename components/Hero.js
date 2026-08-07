function Hero() {
  try {
    const [typedCode, setTypedCode] = React.useState('');
    const [activeLine, setActiveLine] = React.useState(0);
    const [replayKey, setReplayKey] = React.useState(0);
    const [isMaximized, setIsMaximized] = React.useState(false);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [showResumeCard, setShowResumeCard] = React.useState(false);
    
    const codeLines = [
     " import neural_engine as ai",
     " class Developer:",
     "    def __init__(self):",
     "      self.name = 'Esha Mirza'",
     "      self.role_a = 'AI/ML Engineer'",
     "      self.role_b = 'Building LLM & RAG-powered systems'",
     "      self.passion = 'Next-Gen Intelligence'",
     "    def deploy(self):",
     "      print(f'Building future with {self.role}...')"
    ];

    React.useEffect(() => {
      let currentLine = 0;
      let currentChar = 0;
      let interval;

      setTypedCode('');
      setActiveLine(0);

      const typeEffect = () => {
        if (currentLine < codeLines.length) {
          const line = codeLines[currentLine];
          if (currentChar < line.length) {
            const char = line[currentChar];
            if (char !== undefined) {
              setTypedCode(prev => prev + char);
            }
            currentChar++;
          } else {
            setTypedCode(prev => prev + '\n');
            currentLine++;
            currentChar = 0;
            setActiveLine(currentLine);
          }
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setTypedCode('');
            setActiveLine(0);
            currentLine = 0;
            currentChar = 0;
            interval = setInterval(typeEffect, 50);
          }, 5000);
        }
      };

      interval = setInterval(typeEffect, 50);
      return () => clearInterval(interval);
    }, [replayKey]);

    React.useEffect(() => {
      if (!isMaximized) return;
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsMaximized(false);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMaximized]);

    React.useEffect(() => {
      if (!showResumeCard) return;
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setShowResumeCard(false);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showResumeCard]);

    return (
      <section id="home" className="min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden relative" data-name="hero" data-file="components/Hero.js">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-12">
            
            {/* Top Row: Brand & Identity Fragments */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 mb-8 backdrop-blur-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-150"></div>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.3em]">Protocol // AI_ENGINEER_ACTIVE</span>
                </div>
                
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                  Esha Mirza<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 text-[85px]">AI/ML ENGINEER </span>
                  <span className="text-blue-500 animate-pulse">.</span>
                </h1>
              </div>

              {/* Identity Token */}
              <div className="relative group">
                <div className="w-40 h-40 md:w-56 md:h-56 p-1 glassmorphism rounded-3xl overflow-hidden lofi-glow transition-all duration-700 hover:rotate-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src="/assets/images/hero-b.png" 
                      alt="Identity"
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="text-[10px] font-mono text-white/80 leading-tight">
                        AUTH: EM-16<br/>
                        LOC: ISB_PK
                      </div>
                      <div className="icon-fingerprint text-white/50 text-2xl"></div>
                    </div>
                  </div>
                </div>
                {/* Floating UI Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl glassmorphism border-blue-500/30 flex flex-col items-center justify-center p-2 animate-bounce hover:animate-none">
                  <div className="icon-brain text-blue-400 text-xl"></div>
                  <span className="text-[8px] font-bold text-blue-500 uppercase mt-1">Neural</span>
                </div>
              </div>
            </div>

            {/* Middle Row: The Technical Interface & Mission */}
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Interface: Code Stream */}
              <div className="lg:col-span-7 relative group" style={{ perspective: '2000px' }}>
                <div
                  className="relative h-full transition-transform duration-700 ease-in-out"
                  style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* FRONT FACE: consciousness.py console */}
                  <div
                    className="h-full glassmorphism overflow-hidden border-white/5 group-hover:border-blue-500/20 transition-all duration-500"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div className="bg-slate-900/40 px-5 py-3 flex items-center justify-between border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">src/core/consciousness.py</span>
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setIsFlipped(true)}
                          aria-label="Flip card"
                          title="Flip"
                          className="icon-refresh-cw text-[10px] text-blue-500/40 hover:text-blue-400 transition-all duration-300 cursor-pointer bg-transparent border-0 p-0"
                        ></button>
                        <button
                          type="button"
                          onClick={() => setIsMaximized(true)}
                          aria-label="Expand code view"
                          title="Maximize"
                          className="icon-maximize-2 text-[10px] text-slate-600 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
                        ></button>
                      </div>
                    </div>
                    <div className="p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed overflow-hidden">
                      <div className="flex gap-6">
                        <div className="flex flex-col gap-1 text-slate-700 text-right select-none text-xs pt-1">
                          {[...Array(10)].map((_, i) => <span key={i}>{String(i + 1).padStart(2, '0')}</span>)}
                        </div>
                        <div className="text-blue-200/90 whitespace-pre">
                          {typedCode}
                          <span className="w-2 h-5 bg-blue-500 inline-block animate-pulse ml-1 align-middle"></span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-600/5 px-6 py-4 border-t border-white/5 flex flex-wrap gap-6 items-center">
                      <div className="flex items-center gap-2">
                         <div className="icon-layers text-blue-500/60 text-xs"></div>
                         <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">Architecture: <span className="text-blue-400">Modular_V3</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="icon-cpu text-blue-500/60 text-xs"></div>
                         <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">Engine: <span className="text-blue-400">Neural_Flow</span></span>
                      </div>
                      <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 border border-green-500/20">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
                         <span className="text-[9px] uppercase tracking-widest font-bold text-green-500">Live_Stream</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE: laptop-lid logo panel */}
                  <div
                    onClick={() => setIsFlipped(false)}
                    className="absolute inset-0 h-full glassmorphism overflow-hidden border-white/5 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-slate-900 via-slate-950 to-black"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                      aria-label="Flip back"
                      title="Flip back"
                      className="icon-refresh-cw absolute top-5 right-5 text-[10px] text-slate-600 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
                    ></button>
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(59,130,246,0.25), transparent 60%)' }}></div>
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(115deg, #fff 0px, transparent 1px, transparent 3px)' }}></div>
                    <img
                      src="/assets/images/logo-b.png"
                      alt="Esha Mirza logo"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.35)] relative z-10"
                    />
                    <span className="mt-6 text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] relative z-10">Esha Mirza</span>
                    <span className="mt-1 text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em] relative z-10">Click to flip back</span>
                  </div>
                </div>
              </div>

              {/* Right Interface: Bio & Stats Grid */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="glassmorphism p-8 flex-1 border-white/5 hover:border-blue-500/30 transition-all group">
                   <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Core_Focus</h3>
                   <p className="text-2xl md:text-3xl font-bold text-slate-100 mb-8 leading-tight">
                    From concept to  <span className="italic text-blue-400">Production</span> , that's where I like to <span className="italic text-blue-400">Build, Break, </span> and <span className="italic text-blue-400">Learn</span>
                   </p>
                   
                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:border-blue-500/20 transition-all">
                         <div className="text-3xl font-black text-white mb-1">25+</div>
                         <div className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">AI Agents</div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:border-blue-500/20 transition-all">
                         <div className="text-3xl font-black text-white mb-1">15+</div>
                         <div className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Credentials</div>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-4">
                    <button onClick={() => {
                     window.open('https://mail.google.com/mail/?view=cm&fs=1&to=esha101374@gmail.com&su=AI/ML%20Collaboration','_blank');}}
                     className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center gap-3">
                     <span className="icon-message-circle"></span> Initiate Connection 
                    </button>

                    <button onClick={() => setShowResumeCard(true)}
                     className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all flex items-center gap-3">
                     <span className="icon-eye"></span> View CV
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Global architectural background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
          
          {/* Subtle Grid dots */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          {/* Architectural background lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
          </div>
        </div>

        {/* Maximize modal for the consciousness.py panel */}
        <div
          onClick={() => setIsMaximized(false)}
          className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMaximized ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`glassmorphism w-full max-w-3xl max-h-[80vh] overflow-hidden border-blue-500/20 transition-all duration-300 ${
              isMaximized ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="bg-slate-900/60 px-5 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">src/core/consciousness.py</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMaximized(false)}
                aria-label="Close expanded view"
                title="Close"
                className="icon-x text-sm text-slate-500 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
              ></button>
            </div>
            <div className="p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed overflow-auto max-h-[calc(80vh-56px)]">
              <div className="flex gap-6">
                <div className="flex flex-col gap-1 text-slate-700 text-right select-none text-xs pt-1">
                  {codeLines.map((_, i) => <span key={i}>{String(i + 1).padStart(2, '0')}</span>)}
                </div>
                <div className="text-blue-200/90 whitespace-pre">
                  {codeLines.join('\n')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume: readable CV preview popup */}
        <div
          onClick={() => setShowResumeCard(false)}
          className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${
            showResumeCard ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#020617] border border-blue-900/40 rounded-2xl w-full max-w-4xl h-[90vh] overflow-hidden shadow-2xl shadow-blue-950/30 transition-all duration-300 flex flex-col ${
              showResumeCard ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/30">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <div className="icon-file-text text-blue-500"></div> Esha_Mirza_Resume.pdf
              </h3>
              <button
                type="button"
                onClick={() => setShowResumeCard(false)}
                aria-label="Close CV preview"
                title="Close"
                className="icon-x text-base text-slate-500 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0"
              ></button>
            </div>
            <div className="flex-1 bg-slate-900">
              {showResumeCard && (
                <iframe
                  src="/assets/Esha_Mirza_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width"
                  title="Esha Mirza Resume"
                  className="w-full h-full border-0"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
  }
}