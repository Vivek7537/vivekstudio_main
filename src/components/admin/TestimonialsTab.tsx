import React from 'react';
import { Trash2, Plus, Star } from 'lucide-react';
import { InputGroup } from './InputGroup';

export const TestimonialsTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  return (
    <div className="space-y-12">
      <h3 className="text-xl font-bold">Client Feedback</h3>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <InputGroup label="Heading" value={tempSettings.testimonials.heading} onChange={v => handleLocalUpdate('testimonials.heading', v)} />
        <InputGroup label="Heading Font Size" value={tempSettings.testimonials.headingFontSize || ''} onChange={v => handleLocalUpdate('testimonials.headingFontSize', v)} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tempSettings.testimonials.items.map((t: any, i: number) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6 group relative">
            <button 
              onClick={() => {
                const newList = [...tempSettings.testimonials.items];
                newList.splice(i, 1);
                handleLocalUpdate('testimonials.items', newList);
              }} 
              className="absolute top-6 right-6 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 cursor-pointer ${star <= t.rating ? 'fill-brand-orange text-brand-orange' : 'text-slate-200'}`} 
                  onClick={() => {
                    const newList = [...tempSettings.testimonials.items];
                    newList[i] = { ...t, rating: star };
                    handleLocalUpdate('testimonials.items', newList);
                  }}
                />
              ))}
            </div>
            <InputGroup 
              label="Review Text" 
              value={t.text} 
              onChange={v => {
                const newList = [...tempSettings.testimonials.items];
                newList[i] = { ...t, text: v };
                handleLocalUpdate('testimonials.items', newList);
              }} 
              textarea 
            />
            <div className="grid grid-cols-2 gap-4">
              <InputGroup 
                label="Client Name" 
                value={t.name} 
                onChange={v => {
                  const newList = [...tempSettings.testimonials.items];
                  newList[i] = { ...t, name: v };
                  handleLocalUpdate('testimonials.items', newList);
                }} 
              />
              <InputGroup 
                label="Role / Title" 
                value={t.role} 
                onChange={v => {
                  const newList = [...tempSettings.testimonials.items];
                  newList[i] = { ...t, role: v };
                  handleLocalUpdate('testimonials.items', newList);
                }} 
              />
            </div>
            <InputGroup 
              label="Avatar URL" 
              value={t.avatar} 
              onChange={v => {
                const newList = [...tempSettings.testimonials.items];
                newList[i] = { ...t, avatar: v };
                handleLocalUpdate('testimonials.items', newList);
              }} 
            />
          </div>
        ))}
        <button 
          onClick={() => handleLocalUpdate('testimonials.items', [...tempSettings.testimonials.items, { name: 'New Client', role: 'CEO', text: 'Amazing work!', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' }])} 
          className="p-10 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-brand-orange hover:text-brand-orange transition-all font-black uppercase"
        >
          <Plus className="w-10 h-10" />
          Add Testimonial
        </button>
      </div>
    </div>
  );
};
