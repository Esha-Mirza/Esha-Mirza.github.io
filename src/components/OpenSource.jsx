import React from "react";

function OpenSource() {
  try {
    const repos = [
      {
        name: "SkiTrack ",
        description: "Local-first framework for AI agents and ML experimentation with LangChain and Scikit-Learn.",
        stars: "1",
        forks: "1",
        status: "Complete",
        tech: ['Python','Flask', 'Scikit-Learn','CLI','React-Vite','Machine-Learning','Devepers-Tools'],
        url: "https://github.com/Esha-Mirza/skitrack"
      },
      {
        name: "Multi-RAG-Groq",
        description: "Multi-document Q&A system with source attribution using Groq API, ChromaDB, and FastAPI.",
        stars: "0",
        forks: "0",
        status: "In Progress",
        tech: ['React','Docker','LLM', 'FastAPI', 'ChromaDB' ,"Groq API",'LangChain'],
        url: "https://github.com/Esha-Mirza/Multi-RAG-Groq"
      },
      {
        name: "VoiceForge AI",
        description: "voice AI combining speech recognition, LLM reasoning, multi-agent orchestration, and text-to-speech..",
        stars: "0",
        forks: "0",
        status: "In Progress",
        tech: ['text-to-speech','Docker','Conversational-AI', 'Voice-Assistant' ,"Generative-AI",'Speech-Recognition'],
        url: "https://github.com/Esha-Mirza/voice-controlled-agent-ai"
      },

    ];

    return (
      <section id="opensource" className="section-spacing">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 scroll-reveal">
            <div>
              <h2 className="text-4xl font-bold lofi-text mb-4">Open Source Contributions</h2>
              <p className="text-gray-400 max-w-2xl">
                I believe in giving back to the community. Here are some of the open-source projects I've built and maintained.
              </p>
            </div>
            <a 
              href="https://github.com/Esha-Mirza?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold group"
            >
              View more <div className="icon-arrow-right text-lg group-hover:translate-x-1 transition-transform duration-300"></div>
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <div 
                key={index} 
                className="glassmorphism p-6 lofi-card flex flex-col h-full border border-white/5 hover:border-blue-500/30 transition-all duration-500 group scroll-reveal"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="icon-folder text-3xl text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-300"></div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-gray-400 text-sm transition-colors duration-300 group-hover:text-gray-300">
                      <div className="icon-star text-sm transition-transform duration-300 group-hover:scale-110"></div>
                      {repo.stars}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm transition-colors duration-300 group-hover:text-gray-300">
                      <div className="icon-git-fork text-sm transition-transform duration-300 group-hover:scale-110"></div>
                      {repo.forks}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                    repo.status === 'Complete' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20 group-hover:border-green-400/40' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:border-amber-400/40'
                  } transition-all duration-300`}>
                    {repo.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                  {repo.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 transition-colors duration-300 group-hover:text-gray-300">
                  {repo.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-500/15">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all duration-300 group-hover:border-blue-500/20 border border-transparent"
                >
                  <div className="icon-github text-lg transition-transform duration-300 group-hover:scale-110"></div> Repository
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('OpenSource component error:', error);
  }
}
export default OpenSource;
