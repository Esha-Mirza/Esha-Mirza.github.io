import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpwork } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  try {
    const [status, setStatus] = React.useState('idle');
    const [formData, setFormData] = React.useState({ name: '', email: '', msg: '' });
    const [showCV, setShowCV] = React.useState(false);
    const [scanFill, setScanFill] = React.useState(false);
    const [scanVerified, setScanVerified] = React.useState(false);

    React.useEffect(() => {
      if (!showCV) return;
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setShowCV(false);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showCV]);

    React.useEffect(() => {
      if (!showCV) return;
      setScanFill(false);
      setScanVerified(false);
      const fillTimer = setTimeout(() => setScanFill(true), 100);
      const verifyTimer = setTimeout(() => setScanVerified(true), 1100);
      return () => {
        clearTimeout(fillTimer);
        clearTimeout(verifyTimer);
      };
    }, [showCV]);

    const confirmCVDownload = () => {
      const link = document.createElement('a');
      link.href = 'assets/Esha_Mirza_Resume.pdf';
      link.download = 'Esha_Mirza_Resume.pdf';
      link.click();
      setShowCV(false);
    };

    const RECEIVING_EMAIL = 'esha101374@gmail.com';

    const contactInfo = [
      {
        label: 'Email',
        value: 'esha101374@gmail.com',
        url: `mailto:${RECEIVING_EMAIL}`,
        icon: 'icon-mail',
        color: 'text-blue-300'
      },
      {
        label: 'LinkedIn',
        value: 'esha-mirza1623',
        url: 'https://www.linkedin.com/in/esha-mirza1623/',
        icon: 'icon-linkedin',
        color: 'text-blue-400'
      },
      {
        label: 'GitHub',
        value: 'Esha-Mirza',
        url: 'https://github.com/Esha-Mirza',
        icon: 'icon-github',
        color: 'text-blue-200'
      },
      {
        label: 'Upwork',
        value: 'Esha M.',
        url: 'https://www.upwork.com/freelancers/~01d58e69574b649cd1?mp_source=share',
        icon: <FontAwesomeIcon icon={faUpwork} />,
        color: 'text-blue-300'
      }
    ];

    const handleAutoFill = (field) => (e) => {
      if (e.animationName === 'onAutoFillStart') {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      }
    };

    return (
      <section id="contact" className="section-spacing relative bg-[#020817] scroll-reveal">
        <style>{`
          #contact input:-webkit-autofill,
          #contact input:-webkit-autofill:hover,
          #contact input:-webkit-autofill:focus {
            -webkit-text-fill-color: #ffffff;
            -webkit-box-shadow: 0 0 0px 1000px #020617 inset;
            box-shadow: 0 0 0px 1000px #020617 inset;
            transition: background-color 9999s ease-in-out 0s;
            caret-color: #ffffff;
            animation-name: onAutoFillStart;
          }
          @keyframes onAutoFillStart {
            from {}
            to {}
          }
        `}</style>

        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-0 items-stretch border border-blue-900/40 rounded-3xl overflow-hidden shadow-2xl shadow-blue-950/20 transition-all duration-500 hover:border-blue-800/50 hover:shadow-[0_20px_60px_rgba(30,58,138,0.2)]">

            <div className="flex-1 bg-slate-950 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-blue-900/30">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800/50 mb-8 transition-all duration-300 hover:border-blue-600/50 hover:bg-blue-900/40">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">System Online</span>
              </div>

              <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight leading-none scroll-reveal">
                Establish <br />
                <span className="text-blue-600">Connection</span>
              </h2>

              <p className="text-slate-400 mb-12 max-w-sm font-medium leading-relaxed scroll-reveal reveal-delay-1 transition-colors duration-300 hover:text-slate-300">
                Ready to collaborate on advanced AI models or high-performance Python architectures.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) =>
                  info.label === 'Email' ? (
                    <a
                      key={info.label}
                      onClick={() => {
                        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=esha101374@gmail.com&su=AI/ML%20Collaboration', '_blank');
                      }}
                      className="flex items-center gap-4 group cursor-pointer scroll-reveal"
                      style={{ transitionDelay: '120ms' }}
                    >
                      <div className="w-10 h-10 rounded bg-blue-950/50 flex items-center justify-center border border-blue-900/50 group-hover:border-blue-600 group-hover:bg-blue-900/30 transition-all duration-300">
                        <div className={`${info.icon} text-lg ${info.color} transition-transform duration-300 group-hover:scale-110`}></div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-blue-700 tracking-tighter leading-none mb-1 transition-colors duration-300 group-hover:text-blue-500">{info.label}</p>
                        <p className="text-slate-300 font-mono text-sm group-hover:text-blue-400 transition-colors duration-300">{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <a key={info.label} href={info.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group scroll-reveal" style={{ transitionDelay: '120ms' }}>
                      <div className="w-10 h-10 rounded bg-blue-950/50 flex items-center justify-center border border-blue-900/50 group-hover:border-blue-600 group-hover:bg-blue-900/30 transition-all duration-300">
                        <div className={`${info.icon} text-lg ${info.color} transition-transform duration-300 group-hover:scale-110`}></div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-blue-700 tracking-tighter leading-none mb-1 transition-colors duration-300 group-hover:text-blue-500">{info.label}</p>
                        <p className="text-slate-300 font-mono text-sm group-hover:text-blue-400 transition-colors duration-300">{info.value}</p>
                      </div>
                    </a>
                  )
                )}
              </div>

              <div className="mt-16 pt-8 border-t border-blue-900/20">
                <div className="flex gap-1 mb-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-8 w-1.5 rounded-full transition-all duration-500 ${i < 8 ? 'bg-blue-600/40' : 'bg-slate-800'}`} style={{ transitionDelay: `${i * 50}ms` }}></div>
                  ))}
                </div>
                <p className="text-[9px] font-mono text-blue-900 uppercase tracking-widest">Resource_Allocation_Status: STABLE</p>
              </div>
            </div>

            <div className="flex-[1.4] bg-[#020617] p-8 md:p-12 flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-lg font-bold text-white flex items-center gap-3">
                  <div className="icon-terminal text-blue-600 transition-transform duration-300 hover:scale-110"></div>
                  Input_Protocol.v1
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCV(true)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-blue-900/20 text-blue-400 border border-blue-800/40 px-4 py-2 rounded hover:bg-blue-800/40 transition-all duration-300 cursor-pointer hover:border-blue-600/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <div className="icon-download transition-transform duration-300 group-hover:translate-y-0.5"></div> Resume
                </button>
              </div>

              <form className="space-y-8 relative">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="new-password"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onAnimationStart={handleAutoFill('name')}
                      className="peer w-full bg-transparent border-b-2 border-slate-800 py-3 text-white focus:outline-none focus:border-blue-800 transition-all duration-300 hover:border-slate-700"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-0 uppercase text-[10px] font-bold tracking-widest pointer-events-none transition-all duration-300 bg-[#020617] px-2 py-0.5 rounded z-10 ${
                        formData.name
                          ? '-top-7 text-blue-600'
                          : 'top-3 text-slate-500 peer-focus:-top-7 peer-focus:text-blue-600'
                      }`}
                    >
                      Identity
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="new-password"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onAnimationStart={handleAutoFill('email')}
                      className="peer w-full bg-transparent border-b-2 border-slate-800 py-3 text-white focus:outline-none focus:border-blue-800 transition-all duration-300 hover:border-slate-700"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-0 uppercase text-[10px] font-bold tracking-widest pointer-events-none transition-all duration-300 bg-[#020617] px-2 py-0.5 rounded z-10 ${
                        formData.email
                          ? '-top-7 text-blue-600'
                          : 'top-3 text-slate-500 peer-focus:-top-7 peer-focus:text-blue-600'
                      }`}
                    >
                      Secure_Mail
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    id="msg"
                    name="msg"
                    required
                    rows="4"
                    value={formData.msg}
                    onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                    className="peer w-full bg-transparent border-b-2 border-slate-800 py-3 text-white focus:outline-none focus:border-blue-800 transition-all duration-300 hover:border-slate-700 resize-none"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="msg"
                    className={`absolute left-0 uppercase text-[10px] font-bold tracking-widest pointer-events-none transition-all duration-300 bg-[#020617] px-2 py-0.5 rounded z-10 ${
                      formData.msg
                        ? '-top-7 text-blue-600'
                        : 'top-3 text-slate-500 peer-focus:-top-7 peer-focus:text-blue-600'
                    }`}
                  >
                    Mission_Details
                  </label>
                </div>

                <div className="pt-6 relative">
                  <button
                    type="button"
                    disabled={status === 'sending'}
                    onClick={() => {
                      if (!formData.name || !formData.email || !formData.msg) {
                        setStatus('error');
                        setTimeout(() => setStatus('idle'), 3000);
                        return;
                      }
                      setStatus('sending');
                      try {
                        const su = encodeURIComponent(`New message from ${formData.name}`);
                        const body = encodeURIComponent(
                          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.msg}`
                        );
                        window.open(
                          `https://mail.google.com/mail/?view=cm&fs=1&to=${RECEIVING_EMAIL}&su=${su}&body=${body}`,
                          '_blank'
                        );
                        setStatus('success');
                        setFormData({ name: '', email: '', msg: '' });
                        setTimeout(() => setStatus('idle'), 5000);
                      } catch (err) {
                        console.error(err);
                        setStatus('error');
                        setTimeout(() => setStatus('idle'), 3000);
                      }
                    }}
                    className={`group w-full py-4 font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-lg shadow-blue-950/40 border btn-shine ${
                      status === 'sending'
                        ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-[#0a192f] border-blue-900 text-blue-400 hover:bg-blue-950 hover:border-blue-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                    }`}
                  >
                    {status === 'sending' ? 'Transmitting...' : 'Initiate_Transmission'}
                    <div className={`text-base transition-transform duration-300 ${status === 'sending' ? 'icon-loader animate-spin' : 'icon-arrow-right group-hover:translate-x-2'}`}></div>
                  </button>

                  {status === 'success' && (
                    <div className="absolute -top-16 left-0 right-0 animate-bounce">
                      <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-center text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        <div className="icon-circle-check inline-block mr-2 text-sm align-middle"></div>
                        Opening Gmail...
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="absolute -top-16 left-0 right-0">
                      <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-center text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        Please Fill All Fields Before Sending
                      </div>
                    </div>
                  )}

                  <p className="text-center text-[9px] text-slate-600 mt-6 uppercase tracking-widest font-mono">End_of_Transmission_Packet</p>
                </div>
              </form>
            </div>

          </div>
        </div>

        <div
          onClick={() => setShowCV(false)}
          className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm transition-all duration-500 ${
            showCV ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#0a1222] border border-blue-900/40 rounded-2xl w-full max-w-md p-6 md:p-8 shadow-2xl shadow-blue-950/30 transition-all duration-500 relative ${
              showCV ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
            }`}
          >
            <button
              type="button"
              onClick={() => setShowCV(false)}
              aria-label="Close"
              title="Close"
              className="icon-x absolute top-6 right-6 text-lg text-slate-500 hover:text-blue-400 transition-all duration-300 cursor-pointer bg-transparent border-0 p-0 hover:rotate-90"
            ></button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 hover:bg-blue-600/25">
                <div className="icon-file-text text-xl text-blue-400"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Curriculum Vitae</h3>
                <p className="text-[11px] font-mono text-blue-400 tracking-wide mt-1">ESHA_MIRZA_RESUME.PDF</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 transition-colors duration-300 hover:text-slate-300">
              Detailed technical experience, project breakdown, and comprehensive skill assessment for Esha Mirza.
            </p>

            <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-4 mb-6 transition-all duration-300 hover:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Security_Scan</span>
                <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${scanVerified ? 'text-green-500' : 'text-slate-500'}`}>
                  {scanVerified ? 'Verified' : 'Scanning...'}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] transition-all duration-1000 ease-out"
                  style={{ width: scanFill ? '100%' : '0%' }}
                ></div>
              </div>
            </div>

            <button
              type="button"
              onClick={confirmCVDownload}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-95 btn-shine"
            >
              Confirm Download <span className="icon-download transition-transform duration-300 group-hover:translate-y-0.5"></span>
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Contact component error:', error);
    return (
      <section id="contact" className="section-spacing relative bg-[#020817] text-red-400 text-center py-12">
        Something went wrong loading the contact section.
      </section>
    );
  }
}
export default Contact;
