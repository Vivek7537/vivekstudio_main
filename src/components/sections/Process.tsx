import React from 'react';
import { motion } from 'motion/react';
import { Zap, Layers, CheckCircle, ArrowRight } from 'lucide-react';

export const Process = () => {
  const steps = [
    {
      title: 'Plan',
      description: 'Strategy and analysis',
      icon: <Zap className="w-6 h-6 sm:w-10 sm:h-10" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Design',
      description: 'Visual creation and editing',
      icon: <Layers className="w-6 h-6 sm:w-10 sm:h-10" />,
      color: 'bg-brand-orange'
    },
    {
      title: 'Deliver',
      description: 'Project completion and launch',
      icon: <CheckCircle className="w-6 h-6 sm:w-10 sm:h-10" />,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <section className="px-6 sm:px-12 py-8 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-y-1/2 hidden md:block" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-5xl font-black text-brand-heading tracking-tight mb-6">How We Work</h2>
            <div className="flex flex-col items-center gap-2">
              <p className="text-brand-text text-base sm:text-2xl opacity-70 font-medium">Simple, fast, and creative process</p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                className="h-1.5 bg-brand-orange rounded-full mt-4"
              />
            </div>
            <p className="text-brand-text text-xs sm:text-sm opacity-40 mt-8 uppercase tracking-[0.3em] font-bold">Available 24/7 – Fast and reliable service</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-8 lg:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-2 sm:-top-8 sm:-left-4 w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-brand-heading text-white flex items-center justify-center text-[10px] sm:text-lg font-black z-20 group-hover:bg-brand-orange transition-colors">
                0{idx + 1}
              </div>

              <div className="p-4 sm:p-14 rounded-[28px] sm:rounded-[56px] bg-white border border-slate-100 flex flex-col items-center text-center group hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 h-full">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`w-12 h-12 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[32px] ${step.color} text-white flex items-center justify-center shadow-lg mb-4 sm:mb-10 group-hover:scale-110 transition-transform duration-500`}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-base sm:text-4xl font-black mb-2 sm:mb-6 text-brand-heading group-hover:text-brand-orange transition-colors">{step.title}</h3>
                <p className="text-[10px] sm:text-lg opacity-50 group-hover:opacity-80 font-medium leading-relaxed max-w-[200px] mx-auto">{step.description}</p>

                {/* Decorative bar */}
                <div className="w-8 h-1 bg-slate-100 group-hover:bg-brand-orange group-hover:w-16 transition-all mt-6 sm:mt-12 rounded-full" />
              </div>

              {/* Connection Arrow (Except Last) */}
              {idx < steps.length - 1 && (
                <div className="absolute top-1/2 -right-2 sm:-right-10 translate-y-[-50%] z-20 opacity-20 hidden md:block">
                  <ArrowRight className="w-8 h-8 text-slate-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
