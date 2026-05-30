import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { InputGroup } from './InputGroup';

export const ReelsTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  const cleanInstagramUrl = (url: string) => {
    if (!url) return '';
    return url.split('?')[0].replace(/\/$/, '');
  };

  return (
    <div className="space-y-12">
      <h3 className="text-xl font-bold">Instagram Reels & Highlights</h3>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <InputGroup label="Heading" value={tempSettings.reels.heading} onChange={v => handleLocalUpdate('reels.heading', v)} />
        <InputGroup label="Heading Font Size" value={tempSettings.reels.headingFontSize} onChange={v => handleLocalUpdate('reels.headingFontSize', v)} />
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {tempSettings.reels.items.map((item: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4 group">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Reel #{i + 1}</span>
              <button 
                onClick={() => {
                  const newList = [...tempSettings.reels.items];
                  newList.splice(i, 1);
                  handleLocalUpdate('reels.items', newList);
                }} 
                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <InputGroup 
              label="Reel Title" 
              value={item.title} 
              onChange={v => {
                const newList = [...tempSettings.reels.items];
                newList[i] = { ...item, title: v };
                handleLocalUpdate('reels.items', newList);
              }} 
            />
            <InputGroup 
              label="Reel Link (Instagram URL)" 
              value={item.link} 
              onChange={v => {
                const newList = [...tempSettings.reels.items];
                newList[i] = { ...item, link: v };
                handleLocalUpdate('reels.items', newList);
              }} 
              // Using onBlur to clean URL is good UX
            />
            <InputGroup 
              label="Preview Image URL" 
              value={item.img || ''} 
              onChange={v => {
                const newList = [...tempSettings.reels.items];
                newList[i] = { ...item, img: v };
                handleLocalUpdate('reels.items', newList);
              }} 
            />
          </div>
        ))}
        <button 
          onClick={() => handleLocalUpdate('reels.items', [...tempSettings.reels.items, { title: 'New Reel', tag: 'Creative', link: '', type: 'image', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600' }])}
          className="p-10 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-brand-orange hover:text-brand-orange transition-all font-black uppercase"
        >
          <Plus className="w-10 h-10" />
          Add New Reel
        </button>
      </div>
    </div>
  );
};
