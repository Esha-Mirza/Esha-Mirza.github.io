function Projects() {
  try {
    const projects = [
      { 
        title: 'AthenaCore', 
        description: 'A sophisticated multi-agent system where multiple AI agents shared persistent memory for collaborative problem-solving.',
        status: 'Beta',
        tech: ['Streamlit', 'FastAPI', 'LLM','TinyDB'],
        icon: 'icon-network',
        url: 'https://github.com/Esha-Mirza/School_Of_AI_Internsihp',
        codeSnippet: 'class AthenaCore:\n    def collaborate(self, task):\n        results = [agent.process(task, memory) for agent in agents]\n        return synthesize(results)'
      },
      { 
        title: 'Voice Controlled Agent System', 
        description: 'Multi-agent system with speech input and output capabilities.',
        status: 'Beta',
        tech: ['Whisper', 'pyttsx3', 'sounddevice', 'pydub', 'FFmpeg'],
        icon: 'icon-mic',
        url: 'https://github.com/Esha-Mirza/School_Of_AI_Internsihp',
        codeSnippet:'class VoiceAgent:\n    def process_voice(self, audio):\n        text = whisper.transcribe(audio)\n        response = agents.process(text)\n        return tts.say(response)'
      },
      { 
        title: 'Cybersecurity Incident Response Agent', 
        description: 'AI agent for detecting, analyzing, and responding to security threats.',
        status: 'Beta',
        tech: ['LLM','FastAPI','Streamlit','Pandas','Plotly','TinyDB'],
        icon: 'icon-lock',
        url: 'https://github.com/Esha-Mirza/School_Of_AI_Internsihp',
        codeSnippet: 'class IncidentAgent:\n    def analyze_threat(self, log):\n        threat = detect(log)\n        return generate_response(threat) if threat.severity > 7 else escalate(threat)'
      },
      { 
        title: 'Multi-Agent Research Assistant', 
        description:  '	Team of specialized AI agents collaborating on research tasks.',
        status: 'Stable',
        tech: ['LLM','FastAPI','Streamlit'	,'Plotly', 'TinyDB'],
        icon: 'icon-book-open',
        url: 'https://github.com/Esha-Mirza/School_Of_AI_Internsihp',
        codeSnippet: 'class ResearchAssistant:\n    def research(self, topic):\n        data = collector.gather(topic)\n        insights = analyzer.process(data)\n        return summarizer.synthesize(insights)'
      },
      { 
        title: 'Hospital Bed Management Staff and Patient Analysis', 
        description: 'Analyzes bed utilization, staff allocation, and patient flow for healthcare operations.',
        status: 'Stable',
        tech: [' Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook'],
        icon: 'icon-hospital',
        url: 'https://github.com/Esha-Mirza/Hospital-Bed-Management-Staff-and-Patient-Analysis',
        codeSnippet: 'class BedManagement:\n    def calculate_occupancy(self):\n        occ = self.beds.groupby("department")["occupied"].sum()\n        return (occ / self.beds["total"].sum()) * 100'
      },
      { 
        title: 'Connect-4', 
        description: 'Classic two-player game with graphical interface and win detection.',
        status: 'Stable',
        tech: ['Python','Pygame',"Minimax"],
        icon: 'icon-gamepad',
        url: 'https://github.com/Esha-Mirza/Connect-4',
        codeSnippet: 'class Connect4:\n    def drop_piece(self, col):\n        for row in range(5, -1, -1):\n            if self.board[row][col] == 0:\n                self.board[row][col] = self.current_player\n                return check_win(row, col) or True'
      }
    ];

    return (
      <section id="projects" className="section-spacing" data-name="projects" data-file="components/Projects.js">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold lofi-text mb-4">Featured Projects</h2>
              <p className="text-gray-400 max-w-2xl">
                Exploring the boundaries of AI and Engineering through practical, hands-on development.
              </p>
            </div>
            <a 
              href="https://github.com/Esha-Mirza?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold group"
            >
              View all repositories <div className="icon-arrow-right text-lg group-hover:translate-x-1 transition-transform"></div>
            </a>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a 
                key={index} 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glassmorphism overflow-hidden lofi-card flex flex-col h-full border border-white/10 hover:border-blue-500/30 transition-all group cursor-pointer block"
              >
                {/* Terminal Header */}
                <div className="bg-slate-900/80 border-b border-white/5 px-4 py-2 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">project.py</div>
                  <div className="icon-terminal text-xs text-gray-600"></div>
                </div>

                {/* Code Body */}
                <div className="p-4 bg-[#0d1117]/50 font-mono text-xs overflow-x-auto">
                  <pre className="text-blue-200/90 leading-relaxed whitespace-pre overflow-hidden">
                    <code>
                      {project.codeSnippet}
                    </code>
                  </pre>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-slate-950/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                        <div className={`${project.icon} text-xl text-blue-400`}></div>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[9px] font-bold text-blue-300/60 uppercase tracking-widest px-2 py-0.5 rounded-md border border-blue-400/10 bg-blue-500/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-bold text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                      View Source <div className="icon-external-link text-xs"></div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Projects component error:', error);
  }
}