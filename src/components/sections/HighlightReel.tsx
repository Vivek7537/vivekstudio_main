import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X as XIcon } from 'lucide-react';

export const HighlightReel = React.memo(({ settings }: { settings: any }) => {
  const reelItems = settings.reels.items;
  const [activeReel, setActiveReel] = useState<string | null>(null);

  // Use 2x for seamless loop
  const marqueeItems = [...reelItems, ...reelItems];

  const getInstagramEmbedUrl = (link: string) => {
    if (!link) return '';
    let cleanLink = link.split('?')[0].replace(/\/$/, '');
    cleanLink = cleanLink.replace('/reels/', '/reel/');
    if (cleanLink.endsWith('/embed')) {
      return cleanLink + '/';
    }
    return cleanLink + '/embed/';
  };

  return (
    <section id="work" className="px-6 sm:px-12 py-8 sm:py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-brand-orange opacity-[0.04] blur-[150px] rounded-full -mr-64 -mt-64" />

      <div className="text-center mb-8 sm:mb-16 space-y-3 sm:space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.6em] font-bold text-brand-orange block mb-4">Featured Work</span>
          <h2 className="text-2xl sm:text-5xl lg:text-3xl font-black text-brand-heading tracking-tight mb-8">{settings.reels.heading}</h2>
          <div className="h-1.5 w-24 btn-gradient rounded-full mx-auto" />
        </motion.div>
      </div>

      <div className="relative overflow-hidden w-full py-4 z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-3 sm:gap-4 w-fit"
          style={{ cursor: 'pointer' }}
        >
          {marqueeItems.map((item: any, i: number) => {
            const isInstagram = item.link && (item.link.toLowerCase().includes('instagram.com') || item.link.toLowerCase().includes('instagr.am'));
            return (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => {
                  if (isInstagram) {
                    setActiveReel(item.link);
                  }
                }}
                className="w-[200px] sm:w-[280px] flex-shrink-0 aspect-[9/16] rounded-2xl sm:rounded-3xl bg-white border border-slate-200/50 shadow-lg hover:shadow-xl overflow-hidden relative group cursor-pointer"
              >
                {/* 
                  Performance Optimization: 
                  Use an image placeholder in the marquee instead of loading dozens of iframes.
                */}
                <div className="absolute inset-0 z-10 bg-black/5 group-hover:bg-transparent transition-colors" />
                {item.img ? (
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                    decoding="async" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold uppercase tracking-widest text-[10px] text-center p-4">
                    {item.title || 'Preview'}
                  </div>
                )}
                
                {isInstagram && (
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                         <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                   </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeReel && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveReel(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-[450px] aspect-[9/16] bg-black rounded-[40px] sm:rounded-[48px] overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-brand-orange text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-20"
              >
                <XIcon className="w-5 h-5" />
              </button>

              <iframe
                src={getInstagramEmbedUrl(activeReel)}
                className="w-full h-full border-none bg-black"
                allowTransparency={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                scrolling="no"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});
