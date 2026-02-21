import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AuthProvider } from './lib/AuthContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import useReveal from './hooks/useReveal';
import { getHeroContent, getFeaturedProjects, getAllSiteContent } from './lib/queries';
import { getPublicUrl } from './lib/supabase';

// Lazy-load pages to keep the main bundle small
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin pages (lazy-loaded)
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ContentPage = lazy(() => import('./pages/admin/ContentPage'));
const HeroVideoPage = lazy(() => import('./pages/admin/HeroVideoPage'));
const ProjectsPage = lazy(() => import('./pages/admin/ProjectsPage'));
const ProjectEditPage = lazy(() => import('./pages/admin/ProjectEditPage'));
const ResumePage = lazy(() => import('./pages/admin/ResumePage'));
const RequireAuth = lazy(() => import('./components/RequireAuth'));

// Animation variants for scroll-triggered sections
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } },
};

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

  const aboutIntro = siteContent.about_intro || 'Architect and designer based in Sydney, Australia. Specializing in creating spaces that blend functionality with innovative design.';
  const aboutTagline = siteContent.about_tagline || 'Architect · Designer · Sydney';
  const contactEmail = siteContent.contact_email || 'hadilalduleimi2@gmail.com';
  const contactCta = siteContent.contact_cta || 'Ready to bring your project to life?';
  const heroStatus = siteContent.hero_status || null;
  const profilePhotoUrl = siteContent.profile_photo_path
    ? getPublicUrl('profile-photo', siteContent.profile_photo_path)
    : null;

  useReveal();

  return (
    <>
      <Nav contactEmail={contactEmail} />
      <main id="main-content">
        <Hero
          videoUrl={heroData?.videoUrl}
          headline={heroData?.headline}
          subheadline={heroData?.subheadline}
          overlayOpacity={heroData?.overlayOpacity}
          heroStatus={heroStatus}
        />

        {/* Scroll-down indicator + hero→work divider */}
        <div className="relative bg-white" style={{ borderTop: '1px solid #ddd' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(0,0,0,0.4)' }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={16} strokeWidth={3} style={{ color: 'rgba(0,0,0,0.4)' }} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Featured Projects ── */}
        <section id="work" className="relative bg-white section-px" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              style={{ marginBottom: '32px' }}
            >
              <span className="font-mono text-[10px] font-medium text-grey tracking-[0.25em] uppercase block mb-4">
                002 — Work
              </span>
              <h2 className="font-sans font-bold text-5xl md:text-6xl text-black tracking-[-0.02em] uppercase mb-4">
                WORK<span className="text-grey">.</span>
              </h2>
              <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                Featured Projects
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#ddd' }}>
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.33, 1, 0.68, 1] }}
                  className="bg-white"
                  style={{ minHeight: '420px' }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
              {!loading && projects.length === 1 && (
                <div
                  className="bg-white flex flex-col items-center justify-center px-8 relative overflow-hidden"
                  style={{ border: '1px dashed #bbb', minHeight: '420px' }}
                >
                  {/* Watermark */}
                  <span
                    className="absolute font-sans font-bold select-none pointer-events-none"
                    style={{ fontSize: '180px', color: 'rgba(0,0,0,0.06)', lineHeight: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span
                    className="font-mono uppercase block mb-3 relative"
                    style={{ fontSize: '10px', letterSpacing: '0.25em', color: '#bbb' }}
                  >
                    002
                  </span>
                  <p
                    className="font-sans font-bold uppercase text-center text-black relative"
                    style={{ fontSize: '18px', lineHeight: 1.3 }}
                  >
                    New Project<br />Coming Soon
                  </p>
                </div>
              )}
            </div>

            {!loading && projects.length === 0 && (
              <div className="text-center py-16" style={{ border: '1px solid #ddd' }}>
                <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase">
                  No projects yet — Check back soon
                </p>
              </div>
            )}

            {projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 text-right"
              >
                <a
                  href="/work"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                    font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                    brutal-shadow-sm btn-fill btn-fill-light"
                >
                  View All Projects
                </a>
              </motion.div>
            )}
          </div>
        </section>

        {/* work→about divider */}
        <div style={{ height: '1px', background: '#ddd' }} />

        {/* ── About ── */}
        <section id="about" className="bg-white section-px" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] items-center" style={{ gap: '60px' }}>
                {/* Left — Image */}
                <div
                  className="brutal-border brutal-shadow bg-grey-light overflow-hidden w-full"
                  style={{ aspectRatio: '4/5', maxHeight: '480px' }}
                >
                  {profilePhotoUrl ? (
                    <img
                      src={profilePhotoUrl}
                      alt="Hadil Al-Duleimi"
                      className="w-full h-full object-cover grayscale"
                      style={{ objectPosition: 'center 15%' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-sans font-bold text-[8rem] text-black/5 leading-none tracking-[-0.04em] uppercase select-none">
                        H.A
                      </span>
                    </div>
                  )}
                </div>
                {/* Right — Text + CTA */}
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-medium text-grey tracking-[0.25em] uppercase block" style={{ marginBottom: '16px' }}>
                    003 — About
                  </span>
                  <h2 className="font-sans font-bold text-black tracking-[-0.02em] uppercase" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '16px' }}>
                    ABOUT<span className="text-grey">.</span>
                  </h2>
                  <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase" style={{ marginBottom: '16px' }}>
                    {aboutTagline}
                  </p>
                  <p className="font-sans text-lg text-grey leading-relaxed" style={{ marginBottom: '16px' }}>
                    {aboutIntro}
                  </p>
                  <div style={{ marginTop: '24px' }}>
                    <a
                      href="/about"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                        font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                        brutal-shadow-sm btn-fill btn-fill-light"
                    >
                      More About Me
                      <ArrowUpRight size={14} strokeWidth={3} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* section divider */}
        <div style={{ height: '1px', background: '#1a1a1a' }} />

        {/* ── Contact ── */}
        <section id="contact" className="bg-black section-px" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="flex flex-col items-center" style={{ gap: '16px' }}>
                <span className="font-mono text-[10px] font-medium text-grey tracking-[0.25em] uppercase">
                  004 — Contact
                </span>
                <h2 className="font-sans font-bold text-5xl md:text-7xl text-white tracking-[0.04em] uppercase text-center">
                  LET'S WORK<br />TOGETHER<span className="text-grey">.</span>
                </h2>
                <p className="font-mono text-sm text-grey tracking-[0.25em] uppercase text-center max-w-lg">
                  {contactCta}
                </p>
                <div style={{ marginTop: '16px' }}>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black
                      font-mono text-sm tracking-[0.15em] uppercase border-[3px] border-white
                      brutal-shadow btn-fill btn-fill-dark"
                  >
                    {contactEmail}
                    <ArrowUpRight size={18} strokeWidth={3} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer siteContent={siteContent} />
      <BackToTop />
    </>
  );
}

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6">
      <div className="w-12 h-12 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
      <span className="font-mono text-xs text-grey tracking-[0.2em] uppercase">
        Loading
      </span>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-grey-light">
      <Nav />
      <div className="pt-32 pb-20 section-px">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="font-sans font-bold text-[10rem] md:text-[14rem] text-black leading-none tracking-[-0.04em]">
            404
          </h1>
          <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-8">
            Page Not Found
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
              font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
              brutal-shadow-sm brutal-hover"
          >
            <ArrowLeft size={16} strokeWidth={3} />
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
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
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
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
            <Route path="resume" element={<ResumePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectEditPage />} />
          </Route>

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
