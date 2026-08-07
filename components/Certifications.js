function Certifications() {
  try {
    const certifications = [
      {
        title: 'Artificial Intelligence Fundamentals',
        issuer: 'IBM SkillsBuild',
        date: '2026',
        icon: 'icon-brain',
        url: 'https://skills.yourlearning.ibm.com/credential/CREDLY-29bdaec3-af04-458e-a70e-2e6fa78c5dd5'
      },
      {
        title: 'Generative AI in Action',
        issuer: 'IBM SkillsBuild',
        date: '2026',
        icon: 'icon-sparkles',
        url: 'https://skills.yourlearning.ibm.com/credential/CREDLY-6dddb2ad-cc46-4b09-ae65-41001f8d62a5'
      },
      {
        title: 'Build an AI Agent',
        issuer: 'IBM SkillsBuild',
        date: '2026',
        icon: 'icon-bot',
        url: 'https://skills.yourlearning.ibm.com/credential/CREDLY-3dfee891-aad9-4890-856d-d7c1472b7a4e'
      },
      {
        title: 'Python Essential 1',
        issuer: 'Cisco Networking Academy',
        date: '2026',
        icon: 'icon-code',
        url: 'https://www.credly.com/badges/0cd4eb01-4faf-4cda-927e-b49f659cef46/public_url'
      },
      {
        title: 'AWS AI Practitioner Challenge',
        issuer: 'Udacity',
        date: '2026',
        icon: 'icon-cloud'
      },
      {
        title: 'Generative AI Application Developer',
        issuer: 'ULEF,HEC',
        date: '2026',
        icon: 'icon-star'
      }
    ];

    return (
      <section
        id="certifications"
        className="section-spacing relative overflow-hidden"
        data-name="certifications"
        data-file="components/Certifications.js"
      >
        <style>{`
          .cert-section-grid {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.025;
            background-image:
              linear-gradient(rgba(96,165,250,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.8) 1px, transparent 1px);
            background-size: 58px 58px;
          }

          .cert-section-glow {
            position: absolute;
            width: 480px;
            height: 480px;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
            background: radial-gradient(
              circle,
              rgba(59,130,246,0.075),
              transparent 68%
            );
            pointer-events: none;
          }

          .cert-heading-line {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            max-width: 210px;
            margin: 0 auto 18px;
          }

          .cert-heading-line::before,
          .cert-heading-line::after {
            content: "";
            height: 1px;
            flex: 1;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(96,165,250,0.5)
            );
          }

          .cert-heading-line::after {
            background: linear-gradient(
              90deg,
              rgba(96,165,250,0.5),
              transparent
            );
          }

          .cert-heading-node {
            width: 7px;
            height: 7px;
            border: 1px solid rgba(96,165,250,0.8);
            transform: rotate(45deg);
            box-shadow: 0 0 12px rgba(59,130,246,0.45);
          }

          .cert-header {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 30px;
            margin-bottom: 42px;
          }

          .cert-header-copy {
            max-width: 720px;
          }

          .cert-header-label {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            margin-bottom: 14px;
            color: #60a5fa;
            font-family: monospace;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .cert-header-label span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3b82f6;
            box-shadow: 0 0 9px rgba(59,130,246,0.8);
          }

          .cert-header-description {
            color: #64748b;
            font-size: 14px;
            line-height: 1.7;
            max-width: 680px;
          }

          .cert-link {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            flex-shrink: 0;
            padding: 12px 17px;
            border: 1px solid rgba(96,165,250,0.18);
            border-radius: 8px;
            background: rgba(59,130,246,0.035);
            color: #7da9dc;
            font-family: monospace;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            transition: all 0.3s ease;
          }

          .cert-link:hover {
            color: #bfdbfe;
            border-color: rgba(96,165,250,0.38);
            background: rgba(59,130,246,0.08);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.18);
          }

          .cert-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .cert-card {
            position: relative;
            min-height: 245px;
            display: flex;
            flex-direction: column;
            padding: 22px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 12px;
            background:
              linear-gradient(
                145deg,
                rgba(10,18,35,0.92),
                rgba(4,9,20,0.94)
              );
            box-shadow:
              0 16px 45px rgba(0,0,0,0.22),
              inset 0 1px 0 rgba(255,255,255,0.02);
            transition:
              transform 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;
          }

          .cert-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 20px;
            right: 20px;
            height: 1px;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(96,165,250,0.5),
              transparent
            );
            opacity: 0.55;
          }

          .cert-card::after {
            content: "";
            position: absolute;
            width: 120px;
            height: 120px;
            right: -65px;
            bottom: -65px;
            border: 1px solid rgba(96,165,250,0.08);
            border-radius: 50%;
            box-shadow:
              0 0 0 15px rgba(96,165,250,0.012),
              0 0 0 30px rgba(96,165,250,0.008);
            pointer-events: none;
          }

          .cert-card:hover {
            transform: translateY(-6px);
            border-color: rgba(96,165,250,0.25);
            box-shadow:
              0 22px 55px rgba(0,0,0,0.32),
              0 0 28px rgba(59,130,246,0.06);
          }

          .cert-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 22px;
          }

          .cert-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(96,165,250,0.18);
            border-radius: 10px;
            background:
              linear-gradient(
                145deg,
                rgba(59,130,246,0.09),
                rgba(59,130,246,0.025)
              );
            color: #60a5fa;
            font-size: 21px;
            box-shadow: inset 0 0 18px rgba(59,130,246,0.025);
            transition: all 0.3s ease;
          }

          .cert-card:hover .cert-icon {
            color: #93c5fd;
            border-color: rgba(96,165,250,0.34);
            background: rgba(59,130,246,0.12);
            box-shadow: 0 0 22px rgba(59,130,246,0.08);
          }

          .cert-status {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 8px;
            border: 1px solid rgba(96,165,250,0.11);
            border-radius: 5px;
            color: #64748b;
            font-family: monospace;
            font-size: 7px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .cert-status-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #3b82f6;
            box-shadow: 0 0 7px rgba(59,130,246,0.7);
          }

          .cert-title {
            min-height: 52px;
            margin-bottom: 10px;
            color: #e2e8f0;
            font-size: 15px;
            font-weight: 700;
            line-height: 1.4;
            transition: color 0.3s ease;
          }

          .cert-card:hover .cert-title {
            color: #bfdbfe;
          }

          .cert-issuer {
            margin-bottom: 15px;
            color: #60a5fa;
            font-family: monospace;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .cert-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-top: auto;
            padding-top: 15px;
            border-top: 1px solid rgba(255,255,255,0.05);
          }

          .cert-date {
            display: flex;
            align-items: center;
            gap: 7px;
            color: #64748b;
            font-family: monospace;
            font-size: 9px;
            letter-spacing: 0.06em;
          }

          .cert-date-icon {
            color: #4f78a8;
          }

          .cert-verify {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #6f94c3;
            font-family: monospace;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            transition: all 0.25s ease;
          }

          .cert-verify:hover {
            color: #93c5fd;
          }

          .cert-unavailable {
            color: #475569;
            font-family: monospace;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .cert-index {
            position: absolute;
            right: 20px;
            bottom: 18px;
            color: rgba(96,165,250,0.13);
            font-family: monospace;
            font-size: 24px;
            font-weight: 700;
            pointer-events: none;
          }

          @media (max-width: 1024px) {
            .cert-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 700px) {
            .cert-header {
              align-items: flex-start;
              flex-direction: column;
            }

            .cert-grid {
              grid-template-columns: 1fr;
            }

            .cert-card {
              min-height: 225px;
            }
          }
        `}</style>

        <div className="cert-section-grid"></div>
        <div className="cert-section-glow"></div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="cert-heading-line">
            <div className="cert-heading-node"></div>
          </div>

          <div className="cert-header">
            <div className="cert-header-copy">
              <div className="cert-header-label">
                <span></span>
                Verified Credentials
              </div>

              <h2 className="text-4xl font-bold lofi-text mb-4">
                Certifications
              </h2>

              <p className="cert-header-description">
                Validated expertise through industry-recognized programs and continuous professional development.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/esha-mirza1623"
              target="_blank"
              rel="noopener noreferrer"
              className="cert-link"
            >
              View All
              <div className="icon-arrow-right text-sm"></div>
            </a>
          </div>

          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <article
                key={index}
                className="cert-card"
              >
                <div className="cert-top">
                  <div className="cert-icon">
                    <div className={`${cert.icon}`}></div>
                  </div>

                  <div className="cert-status">
                    <span className="cert-status-dot"></span>
                    {cert.url ? 'Verified' : 'Credential'}
                  </div>
                </div>

                <h3 className="cert-title">
                  {cert.title}
                </h3>

                <div className="cert-issuer">
                  {cert.issuer}
                </div>

                <div className="cert-meta">
                  <div className="cert-date">
                    <span className="cert-date-icon">
                      <div className="icon-calendar text-[11px]"></div>
                    </span>
                    {cert.date}
                  </div>

                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify"
                    >
                      Verify
                      <div className="icon-external-link text-[10px]"></div>
                    </a>
                  ) : (
                    <span className="cert-unavailable">
                      Verification Pending
                    </span>
                  )}
                </div>

               
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Certifications component error:', error);
  }
}