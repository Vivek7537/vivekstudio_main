import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const TopRatedWork = React.memo(({ settings }: { settings: any }) => {
  const projects = settings.topRated.projects;
  // Use 2x for seamless loop
  const marqueeItems = [...projects, ...projects];

  return (
    <section className="py-12 overflow-hidden bg-[#fafafa] relative border-y border-slate-200/50">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#fafafa] to-transparent z-10 hidden sm:block" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#fafafa] to-transparent z-10 hidden sm:block" />

      <div className="max-w-[1920px] mx-auto px-6 mb-4 sm:mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.6em] font-bold text-brand-orange block mb-4">Our Premium Work</span>
          <h2 className={`font-black text-brand-heading tracking-tight mb-4 uppercase ${settings.topRated.headingFontSize || 'text-2xl sm:text-5xl'}`}>{settings.topRated.heading}</h2>
          <div className="h-1.5 w-24 btn-gradient rounded-full mx-auto" />
        </motion.div>
      </div>

      <div className="relative flex">
        <motion.div
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-3 sm:gap-6 px-2 sm:px-0"
        >
          {marqueeItems.map((item: any, idx: number) => (
            <motion.div
              key={`${item.id}-${idx}`}
              role="article"
              aria-labelledby={`project-title-${item.id}-${idx}`}
              whileHover={{
                scale: 1.02,
                y: -15,
                transition: { duration: 0.4 }
              }}
              className="relative group flex-shrink-0 w-[160px] sm:w-[420px] overflow-hidden rounded-[24px] sm:rounded-[48px] shadow-[0_32px_64px_rgba(0,0,0,0.12)] border border-white bg-white"
              style={{ aspectRatio: settings.topRated.aspectRatio || '3/4' }}
            >
              <img
                src={item.img}
                alt={`Case study: ${item.title}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/95 via-brand-heading/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 sm:p-12">
                <motion.p
                  className="text-brand-orange text-[8px] sm:text-sm font-bold uppercase tracking-[0.4em] mb-2 sm:mb-4 underline decoration-brand-orange/50 underline-offset-4"
                >
                  {item.category}
                </motion.p>
                <motion.h3
                  id={`project-title-${item.id}-${idx}`}
                  className="text-white text-[10px] sm:text-3xl font-black tracking-tight"
                >
                  {item.title}
                </motion.h3>
              </div>
              <div className="absolute top-4 right-4 sm:top-10 sm:right-10 w-6 h-6 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                <ArrowRight className="w-3 h-3 sm:w-8 sm:h-8 text-white -rotate-45" aria-hidden="true" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
