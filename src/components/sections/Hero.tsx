import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';

export const Hero = React.memo(({ settings }: { settings: any }) => {
  return (
    <section id="hero" className="min-h-[50vh] sm:min-h-[90vh] pt-8 pb-2 sm:pt-24 sm:pb-12 px-6 sm:px-12 lg:px-24 flex flex-row items-center justify-between relative overflow-hidden bg-brand-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2560')] bg-cover bg-center mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg via-transparent to-brand-bg/60" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-brand-orange/20 rounded-full ${i > 3 ? 'hidden sm:block' : ''}`}
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0
              }}
              animate={{
                x: [null, Math.random() * 100 + "%"],
                y: [null, Math.random() * 100 + "%"],
                scale: [0, 2, 0],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Background Glows */}
      <div className="accent-glow top-[-100px] right-[-100px]" />
      <div className="accent-glow bottom-[-200px] left-[-100px]" />

      <div className="w-[45%] sm:w-[50%] md:w-auto md:max-w-2xl z-10 pr-2">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="space-y-2 sm:space-y-4"
        >
          {/* Creative floating badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
            }}
            className="hidden lg:flex items-center gap-3 mb-6 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full w-fit backdrop-blur-md shadow-2xl"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">VIVEK STUDIO • OPEN FOR PROJECTS</span>
          </motion.div>

          <div className="space-y-2 sm:space-y-4">
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={`leading-[1.1] sm:leading-[0.9] font-bold text-brand-heading tracking-tight ${settings.hero.headingFontSize || 'text-7xl md:text-9xl'}`}
            >
              {settings.hero.heading.split(/(\*[^*]+\*)/g).map((part: string, i: number) => {
                if (part.startsWith('*') && part.endsWith('*')) {
                  const cleanPart = part.slice(1, -1);
                  return (
                    <motion.span
                      key={i}
                      initial={{ backgroundPosition: "0% 50%" }}
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="text-brand-orange inline-block lg:block text-gradient italic lg:bg-[length:200%_auto] lg:pb-4"
                    >
                      {cleanPart}
                    </motion.span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={`text-brand-text max-w-sm sm:max-w-xl md:max-w-xl leading-relaxed ${settings.hero.subtextFontSize || 'text-lg md:text-xl'}`}
            >
              {settings.hero.subtext}
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "backOut" } }
            }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8"
          >
            <motion.a
              href={settings.hero.button1Link || '#contact'}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249,115,22,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-4 sm:px-12 py-2.5 sm:py-6 lg:py-4 lg:px-8 rounded-[12px] sm:rounded-[24px] btn-gradient font-bold text-[10px] sm:text-lg lg:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-brand-orange/20 transition-all"
            >
              {settings.hero.button1Text} <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5" />
            </motion.a>
            {settings.hero.showButton2 && (
              <div className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange/0 via-brand-orange/20 to-brand-orange/0 rounded-[12px] sm:rounded-[24px] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <motion.a
                  href={settings.hero.button2Link || '#portfolio'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full sm:w-auto px-4 sm:px-12 py-2.5 sm:py-6 lg:py-4 lg:px-8 rounded-[12px] sm:rounded-[24px] border border-slate-200 sm:border-2 font-bold text-[10px] sm:text-lg lg:text-sm text-brand-heading transition-all flex items-center justify-center bg-white/40 backdrop-blur-sm shadow-xl"
                >
                  {settings.hero.button2Text}
                </motion.a>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="w-[45%] sm:w-[50%] md:w-1/2 flex justify-end relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -20, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="floating-card glass p-4 sm:p-10 md:p-6 rounded-[24px] sm:rounded-[40px] md:rounded-[32px] w-full max-w-[180px] sm:w-[300px] md:max-w-[400px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] relative z-10 border border-white/50 backdrop-blur-2xl"
        >
          <div className="flex justify-between items-center mb-3 sm:mb-6">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div>
              <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
              <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
            </div>
            <div className="text-[6px] sm:text-[10px] font-mono text-brand-orange uppercase font-black tracking-widest">SYSTEM_ACTIVE</div>
          </div>
          <div className="space-y-2 sm:space-y-4">
            <div className="h-24 sm:h-64 rounded-xl sm:rounded-3xl bg-slate-100 overflow-hidden relative group">
              <img
                src={settings.hero.imageUrl}
                alt="Creative Showcase"
                loading="lazy"
                className="w-full h-full object-cover shadow-inner transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-orange/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="h-10 sm:h-20 rounded-lg sm:rounded-2xl bg-white/60 border border-white/80 flex items-center justify-center p-2">
                <div className="w-full h-1 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-brand-orange/30"
                  />
                </div>
              </div>
              <div className="h-10 sm:h-20 rounded-lg sm:rounded-2xl bg-white/60 border border-white/80 flex items-center justify-center">
                <div className="w-4 sm:w-8 h-4 sm:h-8 rounded-full border-2 border-brand-orange/20 border-t-brand-orange animate-spin" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Tool Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 12,
            y: [0, -15, 0]
          }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-[-30px] right-[-10px] w-10 h-10 sm:w-24 sm:h-24 bg-[#001E36] border-2 border-[#31A8FF] rounded-xl sm:rounded-3xl flex items-center justify-center text-base sm:text-3xl shadow-[0_0_30px_rgba(49,168,255,0.3)] z-20 font-bold text-[#31A8FF]"
        >
          Ps
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: -12,
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 0.8,
            delay: 0.9,
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-[20px] left-[-10px] sm:top-[40px] sm:left-[-40px] w-10 h-10 sm:w-24 sm:h-24 bg-[#2D002D] border-2 border-[#9999FF] rounded-xl sm:rounded-3xl flex items-center justify-center text-base sm:text-3xl text-[#9999FF] shadow-[0_0_30px_rgba(153,153,255,0.3)] z-20 font-bold"
        >
          Pr
        </motion.div>

        {/* Floating status badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: [0, -10, 0]
          }}
          transition={{
            delay: 1.1,
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-[160px] left-[-20px] sm:top-[220px] sm:left-[-60px] glass px-3 py-1.5 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 sm:gap-3 shadow-xl z-20 border border-white/50"
        >
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-ping" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 absolute" />
          <span className="text-[8px] sm:text-sm font-black uppercase tracking-widest text-brand-heading">Available Now</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, 10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            delay: 1.3,
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-[-10px] right-[-10px] sm:bottom-[40px] sm:right-[-20px] glass px-3 py-2 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl flex flex-col items-start shadow-2xl z-20 border border-brand-orange/20"
        >
          <span className="text-[10px] sm:text-lg font-black text-brand-orange leading-none">24x7</span>
          <span className="text-[6px] sm:text-[10px] font-bold text-brand-heading/60 uppercase tracking-tighter">Premium Service</span>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -z-10 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-orange-500/5 blur-[80px] sm:blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
});
