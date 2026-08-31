import React from "react";

const RING_SIZE = 52;
const RING_STROKE = 3;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const BASE_OFFSET = 32;
const FOOTER_CLEAR_ZONE = 170;
const REVEAL_AFTER = 400;

/**
 * The ticking clock lives in its own component so its once-a-second state change
 * re-renders one span instead of the entire footer.
 */
function SystemClock() {
  const [currentTime, setCurrentTime] = React.useState(() => new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span className="font-mono text-xs text-blue-400 tracking-widest uppercase">System_Time: {currentTime}</span>;
}

/**
 * Scroll progress ring and back-to-top button.
 *
 * The scroll handler writes straight to the DOM through refs rather than through
 * component state. Routing it through state re-rendered the whole footer, SVG
 * ring included, on every animation frame of every scroll.
 */
function BackToTop() {
  const wrapperRef = React.useRef(null);
  const ringRef = React.useRef(null);

  React.useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const wrapper = wrapperRef.current;
      const ring = ringRef.current;
      if (!wrapper || !ring) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      const distanceFromBottom = docHeight - scrollTop;

      const offset = distanceFromBottom < FOOTER_CLEAR_ZONE
        ? BASE_OFFSET + (FOOTER_CLEAR_ZONE - distanceFromBottom)
        : BASE_OFFSET;

      wrapper.style.bottom = `${offset}px`;
      wrapper.classList.toggle('is-visible', scrollTop > REVEAL_AFTER);
      ring.style.strokeDashoffset = `${RING_CIRCUMFERENCE - progress * RING_CIRCUMFERENCE}`;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={wrapperRef} className="back-to-top">
      <button
        onClick={scrollToTop}
        title="Back to Top"
        className="relative w-[52px] h-[52px] rounded-full glassmorphism flex items-center justify-center text-blue-400 hover:text-blue-300 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 active:scale-95 group"
      >
        <svg width={RING_SIZE} height={RING_SIZE} className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={RING_STROKE} />
          <circle
            ref={ringRef}
            cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none"
            stroke="#60a5fa" strokeWidth={RING_STROKE} strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE}
            style={{ transition: 'stroke-dashoffset 0.1s linear', filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.6))' }}
          />
        </svg>
        <div className="icon-chevrons-up text-xl group-hover:-translate-y-0.5 transition-transform duration-300"></div>
      </button>
    </div>
  );
}

function Footer() {
  try {
    const currentYear = 2026;

    return (
      <footer className="py-12 px-6 border-t border-blue-900/20 bg-slate-950/50 backdrop-blur-md relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <div className="icon-clock text-blue-500 text-lg transition-transform duration-300 hover:scale-110"></div>
                <SystemClock />
              </div>
              <p className="text-xs text-slate-500 font-mono tracking-tighter transition-colors duration-300 hover:text-slate-400">
                © {currentYear} Esha_Mirza // ALL_SYSTEMS_OPTIMIZED
              </p>
            </div>

            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-3 h-3 rotate-45 bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-125 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"></div>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/esha-mirza1623/" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="icon-linkedin text-xl transition-transform duration-300"></div>
              </a>
              <a href="https://github.com/Esha-Mirza" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="icon-github text-xl transition-transform duration-300"></div>
              </a>
              <a href="https://www.upwork.com/freelancers/~01d58e69574b649cd1?mp_source=share" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="icon-pen text-xl transition-transform duration-300"></div>
              </a>
              <a onClick={() => {
                 window.open('https://mail.google.com/mail/?view=cm&fs=1&to=esha101374@gmail.com&su=AI/ML%20Collaboration','_blank');}}
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer">
                <div className="icon-mail text-xl transition-transform duration-300"></div>
              </a>
            </div>
          </div>

        </div>

        <BackToTop />
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
  }
}

export default Footer;
