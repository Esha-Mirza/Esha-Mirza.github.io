function Footer() {
  try {
    const currentYear = 2026;
    const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

            {/* Center: Scroll to Top */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-110 hover:bg-blue-500 transition-all active:scale-95 group"
                title="Back to Top"
              >
                <div className="icon-chevron-up text-2xl group-hover:-translate-y-1 transition-transform"></div>
              </button>
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
              <a onClick={() => {
                 window.open('https://mail.google.com/mail/?view=cm&fs=1&to=esha101374@gmail.com&su=AI/ML%20Collaboration','_blank');}}
                 className="w-10 h-10 rounded-lg glassmorphism flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                <div className="icon-mail text-xl"></div>
              </a>
            </div>
          </div>
          
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
  }
}
