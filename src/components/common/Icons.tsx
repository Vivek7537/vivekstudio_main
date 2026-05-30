import React from 'react';
import { 
  Zap, Settings, Instagram, Twitter, Linkedin, Facebook as FacebookLucide, 
  Youtube as YoutubeLucide, Palette, Video, ChevronRight, Send, Star, 
  Menu, X, ArrowRight, Figma as FigmaLucide, Layers, Monitor, 
  Hash, Image as ImageIcon, Smartphone, Heart, Globe, Play, Chrome, 
  CheckCircle, MapPin
} from 'lucide-react';

export const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const LocalInstagramIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const LocalFacebookIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const LocalMetaIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M14.68 7.1c-1.5 0-2.3 1-2.6 1.8h-.1c-.3-.8-1.1-1.8-2.6-1.8-2.4 0-4.4 2.2-4.4 4.9 0 2.7 2 4.9 4.4 4.9 1.5 0 2.3-1 2.6-1.8h.1c.3.8 1.1 1.8 2.6 1.8 2.4 0 4.4-2.2 4.4-4.9.1-2.7-1.9-4.9-4.4-4.9zm-4.6 7.6c-1.3 0-2.4-1.2-2.4-2.7s1.1-2.7 2.4-2.7 2.4 1.2 2.4 2.7-1.1 2.7-2.4 2.7zm4.6 0c-1.3 0-2.4-1.2-2.4-2.7s1.1-2.7 2.4-2.7 2.4 1.2 2.4 2.7-1.1 2.7-2.4 2.7z" />
  </svg>
);

export const LocalYoutubeIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const LocalPhotoshopIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <rect width="24" height="24" rx="4" fill="#001E36" />
    <path d="M7 16V8h3c1.5 0 2.5.8 2.5 2s-1 2-2.5 2H8.5V16H7zm1.5-5.5h1.5c.7 0 1-.3 1-.7 0-.5-.3-.7-1-.7H8.5v1.4zm5 5.5c-.8 0-1.5-.4-1.8-.9h-.1v.8H11.5v-4.1c0-1.2.8-1.9 2-1.9s2.1.6 2.1 1.7h-1.1c-.1-.4-.4-.7-.9-.7-.6 0-.8.3-.8.8v.6h1.2c1.3 0 2.1.6 2.1 1.7 0 1.1-.7 1.8-1.5 1.8h-.1zm.4-1.1c.3 0 .6-.2.6-.7 0-.5-.3-.7-.9-.7h-1v.5c0 .6.4.9 1.3.9z" fill="#31A8FF" />
  </svg>
);

export const LocalPremiereIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <rect width="24" height="24" rx="4" fill="#20002A" />
    <path d="M7 16V8h3c1.5 0 2.5.8 2.5 2s-1 2-2.5 2H8.5V16H7zm1.5-5.5h1.5c.7 0 1-.3 1-.7 0-.5-.3-.7-1-.7H8.5v1.4zm5.5 5.5V11.2h1.2v.7c.3-.5.7-.8 1.4-.8v1.3c-.7 0-1.2.3-1.4.9v2.7h-1.2z" fill="#9999FF" />
  </svg>
);

export const LocalAfterEffectsIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <rect width="24" height="24" rx="4" fill="#20002F" />
    <path d="M9.1 13.5h-1.6l-.3.9H5.9l2-5.4h1.4l2 5.4H10l-.3-.9zm-1.3-3.6l-.6 1.8h1.2l-.6-1.8zm5.9 3.6h-2.1V9h2.1v1h-1v.8h1v.8h-1v.9h1v1z" fill="#CF96FD" />
  </svg>
);

export const LocalIllustratorIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <rect width="24" height="24" rx="4" fill="#331D00" />
    <path d="M9.1 13.5h-1.6l-.3.9H5.9l2-5.4h1.4l2 5.4H10l-.3-.9zm-1.3-3.6l-.6 1.8h1.2l-.6-1.8zm3.2.7h1.2v3.7h-1.2v-3.7zm0-1.8h1.2V10h-1.2V8.8z" fill="#FF9A00" />
  </svg>
);

export const LocalFigmaIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 1.17 2.83A4 4 0 0 0 8 11.67V12a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-1.17-2.83A4 4 0 0 0 16 11.67V11.33A4 4 0 0 0 14.83 8.5 4 4 0 0 0 16 6a4 4 0 0 0-4-4z" fill="#F24E1E" />
  </svg>
);

export const LocalHiggsfieldIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <circle cx="12" cy="12" r="10" fill="#000000" />
    <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const GeminiIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4E8CFF" />
        <stop offset="100%" stopColor="#8E75FF" />
      </linearGradient>
    </defs>
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#gemini-grad)" />
    <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.3" />
  </svg>
);

export const GPTIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" className={className} style={style} fill="none">
    <rect width="24" height="24" rx="6" fill="#74AA9C" />
    <path d="M16 10.5c0-.8-.7-1.5-1.5-1.5S13 9.7 13 10.5v3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-3zM11 10.5c0-.8-.7-1.5-1.5-1.5S8 9.7 8 10.5v3c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-3z" fill="white" />
  </svg>
);

export const ICON_MAP: { [key: string]: any } = {
  Instagram: LocalInstagramIcon,
  Facebook: LocalFacebookIcon,
  Meta: LocalMetaIcon,
  YouTube: LocalYoutubeIcon,
  Photoshop: LocalPhotoshopIcon,
  PremierePro: LocalPremiereIcon,
  AfterEffects: LocalAfterEffectsIcon,
  Illustrator: LocalIllustratorIcon,
  Figma: FigmaLucide,
  Higgsfield: LocalHiggsfieldIcon,
  Gemini: GeminiIcon,
  ChatGPT: GPTIcon,
  Zap: Zap,
};
