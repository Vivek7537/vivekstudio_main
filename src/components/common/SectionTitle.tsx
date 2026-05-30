import React from 'react';
import { motion } from 'motion/react';

export const SectionTitle = React.memo(({ children, gradient = false }: { children: React.ReactNode, gradient?: boolean }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`text-2xl sm:text-3xl md:text-3xl font-bold text-brand-heading tracking-tight mb-8 sm:mb-12 ${gradient ? 'text-gradient' : ''}`}
  >
    {children}
  </motion.h2>
));
