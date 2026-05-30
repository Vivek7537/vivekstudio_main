import React from 'react';
import { motion } from 'motion/react';
import { Palette, Video, ChevronRight } from 'lucide-react';

export const ExpertiseSplit = React.memo(({ settings }: { settings: any }) => {
  return (
    <section id="expertise-split" className="min-h-fit sm:min-h-screen flex flex-row relative overflow-hidden bg-black select-none">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-40 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Central Separator Glow */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-30">
        <motion.div
          animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full bg-gradient-to-b from-transparent via-brand-orange to-transparent"
        />
      </div>

      {/* LEFT SIDE: GRAPHIC DESIGN */}
      <div className="group/left w-1/2 h-full min-h-fit sm:min-h-screen relative flex flex-col bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.1),transparent_50%)]" />

        <div className="relative z-10 flex flex-col h-full py-8 sm:py-16 px-4 sm:px-16 md:px-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-24"
          >
            <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
              <div className="w-6 h-[1px] bg-brand-orange" />
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.6em] font-black text-brand-orange/80">Est. 2024</span>
              <Palette className="w-3 h-3 sm:w-5 sm:h-5 text-brand-orange/40 ml-auto" />
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-4xl font-black text-white tracking-tighter leading-[0.9] flex flex-col">
              <span>GRAPHIC</span>
              <span className="text-brand-orange italic font-light sm:ml-8 md:ml-4">DESIGN</span>
            </h2>
          </motion.div>

          <div className="flex-1 space-y-1 sm:space-y-2 overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
            {settings.expertise.graphicDesign.map((item: any, idx: number) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="group/item cursor-pointer py-2.5 sm:py-4 border-b border-white/5 flex items-center justify-between transition-all hover:pl-2 w-full text-left"
                aria-label={`View details for ${item.name}`}
              >
                <div className="flex items-center gap-2 sm:gap-8 flex-1">
                  <span className="text-[8px] sm:text-xs font-mono text-white/50 group-hover/item:text-brand-orange transition-colors w-6 sm:w-16">0{idx + 1}</span>
                  <h3 className="text-[10px] sm:text-xl md:text-2xl font-black text-white/70 group-hover/item:text-white transition-all tracking-tighter uppercase truncate">
                    {item.name}
                  </h3>
                </div>
                <div className="w-4 h-4 sm:w-10 sm:h-10 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover/item:opacity-100 group-hover/item:border-brand-orange transition-all scale-50 group-hover/item:scale-100">
                  <ChevronRight className="w-2 h-2 sm:w-5 sm:h-5 text-brand-orange" aria-hidden="true" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: VIDEO EDITING */}
      <div className="group/right w-1/2 h-full min-h-fit sm:min-h-screen relative flex flex-col bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="relative z-10 flex flex-col h-full py-8 sm:py-16 px-4 sm:px-16 md:px-24 items-end text-right">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-12"
          >
            <div className="flex items-center justify-end gap-2 sm:gap-4 mb-3 sm:mb-6">
              <Video className="w-3 h-3 sm:w-5 sm:h-5 text-blue-500/40 mr-auto" />
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.6em] font-black text-blue-500/80">Motion Lab</span>
              <div className="w-6 h-[1px] bg-blue-500" />
            </div>
            <h2 className="text-2xl sm:text-5xl md:text-4xl font-black text-white tracking-tighter leading-[0.9] flex flex-col">
              <span>VIDEO</span>
              <span className="text-blue-500 italic font-light sm:mr-8 md:mr-4">EDITING</span>
            </h2>
          </motion.div>

          <div className="flex-1 space-y-1 sm:space-y-2 overflow-y-auto pl-2 custom-scrollbar-right no-scrollbar w-full">
            {settings.expertise.videoEditing.map((item: any, idx: number) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="group/item cursor-pointer py-2.5 sm:py-4 border-b border-white/5 flex items-center justify-between transition-all hover:pr-2 w-full text-right"
                aria-label={`View details for ${item.name}`}
              >
                <div className="w-4 h-4 sm:w-10 sm:h-10 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover/item:opacity-100 group-hover/item:border-blue-500 transition-all scale-50 group-hover/item:scale-100">
                  <ChevronRight className="w-2 h-2 sm:w-5 sm:h-5 text-blue-500 rotate-180" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 sm:gap-8 flex-1 justify-end">
                  <h3 className="text-[10px] sm:text-xl md:text-2xl font-black text-white/70 group-hover/item:text-white transition-all tracking-tighter uppercase truncate">
                    {item.name}
                  </h3>
                  <span className="text-[8px] sm:text-xs font-mono text-white/50 group-hover/item:text-blue-500 transition-colors w-6 sm:w-16 text-right">0{idx + 1}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
      >
        <span className="text-[7px] sm:text-[9px] text-white uppercase tracking-[0.4em] font-black">Scroll For Magic</span>
        <div className="w-px h-6 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
});
