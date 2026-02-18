import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import { getHeroContent, getFeaturedProjects } from './lib/queries';

// Lazy-load pages to keep the main bundle small
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    if (projectId) {
      getHeroContent()
        .then(setHeroData)
        .catch((err) => console.warn('Sanity fetch skipped:', err.message));
      
      getFeaturedProjects()
        .then(setProjects)
        .catch((err) => console.warn('Projects fetch skipped:', err.message));
    }
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero
          videoUrl={heroData?.videoUrl}
          headline={heroData?.headline}
          subheadline={heroData?.subheadline}
          overlayOpacity={heroData?.overlayOpacity}
        />
        
        {/* Featured Projects Section */}
        <section id="work" className="bg-grey-light py-20 px-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-12">
              <h2 className="font-sans font-bold text-5xl md:text-6xl text-black tracking-[-0.02em] uppercase mb-4">
                SELECTED<span className="text-grey">.</span>
              </h2>
              <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                Featured Projects
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
            
            {projects.length === 0 && (
              <div className="text-center py-16 border-[3px] border-black brutal-shadow bg-white">
                <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                  No projects yet — Add content in Sanity Studio
                </p>
                <a
                  href="https://studio.hadilalduleimi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-3 bg-black text-white font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black brutal-shadow-sm brutal-hover"
                >
                  Open Studio
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PageLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.25rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}
    >
      Loading...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/work/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
