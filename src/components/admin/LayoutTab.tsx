import React from 'react';
import { InputGroup } from './InputGroup';

export const LayoutTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  return (
    <div className="space-y-12">
      <h3 className="text-xl font-bold">Navbar & Brand</h3>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <InputGroup label="Brand Name" value={tempSettings.navbar.brandName} onChange={v => handleLocalUpdate('navbar.brandName', v)} />
        <InputGroup label="Logo Font Size" value={tempSettings.navbar.fontSize} onChange={v => handleLocalUpdate('navbar.fontSize', v)} />
      </section>

      <h3 className="text-xl font-bold">Section Visibility & Order</h3>
      <section className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <p className="text-xs text-slate-400 mb-6 font-bold uppercase tracking-widest">Toggle and reorder sections (Comma separated IDs)</p>
        <InputGroup 
          label="Section IDs Order" 
          value={tempSettings.sectionOrder.join(', ')} 
          onChange={v => handleLocalUpdate('sectionOrder', v.split(',').map(s => s.trim()))} 
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {['hero', 'topRated', 'process', 'portfolio', 'reels', 'expertise', 'arsenal', 'testimonials', 'contact'].map(id => (
            <span key={id} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${tempSettings.sectionOrder.includes(id) ? 'bg-brand-orange/10 text-brand-orange' : 'bg-slate-100 text-slate-400'}`}>
              {id}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
