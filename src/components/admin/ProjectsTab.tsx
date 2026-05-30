import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { InputGroup } from './InputGroup';

export const ProjectsTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  return (
    <div className="space-y-12">
      <section className="space-y-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold">Top Rated Marquee</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InputGroup label="Marquee Heading" value={tempSettings.topRated.heading} onChange={v => handleLocalUpdate('topRated.heading', v)} />
          <InputGroup label="Heading Style" value={tempSettings.topRated.headingFontSize} onChange={v => handleLocalUpdate('topRated.headingFontSize', v)} />
          <InputGroup label="Project Aspect Ratio" value={tempSettings.topRated.aspectRatio || ''} onChange={v => handleLocalUpdate('topRated.aspectRatio', v)} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tempSettings.topRated.projects.map((p: any, i: number) => (
            <div key={i} className="p-3 bg-slate-50 rounded-xl relative group">
              <img src={p.img} className="w-full h-20 object-cover rounded-lg mb-2" alt={p.title} />
              <input 
                value={p.title} 
                onChange={e => {
                  const newList = [...tempSettings.topRated.projects];
                  newList[i] = { ...p, title: e.target.value };
                  handleLocalUpdate('topRated.projects', newList);
                }} 
                className="text-[10px] font-bold w-full bg-transparent border-none outline-none" 
              />
              <input 
                value={p.img} 
                onChange={e => {
                  const newList = [...tempSettings.topRated.projects];
                  newList[i] = { ...p, img: e.target.value };
                  handleLocalUpdate('topRated.projects', newList);
                }} 
                className="text-[8px] font-mono w-full bg-transparent border-none outline-none text-slate-400" 
                placeholder="Image URL" 
              />
              <button 
                onClick={() => {
                  const newList = [...tempSettings.topRated.projects];
                  newList.splice(i, 1);
                  handleLocalUpdate('topRated.projects', newList);
                }} 
                className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button 
            onClick={() => handleLocalUpdate('topRated.projects', [...tempSettings.topRated.projects, { id: Date.now(), title: 'New Rated', category: 'General', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' }])} 
            className="border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 hover:text-brand-orange hover:border-brand-orange p-10"
          >
            <Plus />
          </button>
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-xl font-bold">Split Showcase Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h4 className="text-sm font-black text-brand-orange uppercase tracking-widest">Graphic Design Services</h4>
            <div className="space-y-3">
              {tempSettings.expertise.graphicDesign.map((item: any, i: number) => (
                <div key={i} className="flex gap-3 bg-white p-3 rounded-2xl shadow-sm items-center group">
                  <img src={item.img} className="w-12 h-12 rounded-xl object-cover" alt={item.name} />
                  <div className="flex-1 space-y-1">
                    <input 
                      value={item.name} 
                      onChange={e => {
                        const newList = [...tempSettings.expertise.graphicDesign];
                        newList[i] = { ...item, name: e.target.value };
                        handleLocalUpdate('expertise.graphicDesign', newList);
                      }}
                      className="w-full bg-transparent text-xs font-bold outline-none" 
                    />
                    <input 
                      value={item.img} 
                      onChange={e => {
                        const newList = [...tempSettings.expertise.graphicDesign];
                        newList[i] = { ...item, img: e.target.value };
                        handleLocalUpdate('expertise.graphicDesign', newList);
                      }}
                      className="w-full bg-transparent text-[8px] font-mono text-slate-400 outline-none" 
                      placeholder="Img URL"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      const newList = [...tempSettings.expertise.graphicDesign];
                      newList.splice(i, 1);
                      handleLocalUpdate('expertise.graphicDesign', newList);
                    }} 
                    className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => handleLocalUpdate('expertise.graphicDesign', [...tempSettings.expertise.graphicDesign, { name: 'New Graphic Skill', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' }])} 
                className="w-full p-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-brand-orange transition-all"
              >
                <Plus className="w-3 h-3 inline mr-2" /> Add Skill
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black text-blue-500 uppercase tracking-widest">Video Editing Services</h4>
            <div className="space-y-3">
              {tempSettings.expertise.videoEditing.map((item: any, i: number) => (
                <div key={i} className="flex gap-3 bg-white p-3 rounded-2xl shadow-sm items-center group">
                  <img src={item.img} className="w-12 h-12 rounded-xl object-cover" alt={item.name} />
                  <div className="flex-1 space-y-1">
                    <input 
                      value={item.name} 
                      onChange={e => {
                        const newList = [...tempSettings.expertise.videoEditing];
                        newList[i] = { ...item, name: e.target.value };
                        handleLocalUpdate('expertise.videoEditing', newList);
                      }}
                      className="w-full bg-transparent text-xs font-bold outline-none" 
                    />
                    <input 
                      value={item.img} 
                      onChange={e => {
                        const newList = [...tempSettings.expertise.videoEditing];
                        newList[i] = { ...item, img: e.target.value };
                        handleLocalUpdate('expertise.videoEditing', newList);
                      }}
                      className="w-full bg-transparent text-[8px] font-mono text-slate-400 outline-none" 
                      placeholder="Img URL"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      const newList = [...tempSettings.expertise.videoEditing];
                      newList.splice(i, 1);
                      handleLocalUpdate('expertise.videoEditing', newList);
                    }} 
                    className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => handleLocalUpdate('expertise.videoEditing', [...tempSettings.expertise.videoEditing, { name: 'New Video Skill', img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800' }])} 
                className="w-full p-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-blue-500 transition-all"
              >
                <Plus className="w-3 h-3 inline mr-2" /> Add Skill
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
