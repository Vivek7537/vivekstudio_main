import React from 'react';
import { motion } from 'motion/react';
import { Zap, MapPin, Instagram, Twitter, Linkedin, Youtube as YoutubeLucide } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = React.memo(({ settings }: { settings: any }) => (
  <footer className="px-6 sm:px-12 py-8 sm:py-12 bg-brand-heading relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange opacity-10 blur-[120px] rounded-full -mr-48 -mb-48" />

    {/* Large Animated Background Text */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <motion.h2
        animate={{
          x: ['25%', '-25%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="text-[150px] sm:text-[350px] md:text-[210px] font-black text-white/[0.03] whitespace-nowrap tracking-tighter"
      >
        {settings.navbar.brandName} {settings.navbar.brandName} {settings.navbar.brandName}
      </motion.h2>
    </div>

    <div className="flex flex-col gap-8 sm:gap-12 relative z-10">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-10 sm:gap-20">
        <div className="space-y-6 sm:space-y-10 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-10 md:h-10 rounded-2xl bg-brand-orange flex items-center justify-center shadow-[0_10px_20px_rgba(249,115,22,0.3)]">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-2xl sm:text-4xl md:text-lg font-black text-white tracking-tighter">
              {settings.navbar.brandName.split(' ')[0]} <span className="text-brand-orange">{settings.navbar.brandName.split(' ').slice(1).join(' ')}</span>
            </div>
          </div>
          <p className="text-white/60 max-w-sm text-sm sm:text-lg md:text-sm font-light leading-relaxed">
            {settings.footer.text}
          </p>
          {settings.footer.address && (
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
              <MapPin className="w-4 h-4 text-brand-orange" />
              {settings.footer.address}
            </p>
          )}
          <div className="flex gap-4">
            <motion.a
              href={settings.footer.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: '#E4405F' }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-white/30 transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
            <motion.a
              href={settings.footer.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: '#1DA1F2' }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-white/30 transition-all cursor-pointer"
            >
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
            <motion.a
              href={settings.footer.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: '#0A66C2' }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-white/30 transition-all cursor-pointer"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
            {settings.footer.socials.youtube && (
              <motion.a
                href={settings.footer.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#FF0000' }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-white/30 transition-all cursor-pointer"
              >
                <YoutubeLucide className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 sm:gap-40">
          <div className="space-y-6 sm:space-y-10">
            <h5 className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs">Navigation</h5>
            <ul className="space-y-3 sm:space-y-5 text-white/50 text-sm sm:text-lg md:text-sm font-light">
              {settings.navbar.links.map((link: any) => (
                <li key={link.name} className="hover:text-white transition-colors cursor-pointer capitalize">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 sm:space-y-10">
            <h5 className="text-brand-orange font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs">Services</h5>
            <ul className="space-y-3 sm:space-y-5 text-white/50 text-sm sm:text-lg md:text-sm font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Graphic Design</li>
              <li className="hover:text-white transition-colors cursor-pointer">Video Editing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Motion Graphics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-10 sm:pt-14 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8 text-white/30 text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase">
        <p>{settings.footer.copyright || `© 2024 ${settings.navbar.brandName}. All rights reserved`}</p>
        <div className="flex gap-10 sm:gap-14">
          <Link to="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
));
