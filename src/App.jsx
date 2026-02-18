import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { getHeroContent } from './lib/queries';

// Lazy-load Studio to keep the main bundle small
const StudioPage = lazy(() => import('./components/StudioPage'));

function HomePage() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    if (projectId) {
      getHeroContent()
        .then(setHeroData)
        .catch((err) => console.warn('Sanity fetch skipped:', err.message));
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
      </main>
    </>
  );
}

function StudioLoader() {
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
      Loading Studio…
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/studio"
          element={
            <Suspense fallback={<StudioLoader />}>
              <StudioPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
