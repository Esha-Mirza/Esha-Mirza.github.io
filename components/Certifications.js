function Certifications() {
  try {
    const certifications = [
            { title: 'Artificial Intelligence Fundamentals',
        issuer: 'IBM SkillsBuild', 
        date: '2026', 
        icon: 'icon-brain', 
        url: 'https://skills.yourlearning.ibm.com/credential/CREDLY-29bdaec3-af04-458e-a70e-2e6fa78c5dd5' },

      { title: 'Generative AI in Action', 
        issuer: 'IBM SkillsBuild', 
        date: '2026', 
        icon: 'icon-sparkles',
        url: 'https://skills.yourlearning.ibm.com/credential/CREDLY-6dddb2ad-cc46-4b09-ae65-41001f8d62a5' },

      { title: 'Build an AI Agent', 
        issuer: 'IBM SkillsBuild', 
        date: '2026', 
        icon: 'icon-bot' ,
        url: 'https://skills.yourlearning.ibm.com/credential/CREDLY-3dfee891-aad9-4890-856d-d7c1472b7a4e' },

      { title: 'Python Essential 1', 
        issuer: 'Cisco Networking Academy', 
        date: '2026', 
        icon: 'icon-code',
        url: 'https://www.credly.com/badges/0cd4eb01-4faf-4cda-927e-b49f659cef46/public_url' },

      { title: 'AWS AI Practitioner Challenge', 
        issuer: 'Udacity',
        date: '2026', 
        icon: 'icon-cloud',
        //url:''
      },

      { title: 'Generative AI Application Developer', 
        issuer: 'ULEF,HEC', 
        date: '2026', 
        icon: 'icon-star',
        //url:'-'
      }
    ];

    return (
      <section id="certifications" className="section-spacing" data-name="certifications" data-file="components/Certifications.js">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold lofi-text mb-4">Certifications</h2>
              <p className="text-gray-400 max-w-2xl">
                Validated expertise through industry-recognized programs and continuous professional development.
              </p>
            </div>
            <a 
              href="https://www.linkedin.com/in/esha-mirza1623" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold group"
            >
              View all certificates <div className="icon-arrow-right text-lg group-hover:translate-x-1 transition-transform"></div>
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="glassmorphism p-6 lofi-card flex flex-col border border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center lofi-glow flex-shrink-0 group-hover:scale-110 transition-transform">
                    <div className={`${cert.icon} text-xl text-blue-400`}></div>
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-white mb-1 leading-snug group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mb-4">
                      <div className="icon-calendar text-[10px]"></div>
                      {cert.date}
                    </div>
                    <a 
                      href={cert.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      Verify Credential 
                      <div className="icon-external-link text-xs group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"></div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Certifications component error:', error);
  }
}