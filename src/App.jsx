import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import LinksPage from './pages/LinksPage';
import UsesPage from './pages/UsesPage';
import BlogsPage from './pages/BlogsPage';
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

  useEffect(() => {
    // Block right-click
    const handleContextMenu = (e) => e.preventDefault();

    // Block keyboard shortcuts
    const handleKeyDown = (e) => {
      const { key, ctrlKey, shiftKey, metaKey } = e;
      if (
        key === 'PrintScreen' ||
        key === 'F12' ||
        (ctrlKey && key === 'p') ||
        (ctrlKey && key === 's') ||
        (ctrlKey && shiftKey && (key === 'S' || key === 'I' || key === 'J' || key === 'C')) ||
        (metaKey && shiftKey && (key === '3' || key === '4' || key === '5'))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown, true);

    // Override and silence all console methods
    const noop = () => {};
    const methods = ['log', 'warn', 'error', 'info', 'debug', 'table', 'dir', 'dirxml', 'group', 'groupEnd', 'trace', 'assert', 'count', 'clear'];
    methods.forEach((m) => { console[m] = noop; });

    // Continuous debugger trap — freezes DevTools when open
    const debuggerInterval = setInterval(() => {
      // eslint-disable-next-line no-new-func
      (new Function('debugger'))();
    }, 100);

    // DevTools size detection — blank the page if opened
    let devToolsOpen = false;
    const sizeInterval = setInterval(() => {
      const widthDiff = window.outerWidth - window.innerWidth > 160;
      const heightDiff = window.outerHeight - window.innerHeight > 160;
      if ((widthDiff || heightDiff) && !devToolsOpen) {
        devToolsOpen = true;
        document.documentElement.style.display = 'none';
      } else if (!widthDiff && !heightDiff && devToolsOpen) {
        devToolsOpen = false;
        document.documentElement.style.display = '';
      }
    }, 500);

    // Console object getter trick — detects when DevTools reads an object
    const detector = Object.defineProperty({}, '_', {
      get() {
        document.documentElement.style.display = 'none';
        return undefined;
      },
    });
    // eslint-disable-next-line no-console
    console.log('%c', detector);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown, true);
      clearInterval(debuggerInterval);
      clearInterval(sizeInterval);
    };
  }, []);

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
