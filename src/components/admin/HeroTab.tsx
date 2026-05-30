import React from 'react';
import { InputGroup } from './InputGroup';

export const HeroTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  return (
    <div className="space-y-12">
      <h3 className="text-xl font-bold">Hero Section Content</h3>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <InputGroup 
          label="Main Heading (*text* for gradient)" 
          value={tempSettings.hero.heading} 
          onChange={v => handleLocalUpdate('hero.heading', v)} 
          textarea
        />
        <InputGroup 
          label="Heading Font Size" 
          value={tempSettings.hero.headingFontSize} 
          onChange={v => handleLocalUpdate('hero.headingFontSize', v)} 
        />
        <InputGroup 
          label="Subtext Description" 
          value={tempSettings.hero.subtext} 
          onChange={v => handleLocalUpdate('hero.subtext', v)} 
          textarea
        />
        <InputGroup 
          label="Subtext Font Size" 
          value={tempSettings.hero.subtextFontSize} 
          onChange={v => handleLocalUpdate('hero.subtextFontSize', v)} 
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <InputGroup label="Button 1 Text" value={tempSettings.hero.button1Text} onChange={v => handleLocalUpdate('hero.button1Text', v)} />
        <InputGroup label="Button 1 Link" value={tempSettings.hero.button1Link} onChange={v => handleLocalUpdate('hero.button1Link', v)} />
        <InputGroup label="Button 2 Text" value={tempSettings.hero.button2Text} onChange={v => handleLocalUpdate('hero.button2Text', v)} />
        <InputGroup label="Button 2 Link" value={tempSettings.hero.button2Link} onChange={v => handleLocalUpdate('hero.button2Link', v)} />
      </section>

      <section className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <InputGroup label="Featured Image URL" value={tempSettings.hero.imageUrl} onChange={v => handleLocalUpdate('hero.imageUrl', v)} />
        {tempSettings.hero.imageUrl && (
          <img src={tempSettings.hero.imageUrl} className="mt-6 w-full h-48 object-cover rounded-2xl border border-slate-100" alt="Preview" />
        )}
      </section>
    </div>
  );
};
