import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import { getHeroContent, getFeaturedProjects, getAllSiteContent } from './lib/queries';

// Lazy-load pages to keep the main bundle small
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));

// Admin pages (lazy-loaded)
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ContentPage = lazy(() => import('./pages/admin/ContentPage'));
const HeroVideoPage = lazy(() => import('./pages/admin/HeroVideoPage'));
const ProjectsPage = lazy(() => import('./pages/admin/ProjectsPage'));
const ProjectEditPage = lazy(() => import('./pages/admin/ProjectEditPage'));
const RequireAuth = lazy(() => import('./components/RequireAuth'));

function HomePage() {
  const [heroData, setHeroData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [siteContent, setSiteContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getHeroContent().catch(() => null),
      getFeaturedProjects().catch(() => []),
      getAllSiteContent().catch(() => ({})),
    ])
      .then(([hero, projs, content]) => {
        setHeroData(hero);
        setProjects(projs);
        setSiteContent(content);
      })
      .finally(() => setLoading(false));
  }, []);

  const aboutIntro = siteContent.about_intro || 'Architect and designer based in Melbourne, Australia. Specializing in creating spaces that blend functionality with innovative design.';
  const aboutTagline = siteContent.about_tagline || 'Architect · Designer · Melbourne';
  const contactEmail = siteContent.contact_email || 'hello@hadilalduleimi.com';
  const contactCta = siteContent.contact_cta || 'Ready to bring your project to life?';

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
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {!loading && projects.length === 0 && (
              <div className="text-center py-16 border-[3px] border-black brutal-shadow bg-white">
                <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                  No projects yet — Check back soon
                </p>
              </div>
            )}

            {projects.length > 0 && (
              <div className="mt-12 text-center">
                <a
                  href="/work"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                    font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                    brutal-shadow-sm brutal-hover"
                >
                  View All Projects
                </a>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white border-y-[3px] border-black py-20 px-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div>
                <h2 className="font-sans font-bold text-5xl md:text-6xl text-black tracking-[-0.02em] uppercase mb-4">
                  ABOUT<span className="text-grey">.</span>
                </h2>
                <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                  {aboutTagline}
                </p>
              </div>
              <div className="lg:col-span-2">
                <p className="font-sans text-xl text-grey leading-relaxed mb-8">
                  {aboutIntro}
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                    font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                    brutal-shadow-sm brutal-hover"
                >
                  More About Me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-black py-20 px-8">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-sans font-bold text-5xl md:text-6xl text-white tracking-[-0.02em] uppercase mb-4">
              CONTACT<span className="text-grey">.</span>
            </h2>
            <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-8">
              {contactCta}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black
                font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-white
                brutal-shadow brutal-hover"
            >
              {contactEmail}
            </a>
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/work"
            element={
              <Suspense fallback={<PageLoader />}>
                <WorkPage />
              </Suspense>
            }
          />
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

          {/* Admin routes */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<PageLoader />}>
                <RequireAuth>
                  <AdminLayout />
                </RequireAuth>
              </Suspense>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="hero-video" element={<HeroVideoPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectEditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
