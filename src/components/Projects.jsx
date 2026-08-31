import React from "react";

function Projects() {
  try {
    const projects = [
      { 
        title: 'FinIntel-AI', 
        description: 'A sophisticated multi-agent system where multiple AI agents shared persistent memory for collaborative problem-solving.',
        status: 'Beta',
        tech: ['Financial-AI', 'Mistral', 'LLM','Finanacial-Analysis', 'Python'],
        icon: 'icon-trending-up',
        url: 'https://github.com/Esha-Mirza/FinIntel-AI',
        codeSnippet: 'class FinIntelAI:\n    def analyze_market(self, data):\n        insights = [agent.process(data, memory) for agent in agents]\n        return self.synthesize(insights)'
      },
      { 
        title: 'Syntera', 
        description: 'Multi-agent AI framework for collaborative research and reasoning with shared memory and task orchestration.',
        status: 'Beta',
        tech: ['Agentic-AI', 'Persistent-Memory', 'Ollama', 'Agent-orchestration', 'Python'],
        icon: 'icon-git-branch',
        url: 'https://github.com/Esha-Mirza/Syntera',
        codeSnippet:'class Syntera:\n    def collaborate(self, task):\n        results = [agent.process(task, memory) for agent in agents]\n        return synthesize(results)'
      },
      { 
        title: 'CodeLens-AI', 
        description: 'AI code review assistant using local LLMs to detect issues and suggest improvements.',
        status: 'Stable',
        tech: ['LLM','FastAPI','Streamlit','AI-Assistant','Code-Review','Generative-AI'],
        icon: 'icon-code',
        url: 'https://github.com/Esha-Mirza/CodeLens-AI',
        codeSnippet: 'class CodeLensAI:\n    def analyze_code(self, code):\n        issues = self.llm_model.process(code)\n        return self.suggest_improvements(issues)'
      },
      { 
        title: 'Research-Pilot', 
        description:  'Multi-Agent system for automated research, fact-checking, and report generation.',
        status: 'Stable',
        tech: ['LLM','Ollama','Research-Assistant','Python', 'Research-Automation'],
        icon: 'icon-search',
        url: 'https://github.com/Esha-Mirza/Research-Pilot',
        codeSnippet: 'class ResearchAssistant:\n    def research(self, topic):\n        data = collector.gather(topic)\n        insights = analyzer.process(data)\n        return summarizer.synthesize(insights)'
      },
      { 
        title: 'Cognivue', 
        description: 'Multi-agent AI system for extracting insights, risks, decisions, and actions from unstructured documents.',
        status: 'Stable',
        tech: ['Document-Analysis', 'AI-Agents', 'Streamlit', 'FastAPI', 'Python'],
        icon: 'icon-file-search',
        url: 'https://github.com/Esha-Mirza/Cognivue',
        codeSnippet: 'class Cognivue:\n    def extract_insights(self, document):\n        insights = self.ai_model.process(document)\n        return insights'
      },
      { 
        title: 'MedStruct-AI', 
        description: 'Local AI-powered structuring for unstructured clinical notes.',
        status: 'Stable',
        tech: ['Python','Medical-AI',"Healthcare","Clinical-NLP"],
        icon: 'icon-stethoscope',
        url: 'https://github.com/Esha-Mirza/MedStruct-AI',
        codeSnippet: 'class MedStructAI:\n    def structure_notes(self, notes):\n        structured_data = self.nlp_model.process(notes)\n        return structured_data'
      }
    ];

    return (
      <section id="projects" className="section-spacing">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 scroll-reveal">
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
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold group"
            >
              View all repositories <div className="icon-arrow-right text-lg group-hover:translate-x-1 transition-transform duration-300"></div>
            </a>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a 
                key={index} 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glassmorphism overflow-hidden lofi-card flex flex-col h-full border border-white/10 hover:border-blue-500/30 transition-all duration-500 group cursor-pointer block scroll-reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-slate-900/80 border-b border-white/5 px-4 py-2 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 transition-all duration-300 group-hover:bg-red-500 group-hover:shadow-[0_0_6px_rgba(239,68,68,0.6)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 transition-all duration-300 group-hover:bg-yellow-500 group-hover:shadow-[0_0_6px_rgba(234,179,8,0.6)]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60 transition-all duration-300 group-hover:bg-green-500 group-hover:shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase transition-colors duration-300 group-hover:text-gray-400">project.py</div>
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                    project.status === 'Stable' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20 group-hover:border-green-400/40' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:border-amber-400/40'
                  } transition-all duration-300`}>
                    {project.status}
                  </span>
                </div>

                <div className="p-4 bg-[#0d1117]/50 font-mono text-xs overflow-x-auto transition-colors duration-500 group-hover:bg-[#0d1117]/70">
                  <pre className="text-blue-200/90 leading-relaxed whitespace-pre overflow-hidden">
                    <code>
                      {project.codeSnippet}
                    </code>
                  </pre>
                </div>

                <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-slate-950/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600/20 group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-300">
                        <div className={`${project.icon} text-xl text-blue-400 transition-transform duration-300 group-hover:scale-110`}></div>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 transition-colors duration-300 group-hover:text-gray-300">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[9px] font-bold text-blue-300/60 uppercase tracking-widest px-2 py-0.5 rounded-md border border-blue-400/10 bg-blue-500/5 transition-all duration-300 group-hover:border-blue-400/25 group-hover:bg-blue-500/10 group-hover:text-blue-300">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-bold text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 uppercase tracking-widest">
                      View Source <div className="icon-external-link text-xs transition-transform duration-300 group-hover:translate-x-1"></div>
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
export default Projects;
