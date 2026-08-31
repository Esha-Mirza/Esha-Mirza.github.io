import React from "react";

function SkillRing({ level, active, delay }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const offset = c - (level / 100) * c;

  return (
    <svg width="52" height="52" className="shrink-0">
      <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
      <circle
        cx="26" cy="26" r={r} fill="none"
        stroke="#3b82f6" strokeWidth="3"
        strokeDasharray={c}
        strokeDashoffset={active ? offset : c}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
        style={{
          transition: `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.5))'
        }}
      />
      <text
        x="26" y="26" textAnchor="middle" dy="0.35em"
        fill="#60a5fa" fontSize="11" fontWeight="700" fontFamily="monospace"
        style={{
          opacity: active ? 1 : 0,
          transition: `opacity 0.5s ease ${delay + 200}ms`
        }}
      >
        {level}%
      </text>
    </svg>
  );
}

function SkillCard({ skill, index, active }) {
  return (
    <div className="skill-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="skill-card-icon">
            <div className={`${skill.icon}`}></div>
          </div>
          <div className="min-w-0">
            <div className="skill-card-name">{skill.name}</div>
            <div className="skill-card-label">Proficiency</div>
          </div>
        </div>
        <SkillRing level={skill.level} active={active} delay={index * 100} />
      </div>
      <div className="skill-card-track">
        <div
          className="skill-card-fill"
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
      { name: 'Git & GitHub', icon: 'icon-github' },
      { name: 'VS Code', icon: 'icon-code' },
      { name: 'Docker', icon: 'icon-package' },
      { name: 'Jupyter', icon: 'icon-notebook' },
      { name: 'Colab', icon: 'icon-cloud' },
      { name: 'Anaconda', icon: 'icon-box' },
      { name: 'MySQL', icon: 'icon-database' },
      { name: 'Antigravity', icon: 'icon-rocket' }
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
      return () => { if (section) observer.unobserve(section); };
    }, []);

    const handleCategoryChange = (cat) => {
      if (cat === activeCategory) return;
      setActiveCategory(cat);
      setIsTransitioning(true);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setDisplayCategory(cat);
        setIsTransitioning(false);
      }, 280);
    };

    React.useEffect(() => {
      return () => { if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current); };
    }, []);

    return (
      <section id="skills" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden scroll-reveal">
        <style>{`
          .skill-section-glow {
            position: absolute;
            width: 420px;
            height: 420px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59,130,246,0.09), transparent 68%);
            pointer-events: none;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation: skillGlowBreathe 7s ease-in-out infinite;
          }
          @keyframes skillGlowBreathe {
            0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
            50% { opacity: 1; transform: translateX(-50%) scale(1.12); }
          }
          .skill-heading-line {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            max-width: 190px;
            margin: 0 auto 18px;
          }
          .skill-heading-line::before,
          .skill-heading-line::after {
            content: "";
            height: 1px;
            flex: 1;
            background: linear-gradient(90deg, transparent, rgba(96,165,250,0.55));
          }
          .skill-heading-line::after {
            background: linear-gradient(90deg, rgba(96,165,250,0.55), transparent);
          }
          .skill-heading-node {
            width: 7px;
            height: 7px;
            border: 1px solid rgba(96,165,250,0.8);
            transform: rotate(45deg);
            box-shadow: 0 0 12px rgba(59,130,246,0.45);
            animation: skillNodePulse 3s ease-in-out infinite;
          }
          @keyframes skillNodePulse {
            0%, 100% { box-shadow: 0 0 12px rgba(59,130,246,0.45); }
            50% { box-shadow: 0 0 22px rgba(59,130,246,0.8); }
          }
          .skill-dashboard {
            position: relative;
            background: linear-gradient(145deg, rgba(10,18,35,0.94), rgba(4,9,20,0.94));
            border: 1px solid rgba(96,165,250,0.14);
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 25px 70px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.025);
            transition: box-shadow 0.5s ease, border-color 0.4s ease;
          }
          .skill-dashboard:hover {
            box-shadow: 0 30px 80px rgba(0,0,0,0.45), 0 0 40px rgba(59,130,246,0.08);
            border-color: rgba(96,165,250,0.22);
          }
          .skill-dashboard::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(96,165,250,0.65), transparent);
          }
          .skill-dashboard-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            background: rgba(255,255,255,0.012);
          }
          @media (min-width: 768px) {
            .skill-dashboard-header { padding: 18px 24px; }
          }
          .skill-status {
            display: flex;
            align-items: center;
            gap: 9px;
            font-family: monospace;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #64748b;
          }
          .skill-status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3b82f6;
            box-shadow: 0 0 10px rgba(59,130,246,0.85);
            animation: skillStatusPulse 2s ease-in-out infinite;
          }
          @keyframes skillStatusPulse {
            0%, 100% { opacity: 0.55; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.15); }
          }
          .skill-system-code {
            color: rgba(96,165,250,0.48);
            font-family: monospace;
            font-size: 11px;
            letter-spacing: 0.16em;
          }
          .skill-categories {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 5px;
            margin-bottom: 24px;
            border: 1px solid rgba(255,255,255,0.055);
            border-radius: 9px;
            background: rgba(0,0,0,0.14);
            width: 100%;
          }
          @media (min-width: 640px) {
            .skill-categories { width: fit-content; flex-wrap: nowrap; }
          }
          .skill-category {
            position: relative;
            flex: 1 1 auto;
            padding: 10px 14px;
            border: 1px solid transparent;
            border-radius: 6px;
            background: transparent;
            color: #64748b;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: monospace;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-align: center;
          }
          @media (min-width: 640px) {
            .skill-category { flex: 0 0 auto; padding: 10px 18px; }
          }
          .skill-category:hover {
            color: #a5b4fc;
            background: rgba(59,130,246,0.035);
            transform: translateY(-1px);
          }
          .skill-category.active {
            color: #bfdbfe;
            border-color: rgba(59,130,246,0.22);
            background: rgba(59,130,246,0.09);
            box-shadow: inset 0 0 18px rgba(59,130,246,0.035);
          }
          .skill-category-code {
            color: rgba(96,165,250,0.45);
            margin-right: 6px;
            transition: color 0.3s ease;
          }
          .skill-category.active .skill-category-code {
            color: rgba(96,165,250,0.8);
          }
          .skill-grid-crossfade {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          }
          .skill-grid-crossfade.is-transitioning {
            opacity: 0;
            transform: translateY(10px);
          }
          .skill-grid-crossfade.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .skill-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }
          @media (min-width: 640px) {
            .skill-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (min-width: 1024px) {
            .skill-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          .skill-card {
            position: relative;
            padding: 20px;
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 10px;
            background: linear-gradient(145deg, rgba(14,22,40,0.9), rgba(6,12,26,0.92));
            box-shadow: 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02);
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            opacity: 0;
            transform: translateY(12px);
            animation: skillCardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes skillCardEnter {
            to { opacity: 1; transform: translateY(0); }
          }
          .skill-card:hover {
            transform: translateY(-4px);
            border-color: rgba(96,165,250,0.2);
            box-shadow: 0 16px 40px rgba(0,0,0,0.3), 0 0 20px rgba(59,130,246,0.06);
          }
          .skill-card-icon {
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(96,165,250,0.14);
            border-radius: 8px;
            background: rgba(59,130,246,0.05);
            color: #7da9dc;
            font-size: 17px;
            transition: all 0.3s ease;
          }
          .skill-card:hover .skill-card-icon {
            color: #93c5fd;
            border-color: rgba(96,165,250,0.3);
            background: rgba(59,130,246,0.1);
            box-shadow: 0 0 14px rgba(59,130,246,0.08);
            transform: scale(1.08);
          }
          .skill-card-name {
            color: #dbe3ee;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          @media (min-width: 768px) {
            .skill-card-name { font-size: 15px; }
          }
          .skill-card-label {
            color: #475569;
            font-family: monospace;
            font-size: 10px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-top: 2px;
          }
          .skill-card-track {
            width: 100%;
            height: 5px;
            border-radius: 3px;
            overflow: hidden;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.04);
          }
          .skill-card-fill {
            height: 100%;
            background: linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa);
            box-shadow: 0 0 10px rgba(59,130,246,0.4);
            border-radius: 3px;
            transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .skill-tools-area {
            padding: 20px;
            border-top: 1px solid rgba(255,255,255,0.055);
          }
          @media (min-width: 768px) {
            .skill-tools-area { padding: 24px 30px 30px; }
          }
          .skill-tools-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          @media (min-width: 768px) {
            .skill-tools-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          }
          .skill-tool {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 8px;
            background: rgba(255,255,255,0.015);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .skill-tool:hover {
            transform: translateY(-2px);
            border-color: rgba(96,165,250,0.2);
            background: rgba(59,130,246,0.04);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }
          .skill-tool-icon {
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #7da9dc;
            border: 1px solid rgba(96,165,250,0.1);
            border-radius: 6px;
            background: rgba(59,130,246,0.035);
            font-size: 15px;
            transition: all 0.3s ease;
          }
          .skill-tool:hover .skill-tool-icon {
            color: #93c5fd;
            border-color: rgba(96,165,250,0.25);
            transform: scale(1.08);
          }
          .skill-tool-name {
            color: #aeb9c8;
            font-family: monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            transition: color 0.3s ease;
          }
          @media (min-width: 768px) {
            .skill-tool-name { font-size: 12px; }
          }
          .skill-tool:hover .skill-tool-name {
            color: #e2e8f0;
          }
          .skill-learning {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-top: 20px;
            padding: 14px;
            border: 1px solid rgba(59,130,246,0.12);
            border-radius: 9px;
            background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(59,130,246,0.015));
            transition: all 0.4s ease;
          }
          @media (min-width: 768px) {
            .skill-learning { padding: 16px; }
          }
          .skill-learning:hover {
            border-color: rgba(59,130,246,0.22);
            box-shadow: 0 8px 25px rgba(59,130,246,0.08);
            transform: translateY(-2px);
          }
          .skill-learning-icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(96,165,250,0.18);
            border-radius: 8px;
            background: rgba(59,130,246,0.06);
            color: #60a5fa;
            transition: all 0.3s ease;
          }
          .skill-learning:hover .skill-learning-icon {
            transform: scale(1.1);
            box-shadow: 0 0 12px rgba(59,130,246,0.15);
          }
          .skill-learning-title {
            color: #dbeafe;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.03em;
          }
          @media (min-width: 768px) {
            .skill-learning-title { font-size: 14px; }
          }
          .skill-learning-text {
            margin-top: 3px;
            color: #64748b;
            font-size: 11px;
            line-height: 1.5;
          }
          @media (min-width: 768px) {
            .skill-learning-text { font-size: 12px; }
          }
        `}</style>

        <div className="skill-section-glow"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="skill-heading-line scroll-reveal">
            <div className="skill-heading-node"></div>
          </div>

          <div className="flex justify-center mb-4 scroll-reveal">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10">
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

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 lofi-text scroll-reveal reveal-delay-1">
            Technical Expertise
          </h2>

          <div className="skill-dashboard">
            <div className="skill-dashboard-header scroll-reveal">
              <div className="skill-status">
                <span className="skill-status-dot"></span>
                <span>System Online</span>
              </div>
              <div className="skill-system-code">SKILL_MATRIX // 2026</div>
            </div>

            <div className="p-5 md:p-8 scroll-reveal reveal-delay-1">
              <div className="skill-categories">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`skill-category ${activeCategory === cat.id ? 'active' : ''}`}
                  >
                    <span className="skill-category-code">{cat.code}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className={`skill-grid-crossfade ${isTransitioning ? 'is-transitioning' : 'is-visible'}`}>
                <div className="skill-grid">
                  {skillData[displayCategory].map((skill, index) => (
                    <SkillCard
                      key={`${displayCategory}-${skill.name}`}
                      skill={skill}
                      index={index}
                      active={isVisible && !isTransitioning}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="skill-tools-area scroll-reveal reveal-delay-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center border border-blue-500/20 rounded-md bg-blue-500/5 text-blue-400">
                  <div className="icon-wrench text-sm"></div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200 tracking-wide">Developer Toolbox</h3>
                  <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Environment & Infrastructure</p>
                </div>
              </div>

              <div className="skill-tools-grid">
                {tools.map((tool) => (
                  <div key={tool.name} className="skill-tool">
                    <div className="skill-tool-icon">
                      <div className={`${tool.icon}`}></div>
                    </div>
                    <span className="skill-tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>

              <div className="skill-learning">
                <div className="skill-learning-icon">
                  <div className="icon-cpu text-lg"></div>
                </div>
                <div>
                  <h4 className="skill-learning-title">Continuous Learning</h4>
                  <p className="skill-learning-text">Actively exploring MLOps, LLM Fine-tuning, and RAG architectures.</p>
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
export default Skills;
