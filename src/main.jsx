import React from "react";
import { createRoot } from "react-dom/client";

import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Projects from "./components/Projects.jsx";
import OpenSource from "./components/OpenSource.jsx";
import Experience from "./components/Experience.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
          <div className="glassmorphism p-8 max-w-md text-center">
            <div className="icon-triangle-alert text-5xl text-red-500 mb-4 mx-auto"></div>
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-gray-400 mb-6">The application encountered an unexpected error. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Reveals elements as they enter the viewport. A single shared observer handles
// every animated node on the page, and each target is unobserved once revealed.
function useScrollReveal() {
  React.useEffect(() => {
    const selector = '.scroll-reveal, .scale-reveal, .slide-left, .slide-right, .slide-up';

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll(selector).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// The page runs about thirty looping CSS animations at once (pulsing dots,
// breathing glows, shimmering nodes). Every one of them forces a style recalc on
// every frame even when its section is nowhere near the viewport. Pausing the
// ones that are off screen costs nothing visually and takes a large slice of
// idle main-thread work back.
function useOffscreenAnimationPause() {
  React.useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('section, footer');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('animations-idle', !entry.isIntersecting);
        });
      },
      // Resume a little before the section scrolls into view so nothing is caught
      // mid-pause at the moment it becomes visible.
      { rootMargin: '250px 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
}

function App() {
  useScrollReveal();
  useOffscreenAnimationPause();

  return (
    <ErrorBoundary>
      <div className="App">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <OpenSource />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')).render(<App />);
