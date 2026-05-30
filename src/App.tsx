import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { useSiteSettings } from './hooks/useSiteSettings';

// Static Components
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { TopRatedWork } from './components/sections/TopRatedWork';
import { Process } from './components/sections/Process';
import { Portfolio } from './components/sections/Portfolio';
import { Footer } from './components/sections/Footer';
import { WhatsAppIcon } from './components/common/Icons';

// Lazy Loaded Heavy Sections
const HighlightReel = lazy(() => import('./components/sections/HighlightReel').then(m => ({ default: m.HighlightReel })));
const ExpertiseSplit = lazy(() => import('./components/sections/ExpertiseSplit').then(m => ({ default: m.ExpertiseSplit })));
const OrbitTools = lazy(() => import('./components/sections/OrbitTools').then(m => ({ default: m.OrbitTools })));
const Testimonials = lazy(() => import('./components/sections/Testimonials').then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

export default function App() {
  const { settings, loading } = useSiteSettings();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<{ title: string, img: string } | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-orange/20 border-t-brand-orange rounded-full animate-spin" />
      </div>
    );
  }

  // --- Category Details View ---
  if (selectedCategory) {
    return (
      <div className="bg-brand-bg min-h-screen overflow-x-hidden flex flex-col items-center">
        <div className="w-full max-w-[1440px] bg-white relative">
          <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 sm:px-12 flex items-center justify-between z-50 max-w-[1440px] mx-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-brand-heading font-black text-[10px] uppercase tracking-widest hover:text-brand-orange transition-colors"
            >
              <ArrowRight className="rotate-180 w-4 h-4" /> Back to studio
            </button>
            <div
              onClick={() => setSelectedCategory(null)}
              className="text-xl font-black text-brand-heading italic cursor-pointer hover:text-brand-orange transition-colors"
            >
              {settings.navbar.brandName.split(' ').map((s: string) => s[0]).join('')}
            </div>
          </nav>

          <main className="pt-32 pb-24 px-6 sm:px-12 w-full">
            <div className="mb-12 sm:mb-24">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold text-brand-orange block mb-4">Portfolio</span>
              <h1 className="text-4xl sm:text-7xl md:text-3xl font-black text-brand-heading tracking-tight leading-none mb-6">
                {selectedCategory.title}
              </h1>
              <div className="h-1.5 w-16 sm:w-32 btn-gradient rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-10">
              {(settings.portfolio.projects[selectedCategory.title] || []).map((project: any, idx: number) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer rounded-[24px] sm:rounded-[56px] overflow-hidden bg-slate-50 relative border border-slate-100 text-left"
                  style={{ aspectRatio: (settings.portfolio.categoryRatios && settings.portfolio.categoryRatios[selectedCategory.title]) || settings.portfolio.aspectRatio || '3/4' }}
                >
                  <img src={project.img} loading="lazy" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 p-4 sm:p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-white font-black text-base sm:text-3xl md:text-xl leading-none">{project.title}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </main>

          <Footer settings={settings} />

          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-20 bg-brand-heading/95 backdrop-blur-2xl"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-5xl w-full bg-white rounded-[32px] sm:rounded-[64px] overflow-hidden relative shadow-2xl ring-1 ring-white/10"
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 sm:top-12 sm:right-12 w-10 h-10 sm:w-16 sm:h-16 rounded-full glass flex items-center justify-center text-brand-heading hover:bg-brand-orange hover:text-white transition-all z-20"
                  >
                    <X className="w-5 h-5 sm:w-8 sm:h-8" />
                  </button>
                  <div className="w-full flex flex-col items-center justify-center bg-slate-50">
                    <div className="w-full p-4 sm:p-8 flex items-center justify-center">
                      <img
                        src={selectedProject.img}
                        className="max-w-full max-h-[75vh] w-auto h-auto object-contain shadow-2xl"
                        alt={selectedProject.title}
                      />
                    </div>
                    <div className="w-full p-8 sm:p-14 border-t border-slate-100 bg-white">
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-orange mb-3 block">{selectedCategory.title}</span>
                      <h2 className="text-3xl sm:text-6xl md:text-3xl font-black text-brand-heading tracking-tight leading-none">{selectedProject.title}</h2>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    );
  }

  // --- Main Landing View ---
  return (
    <div className="bg-brand-bg relative min-h-screen overflow-x-hidden flex flex-col items-center">
      <div className="w-full max-w-[1440px] relative bg-white md:bg-transparent">
        <Navbar settings={settings} />
        
        <div className="w-full relative">
          {(settings.sectionOrder || ['hero', 'topRated', 'process', 'portfolio', 'reels', 'expertise', 'arsenal', 'testimonials', 'contact']).map((sectionId) => {
            switch (sectionId) {
              case 'hero':
                return <Hero key="hero" settings={settings} />;
              case 'topRated':
                return <TopRatedWork key="topRated" settings={settings} />;
              case 'process':
                return <Process key="process" />;
              case 'portfolio':
                return <Portfolio key="portfolio" settings={settings} onCategorySelect={setSelectedCategory} />;
              case 'reels':
                return (
                  <Suspense key="reels" fallback={<div className="h-96 flex items-center justify-center bg-slate-50">Loading Reels...</div>}>
                    <HighlightReel settings={settings} />
                  </Suspense>
                );
              case 'expertise':
                return (
                  <Suspense key="expertise" fallback={<div className="h-screen bg-black" />}>
                    <ExpertiseSplit settings={settings} />
                  </Suspense>
                );
              case 'arsenal':
                return (
                  <Suspense key="arsenal" fallback={<div className="h-96" />}>
                    <OrbitTools settings={settings} />
                  </Suspense>
                );
              case 'testimonials':
                return (
                  <Suspense key="testimonials" fallback={null}>
                    <Testimonials settings={settings} />
                  </Suspense>
                );
              case 'contact':
                return (
                  <Suspense key="contact" fallback={null}>
                    <Contact settings={settings} />
                  </Suspense>
                );
              default:
                return null;
            }
          })}
          
          <Footer settings={settings} />

          {/* Premium Scroll Indicator */}
          <motion.div className="fixed bottom-10 left-10 w-1 h-32 bg-brand-heading/5 rounded-full overflow-hidden hidden sm:block">
            <motion.div className="w-full bg-brand-orange origin-top" style={{ scaleY }} />
          </motion.div>

          {/* WhatsApp Floating Button */}
          <motion.a
            href={`https://wa.me/${settings.contact.whatsapp?.replace(/\D/g, '') || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-12 z-[99] w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg text-white group"
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-[#25D366]/20 -z-10" />
            <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
