import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { InputGroup } from './InputGroup';

export const ArsenalTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  return (
    <div className="space-y-12">
      <h3 className="text-xl font-bold">Technology Stack</h3>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <InputGroup label="Arsenal Heading" value={tempSettings.arsenal.heading} onChange={v => handleLocalUpdate('arsenal.heading', v)} />
        <InputGroup label="Subtext" value={tempSettings.arsenal.subtext} onChange={v => handleLocalUpdate('arsenal.subtext', v)} textarea />
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {tempSettings.arsenal.tools.map((tool: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center gap-4 group relative">
            <button 
              onClick={() => {
                const newList = [...tempSettings.arsenal.tools];
                newList.splice(i, 1);
                handleLocalUpdate('arsenal.tools', newList);
              }} 
              className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
              <img src={tool.logoUrl || 'https://via.placeholder.com/64'} className="w-8 h-8 object-contain" alt={tool.name} />
            </div>
            <input 
              value={tool.name} 
              onChange={e => {
                const newList = [...tempSettings.arsenal.tools];
                newList[i] = { ...tool, name: e.target.value };
                handleLocalUpdate('arsenal.tools', newList);
              }} 
              className="text-center font-bold text-xs bg-transparent border-none outline-none w-full" 
            />
            <input 
              value={tool.logoUrl} 
              onChange={e => {
                const newList = [...tempSettings.arsenal.tools];
                newList[i] = { ...tool, logoUrl: e.target.value };
                handleLocalUpdate('arsenal.tools', newList);
              }} 
              className="text-center text-[8px] font-mono text-slate-400 bg-transparent border-none outline-none w-full" 
              placeholder="Icon/Logo URL" 
            />
          </div>
        ))}
        <button 
          onClick={() => handleLocalUpdate('arsenal.tools', [...tempSettings.arsenal.tools, { name: 'New Tool', logoUrl: '', color: '#FF6A00' }])}
          className="border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-center text-slate-300 hover:text-brand-orange hover:border-brand-orange p-10"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};
