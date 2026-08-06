class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
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

function App() {
  try {
    return (
      <ErrorBoundary>
        <div className="App" data-name="app" data-file="app.js">
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
  } catch (error) {
    console.error('App component error:', error);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);