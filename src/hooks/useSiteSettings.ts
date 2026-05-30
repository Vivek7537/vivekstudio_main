import { useState, useEffect, useCallback, useMemo } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import _ from 'lodash';

export interface SiteSettings {
  navbar: {
    logoUrl?: string;
    brandName: string;
    fontSize: string;
    links: { name: string; href: string }[];
  };
  hero: {
    heading: string;
    headingFontSize: string;
    subtext: string;
    subtextFontSize: string;
    button1Text: string;
    button1Link: string;
    button2Text: string;
    button2Link: string;
    imageUrl: string;
    showButton2?: boolean;
  };
  topRated: {
    heading: string;
    headingFontSize: string;
    aspectRatio?: string;
    projects: { id: number; title: string; category: string; img: string }[];
  };
  expertise: {
    graphicDesign: { name: string; img: string }[];
    videoEditing: { name: string; img: string }[];
    uiUxDesign?: { name: string; img: string }[];
    motionGraphics?: { name: string; img: string }[];
  };
  arsenal: {
    heading: string;
    headingFontSize: string;
    subtext: string;
    subtextFontSize: string;
    tools: { name: string; color: string; iconName: string; logoUrl?: string }[];
  };
  portfolio: {
    heading: string;
    headingFontSize: string;
    aspectRatio?: string;
    categoryRatios?: { [key: string]: string };
    expertise: { title: string; img: string; count: string }[];
    projects: { [key: string]: { title: string; img: string }[] };
  };
  testimonials: {
    heading: string;
    headingFontSize: string;
    items: { name: string; role: string; text: string; rating: number; avatar: string }[];
  };
  reels: {
    heading: string;
    headingFontSize: string;
    items: { title: string; tag: string; link: string; type: 'insta' | 'image'; img?: string }[];
  };
  contact: {
    heading: string;
    headingFontSize: string;
    subtext: string;
    subtextFontSize: string;
    email: string;
    whatsapp?: string;
  };
  footer: {
    text: string;
    socials: { instagram: string; twitter: string; linkedin: string; youtube?: string };
    copyright?: string;
    address?: string;
  };
  sectionOrder?: string[];
}

const DEFAULT_SETTINGS: SiteSettings = {
  navbar: {
    brandName: 'VIVEK STUDIO',
    fontSize: 'text-lg sm:text-xl',
    links: [
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Services', href: '#expertise-split' },
      { name: 'Contact', href: '#contact' },
    ]
  },
  hero: {
    heading: 'Create *Better* Digital *Experiences*.',
    headingFontSize: 'text-xl sm:text-5xl md:text-7xl lg:text-[50px]',
    subtext: 'We design and edit visuals that help your brand look professional, modern, and powerful.',
    subtextFontSize: 'text-[12px] sm:text-2xl lg:text-lg',
    button1Text: 'Explore Work',
    button1Link: '#portfolio',
    button2Text: 'Contact Us',
    button2Link: '#contact',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    showButton2: true
  },
  topRated: {
    heading: 'TOP RATED PROJECTS',
    headingFontSize: 'text-2xl sm:text-5xl',
    aspectRatio: '16/9',
    projects: [
      { id: 1, title: 'Luxe Branding', category: 'Graphic Design', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
      { id: 2, title: 'Urban Motion', category: 'Video Editing', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
      { id: 3, title: 'Tech UI 2026', category: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
      { id: 4, title: 'Nature Film', category: 'Cinematography', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800' },
      { id: 5, title: 'Futuristic Ad', category: 'Motion Graphics', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  expertise: {
    graphicDesign: [
      { name: 'Logo Design', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
      { name: 'Brand Identity', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
      { name: 'Social Media Design', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' }
    ],
    videoEditing: [
      { name: 'YouTube Editing', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800' },
      { name: 'Reels Editing', img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800' },
      { name: 'Podcast Editing', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800' }
    ],
    uiUxDesign: [],
    motionGraphics: []
  },
  arsenal: {
    heading: 'Arsenal',
    headingFontSize: 'text-3xl sm:text-6xl lg:text-4xl',
    subtext: 'Using the industry\'s most powerful creative tools to deliver high-quality professional results.',
    subtextFontSize: 'text-xs sm:text-lg',
    tools: [
      { name: 'Photoshop', color: '#31A8FF', iconName: 'Photoshop' },
      { name: 'Premiere Pro', color: '#9999FF', iconName: 'Premiere Pro' },
      { name: 'After Effects', color: '#CF96FD', iconName: 'After Effects' },
      { name: 'Illustrator', color: '#FF9A00', iconName: 'Illustrator' },
      { name: 'Figma', color: '#F24E1E', iconName: 'Figma' }
    ]
  },
  portfolio: {
    heading: 'Our Work',
    headingFontSize: 'text-2xl sm:text-4xl',
    aspectRatio: '3/4',
    categoryRatios: {
      "Social Media": "9/16",
      "Business": "4/3",
      "Logo": "1/1"
    },
    expertise: [
      { title: "Social Media", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800", count: "124+" },
      { title: "Business", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", count: "86+" },
      { title: "Logo", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800", count: "210+" }
    ],
    projects: {
      "Social Media": [
        { title: "Instagram Brand kit", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600" },
        { title: "Viral Post Strategy", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=600" }
      ],
      "Business": [
        { title: "Corp Presentation", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" },
        { title: "Investor Pitch Deck", img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=600" }
      ],
      "Logo": [
        { title: "Tech Abstract", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600" },
        { title: "Luxury Monochrome", img: "https://images.unsplash.com/photo-1549231596-9767ad30860d?auto=format&fit=crop&q=80&w=600" }
      ]
    }
  },
  testimonials: {
    heading: 'What Clients Say',
    headingFontSize: 'text-2xl sm:text-5xl lg:text-3xl',
    items: [
      { name: 'Sarah Johnson', role: 'Brand Director', text: "Great work! The design quality is amazing and very professional.", rating: 5, avatar: 'https://i.pravatar.cc/150?u=sarah' },
      { name: 'Marcus Chen', role: 'Product Lead', text: "The UI design is clean, fast, and easy to use.", rating: 5, avatar: 'https://i.pravatar.cc/150?u=marcus' }
    ]
  },
  reels: {
    heading: 'Highlight Reel',
    headingFontSize: 'text-2xl sm:text-5xl lg:text-3xl',
    items: [
      { 
        title: "Apple Vision Pro Concept", 
        tag: "3D Motion", 
        link: "https://www.instagram.com/p/C-XXXXX/", 
        type: 'image',
        img: "https://images.unsplash.com/photo-1478432703234-76ee41113e71?auto=format&fit=crop&q=80&w=600" 
      }
    ]
  },
  contact: {
    heading: 'Let’s Work Together',
    headingFontSize: 'text-2xl sm:text-5xl lg:text-4xl',
    subtext: 'I’m available for new projects and collaborations.',
    subtextFontSize: 'text-base sm:text-2xl lg:text-lg',
    email: 'hello@vivek.studio',
    whatsapp: '91XXXXXXXXXX'
  },
  footer: {
    text: 'Vivek Studio – We create clean, modern, and creative digital designs',
    socials: { instagram: '#', twitter: '#', linkedin: '#', youtube: '#' },
    copyright: '© 2026 VIVEK STUDIO. ALL RIGHTS RESERVED.',
    address: 'Mumbai, India'
  },
  sectionOrder: ['hero', 'topRated', 'process', 'portfolio', 'reels', 'expertise', 'arsenal', 'testimonials', 'contact']
};

interface HistoryState {
  stack: SiteSettings[];
  currentIndex: number;
}

const getCachedSettings = (): SiteSettings => {
  try {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('site_settings_cache');
      if (cached) {
        return _.merge({}, DEFAULT_SETTINGS, JSON.parse(cached));
      }
    }
  } catch (err) {
    console.warn('Failed to parse cached settings', err);
  }
  return DEFAULT_SETTINGS;
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(getCachedSettings);
  const [loading, setLoading] = useState(() => typeof window !== 'undefined' ? !localStorage.getItem('site_settings_cache') : true);
  const [history, setHistory] = useState<HistoryState>({
    stack: [],
    currentIndex: -1
  });

  useEffect(() => {
    const configPath = 'config/site';
    const unsub = onSnapshot(doc(db, 'config', 'site'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as SiteSettings;
        const merged = _.merge({}, DEFAULT_SETTINGS, data);
        setSettings(merged);
        localStorage.setItem('site_settings_cache', JSON.stringify(merged));
      } else {
        const currentEmail = auth.currentUser?.email;
        if (currentEmail === 'officialvivekkumar44@gmail.com' || currentEmail === 'vivek@vivek.studio') {
          setDoc(doc(db, 'config', 'site'), DEFAULT_SETTINGS).catch(err => {
            console.warn("Failed to initialize remote settings:", err.message);
          });
        }
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, configPath);
    });
    return unsub;
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<SiteSettings>) => {
    const updated = _.merge({}, settings, newSettings);
    try {
      setSettings(updated);
      localStorage.setItem('site_settings_cache', JSON.stringify(updated));
      
      const newStack = history.stack.slice(0, history.currentIndex + 1);
      newStack.push(JSON.parse(JSON.stringify(updated)));
      
      // Limit history to 20 states
      if (newStack.length > 20) {
        newStack.shift();
      }
      
      setHistory({
        stack: newStack,
        currentIndex: newStack.length - 1
      });

      await setDoc(doc(db, 'config', 'site'), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'site_settings');
      throw err;
    }
  }, [settings, history]);

  const undo = useCallback(async () => {
    if (history.currentIndex > 0) {
      const prevIndex = history.currentIndex - 1;
      const prevState = history.stack[prevIndex];
      
      setSettings(prevState);
      localStorage.setItem('site_settings_cache', JSON.stringify(prevState));
      setHistory(prev => ({ ...prev, currentIndex: prevIndex }));
      await setDoc(doc(db, 'config', 'site'), prevState);
    }
  }, [history]);

  const redo = useCallback(async () => {
    if (history.currentIndex < history.stack.length - 1) {
      const nextIndex = history.currentIndex + 1;
      const nextState = history.stack[nextIndex];
      
      setSettings(nextState);
      localStorage.setItem('site_settings_cache', JSON.stringify(nextState));
      setHistory(prev => ({ ...prev, currentIndex: nextIndex }));
      await setDoc(doc(db, 'config', 'site'), nextState);
    }
  }, [history]);

  const resetToDefault = useCallback(async () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem('site_settings_cache', JSON.stringify(DEFAULT_SETTINGS));
    await setDoc(doc(db, 'config', 'site'), DEFAULT_SETTINGS);
    setHistory({ stack: [], currentIndex: -1 });
  }, []);

  return { 
    settings, 
    updateSettings, 
    loading, 
    undo, 
    redo,
    history,
    resetToDefault 
  };
}
