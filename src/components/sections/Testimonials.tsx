import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export const Testimonials = React.memo(({ settings }: { settings: any }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const testimonials = settings.testimonials.items;

  // Use 2x items for seamless loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="py-12 sm:py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05),transparent_70%)]" />

      <div className="px-6 sm:px-12 text-center mb-10 sm:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.6em] font-bold text-brand-orange block mb-4">Customer Love</span>
          <h2 className="text-2xl sm:text-5xl lg:text-3xl font-black text-brand-heading tracking-tight mb-8">{settings.testimonials.heading}</h2>
          <div className="h-1.5 w-24 btn-gradient rounded-full mx-auto" />
        </motion.div>
      </div>

      <div className="relative">
        <div className="flex w-full overflow-hidden relative">
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-5 whitespace-nowrap py-6"
          >
            {marqueeItems.map((t: any, idx: number) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="w-[280px] sm:w-[400px] whitespace-normal bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] shadow-lg border border-slate-100 flex flex-col justify-between group transition-shadow hover:shadow-2xl h-full"
              >
                <div className="relative z-10 mb-6 sm:mb-10">
                  <div className="flex gap-1 text-brand-orange mb-4 text-xs">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-brand-orange" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-lg lg:text-sm font-medium text-brand-heading leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 pt-6 border-t border-slate-50">
                  <img
                    src={t.avatar}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all font-bold"
                    alt={t.name}
                  />
                  <div>
                    <h4 className="text-xs sm:text-base lg:text-sm font-black text-brand-heading leading-none mb-1">{t.name}</h4>
                    <p className="text-[8px] sm:text-[10px] text-brand-text font-bold uppercase tracking-widest opacity-40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-y-0 left-0 w-20 sm:w-64 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-64 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
});
