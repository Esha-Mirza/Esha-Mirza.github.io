function OpenSource() {
  try {
    const repos = [
      {
        name: "Local-First-Experiment-Tracker-for-Scikit-Learn ",
        description: "Local-first framework for AI agents and ML experimentation with LangChain and Scikit-Learn.",
        stars: "0",
        forks: "0",
        tech: ['Python','React Vite','LangChain', 'Scikit-Learn'],
        url: "https://github.com/Esha-Mirza/Local-First-Experiment-Tracker-for-Scikit-Learn"
      },
      {
        name: "Multi-RAG-Groq",
        description: "Multi-document Q&A system with source attribution using Grok API, ChromaDB, and FastAPI.",
        stars: "0",
        forks: "0",
        tech: ['React','Docker','LLM', 'FastAPI', 'Qdrant' ,"Grok API"],
        url: "https://github.com/Esha-Mirza/Multi-RAG-Groq"
      },

    ];

    return (
      <section id="opensource" className="section-spacing" data-name="opensource" data-file="components/OpenSource.js">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold group"
            >
              View all repositories <div className="icon-arrow-right text-lg group-hover:translate-x-1 transition-transform"></div>
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <div 
                key={index} 
                className="glassmorphism p-6 lofi-card flex flex-col h-full border border-white/5 hover:border-blue-500/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="icon-folder text-3xl text-blue-400"></div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <div className="icon-star text-sm"></div>
                      {repo.stars}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <div className="icon-git-fork text-sm"></div>
                      {repo.forks}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors cursor-pointer">
                  {repo.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                  {repo.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all"
                >
                  <div className="icon-github text-lg"></div> Repository
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