import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Twitter, Linkedin, Youtube as YoutubeLucide } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const Contact = React.memo(({ settings }: { settings: any }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'messages');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 sm:px-12 py-10 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
        <div className="w-full md:w-[45%] max-w-xl space-y-6 sm:space-y-10 text-left relative z-10">
        <div className="space-y-3 sm:space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] font-bold text-brand-orange block mb-4">Contact Me</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-bold text-brand-heading tracking-tight mb-8 sm:mb-12 ${settings.contact.headingFontSize || 'text-5xl md:text-8xl'}`}
            >
              {settings.contact.heading}
            </motion.h2>
            <div className="h-1 sm:h-1.5 w-12 sm:w-24 btn-gradient rounded-full mt-6" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-brand-text font-light leading-relaxed max-w-md ${settings.contact.subtextFontSize || 'text-sm'}`}
          >
            {settings.contact.subtext}
          </motion.p>
        </div>

        <div className="space-y-5 sm:space-y-8">
          <div className="group cursor-pointer w-fit">
            <p className="text-[8px] sm:text-xs uppercase tracking-[0.4em] font-bold text-brand-orange mb-2 sm:mb-4 opacity-60 group-hover:opacity-100 transition-opacity">Get in Touch</p>
            <p className="text-xl sm:text-5xl md:text-2xl font-black text-brand-heading decoration-brand-orange/30 underline decoration-2 underline-offset-8 group-hover:text-brand-orange group-hover:decoration-brand-orange transition-all duration-500">
              {settings.contact.email}
            </p>
          </div>

          {settings.contact.whatsapp && (
            <div className="group cursor-pointer w-fit">
              <p className="text-[8px] sm:text-xs uppercase tracking-[0.4em] font-bold text-green-500 mb-2 sm:mb-4 opacity-60">WhatsApp Support</p>
              <a
                href={`https://wa.me/${settings.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-xl sm:text-4xl lg:text-2xl font-black text-brand-heading hover:text-green-500 transition-all"
              >
                {settings.contact.whatsapp}
              </a>
            </div>
          )}

          <div className="flex justify-start gap-4 sm:gap-8">
            {[
              { icon: Instagram, href: settings.footer.socials.instagram, label: 'Instagram' },
              { icon: Twitter, href: settings.footer.socials.twitter, label: 'Twitter' },
              { icon: Linkedin, href: settings.footer.socials.linkedin, label: 'LinkedIn' },
              { icon: YoutubeLucide, href: settings.footer.socials.youtube, label: 'YouTube' }
            ].filter(s => s.href).map((social, idx) => {
              const SocialIcon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{
                    y: -8,
                    backgroundColor: 'var(--brand-orange)',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)'
                  }}
                  className="w-10 h-10 sm:w-16 sm:h-16 rounded-[14px] sm:rounded-[28px] glass flex items-center justify-center text-brand-heading transition-all cursor-pointer border border-white/80 group"
                >
                  <SocialIcon className="w-5 h-5 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[55%] max-w-[640px] relative">
        <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] rounded-full -z-10" />

        <motion.div
          layout
          className="glass p-6 sm:p-16 md:p-6 rounded-[32px] sm:rounded-[64px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-white/90 relative overflow-hidden"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 sm:py-20 md:py-12 text-center space-y-6"
            >
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Send className="w-8 h-8 sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-2xl font-black text-brand-heading">Message Received.</h3>
              <p className="text-brand-text sm:text-xl md:text-base font-light">I'll reach out within 24 hours.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-brand-orange font-bold uppercase tracking-widest text-xs pt-8 block mx-auto underline underline-offset-4"
              >
                Send Another?
              </button>
            </motion.div>
          ) : (
            <form className="space-y-8 sm:space-y-12 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-2 sm:space-y-4 group">
                  <label className="text-[8px] sm:text-xs font-bold text-brand-heading uppercase tracking-[0.4em] opacity-40 group-focus-within:opacity-100 group-focus-within:text-brand-orange transition-all">Your Name</label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-slate-200 focus:border-brand-orange focus:outline-none transition-all text-base sm:text-2xl md:text-lg font-light py-2"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2 sm:space-y-4 group">
                  <label className="text-[8px] sm:text-xs font-bold text-brand-heading uppercase tracking-[0.4em] opacity-40 group-focus-within:opacity-100 group-focus-within:text-brand-orange transition-all">Your Email</label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-slate-200 focus:border-brand-orange focus:outline-none transition-all text-base sm:text-2xl md:text-lg font-light py-2"
                    placeholder="name@agency.co"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-4 group">
                <label className="text-[8px] sm:text-xs font-bold text-brand-heading uppercase tracking-[0.4em] opacity-40 group-focus-within:opacity-100 group-focus-within:text-brand-orange transition-all">Your Message</label>
                <textarea
                  required
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-slate-200 focus:border-brand-orange focus:outline-none transition-all text-base sm:text-2xl md:text-lg font-light py-2 resize-none h-24 sm:h-32 md:h-20"
                  placeholder="Your Message"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 sm:py-8 md:py-6 rounded-[16px] sm:rounded-[32px] btn-gradient font-bold text-sm sm:text-xl md:text-lg flex items-center justify-center gap-3 sm:gap-4 shadow-[0_20px_40px_rgba(249,115,22,0.25)] hover:shadow-[0_25px_50px_rgba(249,115,22,0.35)] transition-shadow disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4 sm:w-6 sm:h-6" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
});
