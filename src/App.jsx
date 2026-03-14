import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import LinksPage from './pages/LinksPage';
import UsesPage from './pages/UsesPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import LabsPage from './pages/LabsPage';
import GuestbookPage from './pages/GuestbookPage';
import BookCallPage from './pages/BookCallPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import { Analytics } from '@vercel/analytics/react';

function ScrollHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // After OAuth login, redirect back to the page the user logged in from
  useEffect(() => {
    const returnPath = localStorage.getItem('auth_return_path');

    // Check immediately on mount (handles race where SIGNED_IN fired before listener registered)
    if (returnPath) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          localStorage.removeItem('auth_return_path');
          if (returnPath !== window.location.pathname + window.location.search) {
            navigate(returnPath, { replace: true });
          }
        }
      });
    }

    // Also catch future SIGNED_IN events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        const path = localStorage.getItem('auth_return_path');
        if (path) {
          localStorage.removeItem('auth_return_path');
          if (path !== window.location.pathname + window.location.search) {
            navigate(path, { replace: true });
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-background min-h-screen text-gray-200 font-sans selection:bg-primary/30 overflow-x-hidden">
      <ScrollHandler />
      <Navbar />
      <CommandPalette />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/uses" element={<UsesPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
          <Route path="/book" element={<BookCallPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
