function Navigation() {
  try {
    const [activeSection, setActiveSection] = React.useState('home');
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    
    const navItems = [
      { id: 'home', label: 'Home', icon: 'icon-house' },
      { id: 'about', label: 'About', icon: 'icon-user' },
      { id: 'skills', label: 'Skills', icon: 'icon-brain' },
      { id: 'certifications', label: 'Certs', icon: 'icon-award' },
      { id: 'projects', label: 'Projects', icon: 'icon-code' },
      { id: 'opensource', label: 'Open Source', icon: 'icon-github' },
      { id: 'experience', label: 'Experience', icon: 'icon-briefcase' },
      { id: 'contact', label: 'Contact', icon: 'icon-send' }
    ];

    React.useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        
        const sections = navItems.map(item => document.getElementById(item.id));
        const currentSection = sections.find(section => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        });
        
        if (currentSection) setActiveSection(currentSection.id);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        setIsMenuOpen(false);
      }
    };

    return (
      <nav 
        className={`fixed left-0 right-0 z-50 nav-transition flex justify-center ${
          isScrolled ? 'top-6 px-4' : 'top-0 py-6 px-8'
        }`} 
        data-name="navigation" 
        data-file="components/Navigation.js"
      >
        <div className={`nav-container-transition flex items-center ${
          isScrolled 
            ? 'bg-white/5 backdrop-blur-md nav-pill-glow border border-white/10 px-4 py-2.5 rounded-xl shadow-2xl max-w-fit gap-8' 
            : 'container mx-auto justify-between bg-transparent'
        }`}>
          <div 
            className={`font-bold lofi-text cursor-pointer flex items-center gap-3 group transition-all duration-500 ease-in-out ${
              isScrolled ? 'opacity-100 scale-100' : 'text-2xl opacity-100 scale-100'
            }`}
            onClick={() => scrollToSection('home')}
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600/40 transition-all">
              <span className="text-blue-400 text-lg">E</span>
            </div>
            <span className="tracking-tight text-blue-400">Esha Mirza</span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center nav-transition ${isScrolled ? 'space-x-6' : 'space-x-6'}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-bold transition-all duration-300 flex items-center gap-2 group ${
                  item.isButton 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-lg hover:bg-blue-600/40' 
                    : `px-2 py-1 ${activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-blue-300'}`
                }`}
              >
                <div className={`${item.icon} text-lg transition-transform duration-300 ${
                  activeSection === item.id && !item.isButton ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400'
                }`}></div>
                <span className="block">
                  {item.label}
                </span>
                {activeSection === item.id && !item.isButton && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden p-2 text-gray-300 hover:text-white transition-all ${isScrolled ? 'mx-2' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={isMenuOpen ? 'icon-x text-2xl' : 'icon-menu text-2xl'}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-24 left-4 right-4 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="glassmorphism p-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-3 rounded-xl text-left font-medium flex items-center gap-3 transition-colors ${
                  item.isButton
                    ? 'bg-blue-600 text-white mt-2 shadow-lg shadow-blue-900/20'
                    : activeSection === item.id ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <div className={`${item.icon} text-xl`}></div>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error('Navigation component error:', error);
  }
}