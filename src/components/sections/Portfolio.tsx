import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Portfolio = React.memo(({ settings, onCategorySelect }: { settings: any, onCategorySelect: (cat: any) => void }) => {
  const expertiseItems = settings.portfolio.expertise;

  return (
    <section id="portfolio" className="px-6 sm:px-12 py-6 sm:py-12 bg-white relative overflow-hidden">
      <div className="flex flex-col items-center mb-10 sm:mb-16 space-y-3 sm:space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-4xl font-black text-brand-heading tracking-tight mb-4">{settings.portfolio.heading}</h2>
          <p className="text-brand-text text-sm sm:text-xl opacity-60 font-medium">A collection of our latest creative projects</p>
          <div className="h-1 sm:h-1.5 w-16 sm:w-24 btn-gradient rounded-full mx-auto mt-6" />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 w-full">
        {expertiseItems.map((item: any, idx: number) => (
          <motion.button
            key={item.id || item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onCategorySelect(item)}
            className="group cursor-pointer relative rounded-[24px] sm:rounded-[48px] overflow-hidden bg-slate-100 text-left w-full"
            style={{ aspectRatio: (settings.portfolio.categoryRatios && settings.portfolio.categoryRatios[item.title]) || settings.portfolio.aspectRatio || '3/4' }}
            aria-label={`View ${item.title} portfolio with ${item.projects?.length || 0} projects`}
          >
            <img
              src={item.img}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/90 via-brand-heading/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="absolute inset-0 p-4 sm:p-10 flex flex-col justify-end">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="text-[8px] sm:text-xs uppercase tracking-[0.3em] font-bold text-brand-orange mb-1 sm:mb-3"
                >
                  {item.projects?.length || 0} Projects
                </motion.p>
                <h3 className="text-sm sm:text-3xl md:text-xl font-black text-white tracking-tight leading-none">
                  {item.title}
                </h3>
              </div>

              <div className="mt-4 sm:mt-8 pt-4 sm:pt-8 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-white/60 text-[8px] sm:text-sm font-medium uppercase tracking-widest">View Gallery</span>
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
});
