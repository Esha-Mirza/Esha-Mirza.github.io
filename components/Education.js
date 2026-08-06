function Education() {
  try {
    const educationData = [
      {
        degree: "Bachelors of Artificial Intelligence",
        institution: "Bahria University Islamabad",
        duration: "2024 – 2028",
        description: "Currently pursuing a BSAI degree, specializing in core AI disciplines including machine learning algorithms, statistical modeling, and neural network design. Regular participation in technical symposiums and competitive programming events complements academic learning with hands-on application.",
        status: "Currently Pursuing",
        icon: "icon-graduation-cap"
      }
    ];

    return (
      <section id="education" className="section-spacing" data-name="education" data-file="components/Education.js">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold text-center mb-16 lofi-text">Education</h2>
          
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <div key={index} className="glassmorphism p-8 lofi-card border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600/20 transition-all flex-shrink-0">
                    <div className={`${edu.icon} text-3xl text-blue-400`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                       <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {edu.degree}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-800/30">
                        {edu.status}
                      </span>
                    </div>
                    <p className="text-blue-300 font-semibold mb-2">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-mono mb-4">
                      <div className="icon-calendar text-xs"></div>
                      {edu.duration}
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-2xl">
                      {edu.description}
                    </p>
                  </div>
                </div>
                {/* Subtle background icon */}
                <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
                   <div className="icon-book-open text-9xl text-blue-400"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Education component error:', error);
  }
}