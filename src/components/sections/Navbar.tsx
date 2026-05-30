import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Zap, X, ArrowRight, Instagram, Twitter, Linkedin } from 'lucide-react';

export const Navbar = React.memo(({ settings }: { settings: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = settings.navbar.links;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`w-full mx-auto pointer-events-auto transition-all duration-500 ${isScrolled
              ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
              : 'py-4 bg-transparent border-b border-transparent'
            }`}
        >
          <div className="max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 sm:gap-4 group cursor-pointer"
              aria-label="Scroll to top"
            >
              <motion.div
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-brand-heading flex items-center justify-center shadow-lg group-hover:bg-brand-orange transition-colors duration-300"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
              </motion.div>
              <div className="flex flex-col text-left">
                <span className={`font-bold tracking-tight leading-none uppercase ${settings.navbar.fontSize || 'text-xl sm:text-2xl'}`}>
                  {settings.navbar.brandName}
                </span>
                <span className="text-[8px] sm:text-[10px] font-bold text-brand-orange uppercase tracking-[0.3em] mt-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  Modern Designs
                </span>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-12">
              <div className="flex items-center gap-10 md:gap-14">
                {navLinks.map((link: any) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="group relative py-2"
                  >
                    <span className={`text-[11px] md:text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${hoveredLink && hoveredLink !== link.name ? 'opacity-40' : 'opacity-100'
                      } ${isScrolled ? 'text-brand-heading' : 'text-brand-heading/90'}`}>
                      {link.name}
                    </span>
                    <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-orange transition-all duration-300 group-hover:w-full`} />
                  </a>
                ))}
              </div>

              <div className="h-5 w-px bg-slate-200/80" />

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-3.5 bg-brand-heading text-white rounded-full text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-brand-orange transition-all duration-300 shadow-lg shadow-brand-heading/10 hover:shadow-brand-orange/20"
              >
                Let's Talk
              </motion.a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex flex-col justify-center items-end gap-1.5 cursor-pointer group md:hidden transition-all"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-7 bg-brand-heading rounded-full"
                aria-hidden="true"
              />
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-5 group-hover:w-7 bg-brand-orange transition-all"
                aria-hidden="true"
              />
            </button>
          </div>

          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange/40"
          />
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[55] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[500px] bg-brand-heading z-[60] md:hidden shadow-[-40px_0_80px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden text-white border-l border-white/5"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Header */}
              <div className="p-8 sm:p-12 pb-6 flex justify-between items-center border-b border-white/5">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight italic">VIVEK STUDIO</span>
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[.4em] mt-1.5 opacity-0">Mobile Portal</span>
                </div>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center cursor-pointer hover:bg-brand-orange hover:text-white transition-all border border-white/10"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </motion.button>
              </div>
              {/* Content */}
              <div className="flex-1 px-8 sm:px-16 py-12 sm:py-20 flex flex-col justify-between overflow-y-auto no-scrollbar">
                <div className="space-y-16">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[.6em]">Navigation</p>
                  <nav className="flex flex-col gap-10">
                    {navLinks.map((link: any, idx: number) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-5xl sm:text-7xl font-black text-white hover:text-brand-orange transition-all flex items-center gap-6 group italic"
                      >
                        <span className="relative z-10">{link.name}</span>
                        <ArrowRight className="w-10 h-10 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-orange" />
                      </motion.a>
                    ))}
                  </nav>
                </div>

                <div className="space-y-16 pt-16">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-[.4em]">Connect</p>
                      <a href={`mailto:${settings.contact.email}`} className="block text-white font-bold opacity-60 hover:opacity-100 hover:text-brand-orange transition-all break-all">{settings.contact.email}</a>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[.4em]">Follow</p>
                      <div className="flex gap-6">
                        <Instagram className="w-5 h-5 text-white/50 hover:text-brand-orange transition-colors cursor-pointer" aria-label="Follow us on Instagram" />
                        <Twitter className="w-5 h-5 text-white/50 hover:text-brand-orange transition-colors cursor-pointer" aria-label="Follow us on Twitter" />
                        <Linkedin className="w-5 h-5 text-white/50 hover:text-brand-orange transition-colors cursor-pointer" aria-label="Follow us on LinkedIn" />
                      </div>
                    </div>
                  </div>

                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-6 bg-brand-orange text-white rounded-3xl text-sm font-black uppercase tracking-[.2em] flex items-center justify-center gap-4 hover:bg-white hover:text-brand-heading transition-all shadow-2xl shadow-brand-orange/20"
                  >
                    Start Project <Zap className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Decorative side text */}
              <div className="absolute top-1/2 -right-16 -translate-y-1/2 rotate-90 select-none pointer-events-none opacity-[0.03]">
                <span className="text-[120px] font-black tracking-tighter whitespace-nowrap">STUDIO PORTAL</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});
