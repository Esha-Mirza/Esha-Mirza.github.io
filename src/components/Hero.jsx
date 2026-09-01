import React from "react";

const CODE_LINES = [
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

const TYPE_INTERVAL_MS = 50;
const REPLAY_DELAY_MS = 5000;

/**
 * The hero terminal's typing animation.
 *
 * It writes each character straight into the DOM through a ref instead of
 * through component state. Driving it with `setTypedCode` re-rendered the whole
 * hero, both modals included, twenty times a second for as long as the page was
 * open. The animation also stops whenever the hero scrolls out of view or the
 * tab goes to the background, and it is skipped entirely for visitors who ask
 * for reduced motion.
 */
function CodeTyper() {
  const hostRef = React.useRef(null);
  const gutterRef = React.useRef(null);
  const textRef = React.useRef(null);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (textRef.current) textRef.current.textContent = CODE_LINES.join('\n');
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let buffer = '';
    let interval = null;
    let replayTimer = null;
    let onScreen = false;

    const highlight = (index) => {
      const gutter = gutterRef.current;
      if (!gutter) return;
      for (let i = 0; i < gutter.children.length; i += 1) {
        gutter.children[i].classList.toggle('text-blue-400', i === index);
      }
    };

    const tick = () => {
      const line = CODE_LINES[lineIndex];

      if (line === undefined) {
        stop();
        replayTimer = setTimeout(() => {
          lineIndex = 0;
          charIndex = 0;
          buffer = '';
          if (textRef.current) textRef.current.textContent = '';
          highlight(0);
          start();
        }, REPLAY_DELAY_MS);
        return;
      }

      if (charIndex < line.length) {
        buffer += line[charIndex];
        charIndex += 1;
      } else {
        buffer += '\n';
        lineIndex += 1;
        charIndex = 0;
        highlight(lineIndex);
      }

      if (textRef.current) textRef.current.textContent = buffer;
    };

    const start = () => {
      if (interval === null) interval = setInterval(tick, TYPE_INTERVAL_MS);
    };

    const stop = () => {
      clearInterval(interval);
      interval = null;
    };

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    }, { threshold: 0 });

    observer.observe(host);
    document.addEventListener('visibilitychange', sync);
    highlight(0);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      clearTimeout(replayTimer);
      stop();
    };
  }, []);

  return (
    <div ref={hostRef} className="flex gap-4 md:gap-6 min-w-0 max-w-full">
      <div ref={gutterRef} className="flex flex-col gap-1 text-slate-700 text-right select-none text-xs pt-1 shrink-0">
        {CODE_LINES.map((_, i) => (
          <span key={i} className="transition-colors duration-300">{String(i + 1).padStart(2, '0')}</span>
        ))}
      </div>
      <div className="text-blue-200/90 whitespace-pre min-w-0 overflow-x-auto">
        <span ref={textRef}></span>
        <span className="w-2 h-5 bg-blue-500 inline-block animate-pulse ml-1 align-middle"></span>
      </div>
    </div>
  );
}

/**
 * Counts up to `target` once it scrolls into view. Kept separate from the hero so
 * the ~150 frames of the count animation only re-render this one number.
 */
function CountUp({ target, duration = 2500 }) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let frame = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * easeOutCubic(progress)));
        if (progress < 1) frame = requestAnimationFrame(step);
      };

      frame = requestAnimationFrame(step);
    }, { threshold: 0.4 });

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return <span ref={ref}>{value}</span>;
}

function Hero() {
  try {
    const [isMaximized, setIsMaximized] = React.useState(false);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [showResumeCard, setShowResumeCard] = React.useState(false);

    React.useEffect(() => {
      if (!isMaximized) return;
      const handleKeyDown = (e) => { if (e.key === 'Escape') setIsMaximized(false); };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMaximized]);

    React.useEffect(() => {
      if (!showResumeCard) return;
      const handleKeyDown = (e) => { if (e.key === 'Escape') setShowResumeCard(false); };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showResumeCard]);

    const scrollToContact = () => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <section id="home" className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 flex items-center justify-center overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col gap-10 md:gap-12">

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 mb-6 md:mb-8 backdrop-blur-sm scroll-reveal">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-150"></div>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.3em]">Protocol // AI_ENGINEER_ACTIVE</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white scroll-reveal reveal-delay-1">
                  Esha Mirza<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 text-4xl sm:text-6xl md:text-7xl lg:text-[85px]">AI/ML ENGINEER </span>
                  <span className="text-blue-500 animate-pulse">.</span>
                </h1>
              </div>

              <div className="relative group scale-reveal reveal-delay-2 mx-auto lg:mx-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 p-1 glassmorphism rounded-3xl overflow-hidden lofi-glow transition-all duration-700 hover:rotate-2 img-zoom">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img src="assets/images/hero-b.webp" alt="Identity" width="448" height="448" fetchPriority="high" decoding="async" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="text-[10px] font-mono text-white/80 leading-tight">AUTH: EM-16<br/>LOC: ISB_PK</div>
                      <div className="icon-fingerprint text-white/50 text-2xl transition-transform duration-300 group-hover:scale-110"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-14 h-14 md:w-16 md:h-16 rounded-2xl glassmorphism border-blue-500/30 flex flex-col items-center justify-center p-2 float-gentle transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <div className="icon-brain text-blue-400 text-lg transition-transform duration-300 group-hover:scale-110"></div>
                  <span className="text-[8px] font-bold text-blue-500 uppercase mt-1">Neural</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
              <div className="lg:col-span-7 relative group slide-left reveal-delay-2 overflow-hidden" style={{ perspective: '2000px' }}>
                <div className="relative h-full transition-transform duration-700 ease-in-out" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div className="h-full glassmorphism overflow-hidden border-white/5 group-hover:border-blue-500/20 transition-all duration-500 shimmer-border" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    <div className="bg-slate-900/40 px-5 py-3 flex items-center justify-between border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.6)]"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">src/core/consciousness.py</span>
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setIsFlipped(true)} aria-label="Flip card" title="Flip" className="icon-refresh-cw text-[10px] text-blue-500/40 hover:text-blue-400 transition-all duration-300 cursor-pointer bg-transparent border-0 p-0 hover:rotate-180"></button>
                        <button type="button" onClick={() => setIsMaximized(true)} aria-label="Expand code view" title="Maximize" className="icon-maximize-2 text-[10px] text-slate-600 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0 hover:scale-110"></button>
                      </div>
                    </div>
                    <div className="p-5 md:p-10 font-mono text-xs sm:text-sm md:text-base leading-relaxed overflow-x-auto min-h-[180px] sm:min-h-[260px] md:min-h-[320px]">
                      <CodeTyper />
                    </div>
                    <div className="bg-blue-600/5 px-4 md:px-6 py-3 md:py-4 border-t border-white/5 flex flex-wrap gap-4 md:gap-6 items-center">
                      <div className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1">
                        <div className="icon-layers text-blue-500/60 text-xs"></div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">Architecture:<span className="text-blue-400">Modular_V3</span></span>
                      </div>
                      <div className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1">
                        <div className="icon-cpu text-blue-500/60 text-xs"></div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">Engine:<span className="text-blue-400">Neural_Flow</span></span>
                      </div>
                      <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 border border-green-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-green-500">Live_Stream</span>
                      </div>
                    </div>
                  </div>

                  <div onClick={() => setIsFlipped(false)} className="absolute inset-0 h-full glassmorphism overflow-hidden border-white/5 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-slate-900 via-slate-950 to-black shimmer-border" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }} aria-label="Flip back" title="Flip back" className="icon-refresh-cw absolute top-5 right-5 text-[10px] text-slate-600 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0 hover:rotate-180"></button>
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(59,130,246,0.25), transparent 60%)' }}></div>
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(115deg, #fff 0px, transparent 1px, transparent 3px)' }}></div>
                    <img src="assets/images/logo-b.webp" alt="Esha Mirza logo" width="256" height="256" loading="lazy" decoding="async" className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.35)] relative z-10 transition-transform duration-500 hover:scale-110" />
                    <span className="mt-6 text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] relative z-10">Esha Mirza</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8 slide-right reveal-delay-3">
                <div className="relative glassmorphism p-4 sm:p-6 md:p-8 flex-1 border-white/5 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-500 group overflow-hidden shimmer-border max-w-full">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(59,130,246,0.12), transparent 55%)' }}></div>
                  <h3 className="relative text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">Core_Focus<span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping"></span></h3>
                  <p className="relative text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-100 mb-6 md:mb-8 leading-tight break-words">
                    From concept to<span className="italic text-blue-400 hover:text-blue-300 transition-colors cursor-default"> Production</span>, that's where I like to<span className="italic text-blue-400 hover:text-blue-300 transition-colors cursor-default"> Build, Break,</span> and<span className="italic text-blue-400 hover:text-blue-300 transition-colors cursor-default"> Learn</span>
                  </p>
                  <div className="relative grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="p-2 sm:p-3 md:p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:border-blue-500/20 hover:!border-blue-400/50 hover:bg-blue-500/10 hover:scale-[1.03] transition-all duration-300">
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1"><CountUp target={18} />+</div>
                      <div className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Repositories</div>
                    </div>
                    <div className="p-2 sm:p-3 md:p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:border-blue-500/20 hover:!border-blue-400/50 hover:bg-blue-500/10 hover:scale-[1.03] transition-all duration-300">
                      <div className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1"><CountUp target={20} />+</div>
                      <div className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Certificates/Credentials</div>
                    </div>
                  </div>
                  <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <button onClick={scrollToContact} className="px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 sm:gap-3 w-full btn-shine">
                      <span className="icon-message-circle transition-transform duration-300 group-hover:rotate-12"></span>Initiate Connection
                    </button>
                    <button onClick={() => setShowResumeCard(true)} className="px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all flex items-center justify-center gap-2 sm:gap-3 w-full btn-shine">
                      <span className="icon-eye transition-transform duration-300 group-hover:scale-110"></span>View CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
          </div>
        </div>

        <div onClick={() => setIsMaximized(false)} className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm transition-all duration-500 ${isMaximized ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div onClick={(e) => e.stopPropagation()} className={`glassmorphism w-full max-w-3xl max-h-[85vh] md:max-h-[80vh] overflow-hidden border-blue-500/20 transition-all duration-500 ${isMaximized ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="bg-slate-900/60 px-5 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.6)]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">src/core/consciousness.py</span>
              </div>
              <button type="button" onClick={() => setIsMaximized(false)} aria-label="Close expanded view" title="Close" className="icon-x text-sm text-slate-500 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0 hover:rotate-90 duration-300"></button>
            </div>
            <div className="p-5 md:p-10 font-mono text-xs sm:text-sm md:text-base leading-relaxed overflow-x-auto max-h-[calc(85vh-56px)] md:max-h-[calc(80vh-56px)]">
              <div className="flex gap-6">
                <div className="flex flex-col gap-1 text-slate-700 text-right select-none text-xs pt-1">
                  {CODE_LINES.map((_, i) => (<span key={i}>{String(i + 1).padStart(2, '0')}</span>))}
                </div>
                <div className="text-blue-200/90 whitespace-pre">{CODE_LINES.join('\n')}</div>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => setShowResumeCard(false)} className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm transition-all duration-500 ${showResumeCard ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div onClick={(e) => e.stopPropagation()} className={`bg-[#020617] border border-blue-900/40 rounded-2xl w-full max-w-4xl h-[92vh] md:h-[90vh] overflow-hidden shadow-2xl shadow-blue-950/30 transition-all duration-500 flex flex-col ${showResumeCard ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-blue-900/30">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"><div className="icon-file-text text-blue-500"></div>Esha_Mirza_Resume.pdf</h3>
              <button type="button" onClick={() => setShowResumeCard(false)} aria-label="Close CV preview" title="Close" className="icon-x text-base text-slate-500 hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0 hover:rotate-90 duration-300"></button>
            </div>
            <div className="flex-1 bg-slate-900">
              {showResumeCard && (<iframe src="assets/Esha_Mirza_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width" title="Esha Mirza Resume" className="w-full h-full border-0"></iframe>)}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
  }
}
export default Hero;