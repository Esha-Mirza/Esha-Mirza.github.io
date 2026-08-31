import React from "react";

/**
 * Isolated so the clock's once-a-second tick re-renders a single span rather than
 * the whole navigation bar, its eight links and its two backdrop-filter layers.
 */
function LocalTime() {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <>ISB, PK {now.toLocaleTimeString('en-GB', { hour12: false })}</>;
}

function Navigation() {
  try {
    const [activeSection, setActiveSection] = React.useState('home');
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navItems = [
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'certifications', label: 'Certs' },
      { id: 'projects', label: 'Projects' },
      { id: 'opensource', label: 'Open Source' },
      { id: 'experience', label: 'Experience' },
      { id: 'education', label: 'Education' },
      { id: 'contact', label: 'Contact' }
    ];

    React.useEffect(() => {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setIsScrolled(window.scrollY > 20);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
      const allIds = ['home', ...navItems.map(item => item.id)];
      const sections = allIds.map(id => document.getElementById(id)).filter(Boolean);
      if (!sections.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      sections.forEach(section => observer.observe(section));
      return () => observer.disconnect();
    }, []);

    const smoothScrollTo = (targetY, duration = 700) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();
      const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navOffset = 76;
        const targetY = Math.max(element.getBoundingClientRect().top + window.scrollY - navOffset, 0);
        smoothScrollTo(targetY);
        setActiveSection(sectionId);
        setIsMenuOpen(false);
      }
    };

    return (
      <nav
        className="fixed top-0 left-0 right-0 z-50 nav-container-transition"
      >
        <div
          className="absolute inset-0 border-b overflow-hidden transition-colors duration-500 border-blue-500/10"
          style={{
            background: 'rgba(4, 8, 18, 0.92)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.3)'
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-6">
          <button
            onClick={() => scrollToSection('home')}
            className="font-mono font-bold text-sm tracking-[0.15em] text-white/90 hover:text-white transition-colors shrink-0 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
          >
            EM<span className="text-blue-400">.</span>
          </button>

          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 pb-1 hover:tracking-[0.25em] ${
                  activeSection === item.id ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all duration-500 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.9)] animate-pulse"></span>
              <span><LocalTime /></span>
            </div>
            <button
              className="xl:hidden p-2 -mr-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={isMenuOpen ? 'icon-x text-xl' : 'icon-menu text-xl'}></div>
            </button>
          </div>
        </div>

        <div className={`relative xl:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-t border-white/5 ${isMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="bg-[#00030e]/60 backdrop-blur-lg px-5 py-4 flex flex-col gap-1">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{ transitionDelay: isMenuOpen ? `${i * 40}ms` : '0ms' }}
                className={`px-3 py-2.5 rounded-lg text-left font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeSection === item.id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-3 pt-3 mt-2 border-t border-white/5 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span><LocalTime /></span>
            </div>
          </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error('Navigation component error:', error);
  }
}
export default Navigation;
