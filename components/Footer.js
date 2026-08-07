function Footer() {
  try {
    const currentYear = 2026;
    const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const [showBackToTop, setShowBackToTop] = React.useState(false);
    const [liftedOffset, setLiftedOffset] = React.useState(32);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
            setScrollProgress(progress);
            setShowBackToTop(scrollTop > 400);

            // Lift the button clear of the footer's icon row once we're near the true bottom
            const distanceFromBottom = docHeight - scrollTop;
            const footerClearZone = 170;
            setLiftedOffset(distanceFromBottom < footerClearZone ? 32 + (footerClearZone - distanceFromBottom) : 32);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const ringSize = 52;
    const ringStroke = 3;
    const ringRadius = (ringSize - ringStroke) / 2;
    const ringCircumference = 2 * Math.PI * ringRadius;
    const ringOffset = ringCircumference - scrollProgress * ringCircumference;

    return (
      <footer className="py-12 px-6 border-t border-blue-900/20 bg-slate-950/50 backdrop-blur-md relative" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left: Copyright & System Time */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <div className="icon-clock text-blue-500 text-lg"></div>
                <span className="font-mono text-xs text-blue-400 tracking-widest uppercase">System_Time: {currentTime}</span>
              </div>
              <p className="text-xs text-slate-500 font-mono tracking-tighter">
                © {currentYear} Esha_Mirza // ALL_SYSTEMS_OPTIMIZED
              </p>
            </div>

            {/* Center: divider marker */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-3 h-3 rotate-45 bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
            </div>

            {/* Right: Social & Links */}
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/esha-mirza1623/" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                <div className="icon-linkedin text-xl"></div>
              </a>
              <a href="https://github.com/Esha-Mirza" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                <div className="icon-github text-xl"></div>
              </a>
              <a href="https://www.upwork.com/freelancers/~01d58e69574b649cd1?mp_source=share" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                <div className="icon-pen text-xl"></div>
              </a>
              <a onClick={() => {
                 window.open('https://mail.google.com/mail/?view=cm&fs=1&to=esha101374@gmail.com&su=AI/ML%20Collaboration','_blank');}}
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                <div className="icon-mail text-xl"></div>
              </a>
            </div>
          </div>
          
        </div>

        {/* Floating Back to Top with scroll-progress ring */}
        <div
          className={`fixed right-8 z-40 transition-all duration-300 ${
            showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          style={{ bottom: `${liftedOffset}px`, transition: 'bottom 0.25s ease-out, opacity 0.3s ease, transform 0.3s ease' }}
        >
          <button
            onClick={scrollToTop}
            title="Back to Top"
            className="relative w-[52px] h-[52px] rounded-full glassmorphism flex items-center justify-center text-blue-400 hover:text-blue-300 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-colors transition-shadow active:scale-95 group"
          >
            <svg width={ringSize} height={ringSize} className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={ringStroke} />
              <circle
                cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none"
                stroke="#60a5fa" strokeWidth={ringStroke} strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                style={{ transition: 'stroke-dashoffset 0.1s linear', filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.6))' }}
              />
            </svg>
            <div className="icon-chevrons-up text-xl group-hover:-translate-y-0.5 transition-transform"></div>
          </button>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
  }
}