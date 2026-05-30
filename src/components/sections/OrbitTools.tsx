import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTime, useMotionValue, useTransform } from 'motion/react';
import { Settings } from 'lucide-react';
import { ICON_MAP } from '../common/Icons';

const OrbitToolItem = React.memo(({ tool, idx, total, smoothRotation, activeIdx, setActiveIdx }: {
  tool: any,
  idx: number,
  total: number,
  smoothRotation: any,
  activeIdx: number | null,
  setActiveIdx: (idx: number | null) => void
}) => {
  const angle = (idx * 360) / total;
  const iconRotation = useTransform(smoothRotation, (v: number) => -v - angle);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `rotate(${angle}deg)`
      }}
      className="flex items-start justify-center"
    >
      <div className="relative pt-[2%]">
        <motion.button
          onMouseEnter={() => setActiveIdx(idx)}
          onMouseLeave={() => setActiveIdx(null)}
          whileHover={{ scale: 1.15 }}
          style={{ rotate: iconRotation }}
          className="w-14 h-14 sm:w-28 sm:h-28 md:w-16 md:h-16 rounded-[20px] sm:rounded-[48px] md:rounded-[24px] bg-white border border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer group hover:border-brand-orange/50 transition-all duration-300 relative z-50 pointer-events-auto shadow-xl"
          aria-label={`View details for ${tool.name}`}
        >
          {tool.logoUrl ? (
            <img src={tool.logoUrl} alt={tool.name} className="w-6 h-6 sm:w-12 sm:h-12 md:w-7 md:h-7 object-contain" />
          ) : (
            <Settings
              className="w-6 h-6 sm:w-12 sm:h-12 md:w-7 md:h-7 transition-all duration-500"
              style={{ color: tool.color }}
              aria-hidden="true"
            />
          )}

          <AnimatePresence>
            {activeIdx === idx && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.9, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white border border-slate-200 rounded-full whitespace-nowrap shadow-2xl z-50"
                role="tooltip"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">{tool.name}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white border-r border-b border-slate-200 rotate-45" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
});

export const OrbitTools = React.memo(({ settings }: { settings: any }) => {
  const tools = settings.arsenal.tools.map((t: any) => ({
    ...t,
    icon: ICON_MAP[t.iconName?.replace(/\s/g, '')] || Settings
  }));

  const { scrollYProgress } = useScroll();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Interaction Values
  const dragX = useMotionValue(0);
  const dragRotation = useTransform(dragX, x => x * 0.4);
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const time = useTime();
  const autoRotation = useTransform(time, t => t / 150);

  // Combined Smooth Motion
  const combinedRotation = useMotionValue(0);
  useEffect(() => {
    return autoRotation.on("change", (v) => {
      combinedRotation.set(v + scrollRotation.get() + dragRotation.get());
    });
  }, [autoRotation, scrollRotation, dragRotation]);

  const smoothRotation = useSpring(combinedRotation, {
    stiffness: 30,
    damping: 20,
    mass: 0.8
  });

  return (
    <section id="expertise" className="py-16 sm:py-32 flex flex-col items-center justify-center relative overflow-hidden bg-white select-none">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_70%)]" />
        <div className="absolute inset-0 border border-slate-100 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>

      {/* Interaction Surface */}
      <motion.div
        drag="x"
        style={{ x: dragX }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing"
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          <div className="w-full md:w-[40%] text-center md:text-left space-y-4 sm:space-y-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-brand-orange/20" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-black text-brand-orange">Technical Stack</span>
                <div className="w-12 h-px bg-brand-orange/20 md:hidden" />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-3xl font-black text-brand-heading tracking-tighter leading-tight uppercase">
                {settings.arsenal.heading.split(' ')[0]} <br /> <span className="text-black/10">{settings.arsenal.heading.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="mt-6 text-brand-text text-sm sm:text-lg md:text-base font-light leading-relaxed max-w-md">
                {settings.arsenal.subtext}
              </p>
            </motion.div>
          </div>

          <div className="w-full md:w-[60%] flex items-center justify-center">
            <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-full" />
              <div className="absolute inset-[15%] border-[0.5px] border-slate-200 rounded-full" />
              <div className="absolute inset-[30%] border-[0.5px] border-slate-200 rounded-full" />
              <div className="absolute inset-[45%] border-[0.5px] border-slate-200 rounded-full" />

              <motion.div
                style={{ rotate: smoothRotation }}
                className="absolute inset-0 z-10 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2 bg-gradient-to-t from-transparent via-brand-orange/10 to-brand-orange/40" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-orange blur-xl opacity-20" />
              </motion.div>

              <motion.div
                style={{ rotate: smoothRotation }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {tools.map((tool: any, idx: number) => (
                  <OrbitToolItem
                    key={idx}
                    tool={tool}
                    idx={idx}
                    total={tools.length}
                    smoothRotation={smoothRotation}
                    activeIdx={activeIdx}
                    setActiveIdx={setActiveIdx}
                  />
                ))}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 sm:w-72 sm:h-72 md:w-44 md:h-44 rounded-full z-20 flex flex-col items-center justify-center bg-white border border-slate-200 relative group transition-transform shadow-2xl"
              >
                <div className="absolute inset-0 bg-brand-orange opacity-[0.02] rounded-full blur-[40px] group-hover:opacity-[0.05] transition-opacity" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 sm:inset-8 border-[1px] border-dashed border-slate-200 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 sm:inset-16 border-[1px] border-slate-100 rounded-full"
                />
                <div className="relative z-10 flex flex-col items-center space-y-1 sm:space-y-4">
                  <div className="flex gap-1 mb-2">
                    <div className="w-1 h-1 rounded-full bg-brand-orange animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-brand-orange animate-pulse [animation-delay:0.2s]" />
                    <div className="w-1 h-1 rounded-full bg-brand-orange animate-pulse [animation-delay:0.4s]" />
                  </div>
                  <span className="text-3xl sm:text-7xl md:text-2xl font-black text-brand-heading tracking-widest leading-none drop-shadow-sm italic">VS</span>
                  <span className="text-[6px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-[0.5em] group-hover:text-brand-orange transition-colors">Core Engine</span>
                </div>
              </motion.div>
              <div className="absolute h-full w-[1px] bg-slate-100 rotate-45" />
              <div className="absolute h-full w-[1px] bg-slate-100 -rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
