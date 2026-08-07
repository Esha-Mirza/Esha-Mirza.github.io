function SkillRow({ skill, index, active }) {
  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/40 group-hover:bg-blue-500/15 transition-all">
          <div className={`${skill.icon} text-base text-blue-300`}></div>
        </div>
        <span className="text-sm font-bold text-white uppercase tracking-wide flex-1 truncate">{skill.name}</span>
        <span className="text-blue-400 font-mono text-xs font-bold flex-shrink-0">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.55)] transition-all duration-1000 ease-out"
          style={{
            width: active ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 100}ms`
          }}
        ></div>
      </div>
    </div>
  );
}

function Skills() {
  try {
    const [activeCategory, setActiveCategory] = React.useState('Core');
    const [displayCategory, setDisplayCategory] = React.useState('Core');
    const [isVisible, setIsVisible] = React.useState(false);
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const transitionTimerRef = React.useRef(null);

    const skillData = {
      'Core': [
        { name: 'Python', level: 92, icon: 'icon-binary' },
        { name: 'C++', level: 85, icon: 'icon-terminal' },
        { name: 'Assembly', level: 70, icon: 'icon-cpu' },
        { name: 'JavaScript', level: 78, icon: 'icon-code' },
        { name: 'SQL', level: 82, icon: 'icon-database' }
      ],
      'Web': [
        { name: 'HTML', level: 95, icon: 'icon-file-code' },
        { name: 'CSS', level: 90, icon: 'icon-layers' },
        { name: 'React Vite', level: 85, icon: 'icon-atom' },
        { name: 'Tailwind CSS', level: 88, icon: 'icon-palette' }
      ],
      'Intelligent Systems': [
        { name: 'LangChain', level: 84, icon: 'icon-link' },
        { name: 'LLMs', level: 86, icon: 'icon-brain' },
        { name: 'RAGs', level: 80, icon: 'icon-search' },
        { name: 'Data Analysis', level: 93, icon: 'icon-activity'  }

      ]
    };

    const categories = [
      { id: 'Core', label: 'Modeling' },
      { id: 'Web', label: 'Engineering' },
      { id: 'Intelligent Systems', label: 'MLOps' }
    ];

    const tools = [
      { name: 'Git & GitHub', icon: 'icon-github',url:'https://github.com/' },
      { name: 'VS Code', icon: 'icon-code', url:'https://code.visualstudio.com/' },
      { name: 'Docker', icon: 'icon-package',url:'https://www.docker.com/' },
      { name: 'Jupyter Notebook', icon: 'icon-notebook', url: 'https://jupyter.org/' },
      { name: 'Colab', icon: 'icon-cloud',url:'https://colab.research.google.com/' },
      { name: 'Anaconda', icon: 'icon-box' , url:'https://anaconda.org/'},
      { name: 'MySQL', icon: 'icon-database',url:'https://www.mysql.com/' },
      { name: 'Antigravity', icon: 'icon-rocket' ,url:'https://antigravity.google/'},
    ];

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      const section = document.getElementById('skills');
      if (section) observer.observe(section);

      return () => {
        if (section) observer.unobserve(section);
      };
    }, []);

    const handleCategoryChange = (cat) => {
      if (cat === activeCategory) return;
      setActiveCategory(cat);
      setIsTransitioning(true);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setDisplayCategory(cat);
        setIsTransitioning(false);
      }, 220);
    };

    React.useEffect(() => {
      return () => {
        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      };
    }, []);

    return (
      <section id="skills" className="py-20 px-6 relative overflow-hidden scroll-reveal" data-name="skills" data-file="components/Skills.js">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(96,165,250,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.6) 1px, transparent 1px)',
            backgroundSize: '46px 46px'
          }}
        ></div>
        <style>{`
          .skills-category-crossfade {
            transition: opacity 0.28s ease-in-out, transform 0.28s ease-in-out;
          }
          .skills-category-crossfade.is-transitioning {
            opacity: 0;
            transform: translateY(8px);
          }
          .skills-category-crossfade.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-150"></div>
              </div>
              <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.3em]">Protocol // Skill_Matrix</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center mb-16 lofi-text">Technical Expertise</h2>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Column 1: Technical Skills */}
            <div className="flex-[3]">
              <div className="skills-panel p-8 md:p-10 h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-8 text-blue-300 flex items-center gap-3">
                  <div className="icon-brain text-2xl text-blue-400"></div>
                  Technical Skills
                </h3>
                
                <div className="flex flex-wrap gap-8 mb-10 border-b border-white/10">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`relative pb-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                        activeCategory === cat.id ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {cat.label}
                      <span
                        className={`absolute left-0 right-0 -bottom-px h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] origin-center transition-transform duration-300 ${
                          activeCategory === cat.id ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      ></span>
                    </button>
                  ))}
                </div>

                <div
                  className={`space-y-6 flex-1 content-start min-h-[360px] skills-category-crossfade ${isTransitioning ? 'is-transitioning' : 'is-visible'}`}
                >
                  {skillData[displayCategory].map((skill, index) => (
                    <SkillRow
                      key={`${displayCategory}-${skill.name}`}
                      skill={skill}
                      index={index}
                      active={isVisible && !isTransitioning}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Developer Toolbox */}
            <div className="flex-[2] flex flex-col gap-8">
              <div className="skills-panel p-8 md:p-10 h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-8 text-blue-300 flex items-center gap-3">
                  <div className="icon-wrench text-2xl text-blue-400"></div>
                  Developer Toolbox
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 content-start">
                  {tools.map((tool, i) => (
                    <div
                      key={tool.name}
                      className="group glassmorphism flex items-center gap-3 px-4 py-4 border-white/5 hover:border-blue-500/40 transition-all"
                    >
                      <div className={`${tool.icon} text-xl text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all flex-shrink-0`}></div>
                      <span className="text-gray-200 text-sm font-mono font-bold uppercase tracking-normal group-hover:text-white transition-colors leading-snug">{tool.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="icon-cpu text-3xl text-blue-400"></div>
                    <div>
                      <h4 className="text-white font-bold">Continuous Learning</h4>
                      <p className="text-gray-400 text-sm mt-1">Actively exploring MLOps, LLM Fine-tuning, and RAG architectures.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Skills component error:', error);
  }
}