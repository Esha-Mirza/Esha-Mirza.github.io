function SkillRow({ skill, index, active }) {
  return (
    <div className="tech-skill-row">
      <div className="tech-skill-main">
        <div className="tech-skill-index">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="tech-skill-icon">
          <div className={`${skill.icon}`}></div>
        </div>

        <div className="tech-skill-name">
          <span>{skill.name}</span>
          <small>PROFICIENCY</small>
        </div>

        <div className="tech-skill-value">
          {skill.level}%
        </div>
      </div>

      <div className="tech-meter">
        <div className="tech-meter-grid"></div>
        <div
          className="tech-meter-fill"
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
        { name: 'Data Analysis', level: 93, icon: 'icon-activity' }
      ]
    };

    const categories = [
      { id: 'Core', label: 'Modeling', code: '01' },
      { id: 'Web', label: 'Engineering', code: '02' },
      { id: 'Intelligent Systems', label: 'MLOps', code: '03' }
    ];

    const tools = [
      { name: 'Git & GitHub', icon: 'icon-github', url: 'https://github.com/' },
      { name: 'VS Code', icon: 'icon-code', url: 'https://code.visualstudio.com/' },
      { name: 'Docker', icon: 'icon-package', url: 'https://www.docker.com/' },
      { name: 'Jupyter Notebook', icon: 'icon-notebook', url: 'https://jupyter.org/' },
      { name: 'Colab', icon: 'icon-cloud', url: 'https://colab.research.google.com/' },
      { name: 'Anaconda', icon: 'icon-box', url: 'https://anaconda.org/' },
      { name: 'MySQL', icon: 'icon-database', url: 'https://www.mysql.com/' },
      { name: 'Antigravity', icon: 'icon-rocket', url: 'https://antigravity.google/' }
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

      if (section) {
        observer.observe(section);
      }

      return () => {
        if (section) {
          observer.unobserve(section);
        }
      };
    }, []);

    const handleCategoryChange = (cat) => {
      if (cat === activeCategory) return;

      setActiveCategory(cat);
      setIsTransitioning(true);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = setTimeout(() => {
        setDisplayCategory(cat);
        setIsTransitioning(false);
      }, 220);
    };

    React.useEffect(() => {
      return () => {
        if (transitionTimerRef.current) {
          clearTimeout(transitionTimerRef.current);
        }
      };
    }, []);

    return (
      <section
        id="skills"
        className="py-20 px-6 relative overflow-hidden scroll-reveal"
        data-name="skills"
        data-file="components/Skills.js"
      >
        <style>{`
          .tech-section-grid {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.035;
            background-image:
              linear-gradient(rgba(96,165,250,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.8) 1px, transparent 1px);
            background-size: 52px 52px;
          }

          .tech-section-glow {
            position: absolute;
            width: 420px;
            height: 420px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59,130,246,0.09), transparent 68%);
            pointer-events: none;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
          }

          .tech-heading-line {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            max-width: 190px;
            margin: 0 auto 18px;
          }

          .tech-heading-line::before,
          .tech-heading-line::after {
            content: "";
            height: 1px;
            flex: 1;
            background: linear-gradient(90deg, transparent, rgba(96,165,250,0.55));
          }

          .tech-heading-line::after {
            background: linear-gradient(90deg, rgba(96,165,250,0.55), transparent);
          }

          .tech-heading-node {
            width: 7px;
            height: 7px;
            border: 1px solid rgba(96,165,250,0.8);
            transform: rotate(45deg);
            box-shadow: 0 0 12px rgba(59,130,246,0.45);
          }

          .tech-dashboard {
            position: relative;
            background: linear-gradient(145deg, rgba(10,18,35,0.94), rgba(4,9,20,0.94));
            border: 1px solid rgba(96,165,250,0.14);
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 25px 70px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.025);
          }

          .tech-dashboard::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(96,165,250,0.65), transparent);
          }

          .tech-dashboard-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding: 18px 24px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            background: rgba(255,255,255,0.012);
          }

          .tech-status {
            display: flex;
            align-items: center;
            gap: 9px;
            font-family: monospace;
            font-size: 10px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #64748b;
          }

          .tech-status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3b82f6;
            box-shadow: 0 0 10px rgba(59,130,246,0.85);
            animation: techPulse 2s ease-in-out infinite;
          }

          @keyframes techPulse {
            0%, 100% {
              opacity: 0.55;
              transform: scale(0.9);
            }
            50% {
              opacity: 1;
              transform: scale(1.15);
            }
          }

          .tech-system-code {
            color: rgba(96,165,250,0.48);
            font-family: monospace;
            font-size: 10px;
            letter-spacing: 0.16em;
          }

          .tech-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.55fr) minmax(300px, 1fr);
          }

          .tech-skills-area {
            padding: 30px;
            border-right: 1px solid rgba(255,255,255,0.055);
          }

          .tech-tools-area {
            padding: 30px;
          }

          .tech-panel-heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 26px;
          }

          .tech-panel-title {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .tech-panel-icon {
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(59,130,246,0.22);
            border-radius: 8px;
            background: rgba(59,130,246,0.055);
            color: #60a5fa;
          }

          .tech-panel-title h3 {
            margin: 0;
            color: #dbeafe;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .tech-panel-title span {
            display: block;
            margin-top: 3px;
            color: #475569;
            font-family: monospace;
            font-size: 9px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .tech-total {
            color: #475569;
            font-family: monospace;
            font-size: 10px;
            letter-spacing: 0.12em;
          }

          .tech-categories {
            display: flex;
            gap: 8px;
            padding: 5px;
            margin-bottom: 26px;
            border: 1px solid rgba(255,255,255,0.055);
            border-radius: 9px;
            background: rgba(0,0,0,0.14);
          }

          .tech-category {
            position: relative;
            flex: 1;
            padding: 11px 12px;
            border: 1px solid transparent;
            border-radius: 6px;
            background: transparent;
            color: #64748b;
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .tech-category:hover {
            color: #a5b4fc;
            background: rgba(59,130,246,0.035);
          }

          .tech-category.active {
            color: #bfdbfe;
            border-color: rgba(59,130,246,0.22);
            background: rgba(59,130,246,0.09);
            box-shadow: inset 0 0 18px rgba(59,130,246,0.035);
          }

          .tech-category-code {
            display: block;
            margin-bottom: 4px;
            color: rgba(96,165,250,0.45);
            font-family: monospace;
            font-size: 9px;
            letter-spacing: 0.1em;
          }

          .tech-category-label {
            display: block;
            font-family: monospace;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

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

          .tech-skill-row {
            padding: 17px 0;
            border-bottom: 1px solid rgba(255,255,255,0.045);
          }

          .tech-skill-row:last-child {
            border-bottom: none;
          }

          .tech-skill-main {
            display: flex;
            align-items: center;
            gap: 13px;
            margin-bottom: 10px;
          }

          .tech-skill-index {
            width: 26px;
            color: rgba(96,165,250,0.36);
            font-family: monospace;
            font-size: 9px;
            letter-spacing: 0.08em;
          }

          .tech-skill-icon {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 1px solid rgba(96,165,250,0.13);
            border-radius: 7px;
            background: rgba(59,130,246,0.045);
            color: #7da9dc;
            font-size: 17px;
            transition: all 0.25s ease;
          }

          .tech-skill-row:hover .tech-skill-icon {
            color: #93c5fd;
            border-color: rgba(96,165,250,0.34);
            background: rgba(59,130,246,0.09);
            box-shadow: 0 0 18px rgba(59,130,246,0.08);
          }

          .tech-skill-name {
            min-width: 0;
            flex: 1;
          }

          .tech-skill-name span {
            display: block;
            overflow: hidden;
            color: #dbe3ee;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-overflow: ellipsis;
            text-transform: uppercase;
            white-space: nowrap;
          }

          .tech-skill-name small {
            display: block;
            margin-top: 3px;
            color: #475569;
            font-family: monospace;
            font-size: 8px;
            letter-spacing: 0.15em;
          }

          .tech-skill-value {
            min-width: 48px;
            color: #60a5fa;
            font-family: monospace;
            font-size: 12px;
            font-weight: 700;
            text-align: right;
          }

          .tech-meter {
            position: relative;
            height: 8px;
            margin-left: 77px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.045);
            background: rgba(255,255,255,0.025);
          }

          .tech-meter-grid {
            position: absolute;
            inset: 0;
            background-image: repeating-linear-gradient(
              90deg,
              transparent 0,
              transparent 9px,
              rgba(255,255,255,0.055) 9px,
              rgba(255,255,255,0.055) 10px
            );
          }

          .tech-meter-fill {
            position: relative;
            height: 100%;
            background: linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa);
            box-shadow: 0 0 12px rgba(59,130,246,0.42);
            transition: width 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .tech-meter-fill::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 2px;
            height: 100%;
            background: #bfdbfe;
            box-shadow: 0 0 8px #60a5fa;
          }

          .tech-tools-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .tech-tool {
            position: relative;
            min-height: 82px;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.055);
            border-radius: 8px;
            background: rgba(255,255,255,0.018);
            transition: all 0.3s ease;
          }

          .tech-tool:hover {
            transform: translateY(-2px);
            border-color: rgba(96,165,250,0.25);
            background: rgba(59,130,246,0.055);
            box-shadow: 0 8px 25px rgba(0,0,0,0.18);
          }

          .tech-tool-icon {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: #7da9dc;
            border: 1px solid rgba(96,165,250,0.12);
            border-radius: 7px;
            background: rgba(59,130,246,0.04);
            font-size: 18px;
            transition: all 0.3s ease;
          }

          .tech-tool:hover .tech-tool-icon {
            color: #93c5fd;
            border-color: rgba(96,165,250,0.28);
          }

          .tech-tool-name {
            color: #aeb9c8;
            font-family: monospace;
            font-size: 10px;
            font-weight: 700;
            line-height: 1.35;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            transition: color 0.3s ease;
          }

          .tech-tool:hover .tech-tool-name {
            color: #e2e8f0;
          }

          .tech-learning {
            position: relative;
            display: flex;
            align-items: center;
            gap: 14px;
            margin-top: 24px;
            padding: 18px;
            overflow: hidden;
            border: 1px solid rgba(59,130,246,0.13);
            border-radius: 9px;
            background: linear-gradient(135deg, rgba(59,130,246,0.07), rgba(59,130,246,0.018));
          }

          .tech-learning-icon {
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 1px solid rgba(96,165,250,0.2);
            border-radius: 8px;
            background: rgba(59,130,246,0.07);
            color: #60a5fa;
          }

          .tech-learning-title {
            color: #dbeafe;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.04em;
          }

          .tech-learning-text {
            margin-top: 4px;
            color: #64748b;
            font-size: 10px;
            line-height: 1.55;
          }

          @media (max-width: 1024px) {
            .tech-layout {
              grid-template-columns: 1fr;
            }

            .tech-skills-area {
              border-right: none;
              border-bottom: 1px solid rgba(255,255,255,0.055);
            }
          }

          @media (max-width: 640px) {
            .tech-dashboard-header {
              padding: 14px 16px;
            }

            .tech-system-code {
              display: none;
            }

            .tech-skills-area,
            .tech-tools-area {
              padding: 20px;
            }

            .tech-categories {
              flex-direction: column;
            }

            .tech-category {
              text-align: left;
            }

            .tech-tools-grid {
              grid-template-columns: 1fr;
            }

            .tech-meter {
              margin-left: 77px;
            }

            .tech-skill-name span {
              font-size: 12px;
            }
          }
        `}</style>

        <div className="tech-section-grid"></div>
        <div className="tech-section-glow"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="tech-heading-line">
            <div className="tech-heading-node"></div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-150"></div>
              </div>

              <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.3em]">
                Protocol // Skill_Matrix
              </span>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center mb-12 lofi-text">
            Technical Expertise
          </h2>

          <div className="tech-dashboard">
            <div className="tech-dashboard-header">
              <div className="tech-status">
                <span className="tech-status-dot"></span>
                <span>System Online</span>
              </div>

              <div className="tech-system-code">
                SKILL_MATRIX // 2026
              </div>
            </div>

            <div className="tech-layout">
              <div className="tech-skills-area">
                <div className="tech-panel-heading">
                  <div className="tech-panel-title">
                    <div className="tech-panel-icon">
                      <div className="icon-brain text-lg"></div>
                    </div>

                    <div>
                      <h3>Technical Skills</h3>
                      <span>Core Capability Matrix</span>
                    </div>
                  </div>

                  <div className="tech-total">
                    {skillData[displayCategory].length} MODULES
                  </div>
                </div>

                <div className="tech-categories">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`tech-category ${
                        activeCategory === cat.id ? 'active' : ''
                      }`}
                    >
                      <span className="tech-category-code">
                        {cat.code}
                      </span>

                      <span className="tech-category-label">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div
                  className={`skills-category-crossfade ${
                    isTransitioning
                      ? 'is-transitioning'
                      : 'is-visible'
                  }`}
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

              <div className="tech-tools-area">
                <div className="tech-panel-heading">
                  <div className="tech-panel-title">
                    <div className="tech-panel-icon">
                      <div className="icon-wrench text-lg"></div>
                    </div>

                    <div>
                      <h3>Developer Toolbox</h3>
                      <span>Environment & Infrastructure</span>
                    </div>
                  </div>
                </div>

                <div className="tech-tools-grid">
                  {tools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech-tool"
                    >
                      <div className="tech-tool-icon">
                        <div className={`${tool.icon}`}></div>
                      </div>

                      <span className="tech-tool-name">
                        {tool.name}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="tech-learning">
                  <div className="tech-learning-icon">
                    <div className="icon-cpu text-xl"></div>
                  </div>

                  <div>
                    <h4 className="tech-learning-title">
                      Continuous Learning
                    </h4>

                    <p className="tech-learning-text">
                      Actively exploring MLOps, LLM Fine-tuning, and RAG architectures.
                    </p>
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