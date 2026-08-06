function Skills() {
  try {
    const [activeCategory, setActiveCategory] = React.useState('Core');
    const [isVisible, setIsVisible] = React.useState(false);

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
      setActiveCategory(cat);
    };

    return (
      <section id="skills" className="py-20 px-6" data-name="skills" data-file="components/Skills.js">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 lofi-text">Technical Expertise</h2>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Column 1: Technical Skills */}
            <div className="flex-[3]">
              <div className="glassmorphism p-8 md:p-10 lofi-card h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-8 text-blue-300 flex items-center gap-3">
                  <div className="icon-brain text-2xl text-blue-400"></div>
                  Technical Skills
                </h3>
                
                <div className="flex flex-wrap justify-start gap-3 mb-10">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        activeCategory === cat.id
                          ? 'bg-blue-600 text-white lofi-glow'
                          : 'glassmorphism text-gray-400 hover:text-blue-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-8 flex-1">
                  {skillData[activeCategory].map((skill, index) => (
                    <div key={`${activeCategory}-${skill.name}`} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                            <div className={`${skill.icon} text-lg text-blue-400`}></div>
                            <span className="text-lg font-semibold text-white">{skill.name}</span>
                        </div>
                        <span className="text-blue-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="skill-bar w-full bg-slate-800/50 h-2 rounded-full overflow-hidden">
                        <div
                          className="skill-progress h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Developer Toolbox */}
            <div className="flex-[2] flex flex-col gap-8">
              <div className="glassmorphism p-8 md:p-10 lofi-card h-full flex flex-col">
                <h3 className="text-2xl font-semibold mb-8 text-blue-300 flex items-center gap-3">
                  <div className="icon-wrench text-2xl text-blue-400"></div>
                  Developer Toolbox
                </h3>
                
                <div className="grid grid-cols-2 gap-4 flex-1 content-start">
                  {tools.map((tool) => (
                    <a 
                      key={tool.name} 
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl glassmorphism border border-white/5 hover:border-blue-500/40 hover:bg-white/5 transition-all group cursor-pointer block"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${tool.icon} text-xl text-blue-400 group-hover:scale-110 transition-transform`}></div>
                        <p className="text-gray-300 text-[10px] font-bold uppercase tracking-tight group-hover:text-blue-300 transition-colors">{tool.name}</p>
                      </div>
                    </a>
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