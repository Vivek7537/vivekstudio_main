import React, { useState } from 'react';
import { Trash2, Plus, ImageIcon, ChevronRight } from 'lucide-react';
import { InputGroup } from './InputGroup';

export const PortfolioManagerTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  const [activeCategory, setActiveCategory] = useState<string>(Object.keys(tempSettings.portfolio.projects)[0] || '');

  const categories = Object.keys(tempSettings.portfolio.projects);

  const addCategory = () => {
    const name = prompt('Category Name:');
    if (!name) return;
    const newProjects = { ...tempSettings.portfolio.projects, [name]: [] };
    const newExpertise = [...tempSettings.portfolio.expertise, { 
      id: Date.now(), 
      title: name, 
      img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', 
      projects: [] 
    }];
    handleLocalUpdate('portfolio.projects', newProjects);
    handleLocalUpdate('portfolio.expertise', newExpertise);
    setActiveCategory(name);
  };

  const removeCategory = (cat: string) => {
    if (!confirm(`Delete category "${cat}" and all its projects?`)) return;
    const newProjects = { ...tempSettings.portfolio.projects };
    delete newProjects[cat];
    const newExpertise = tempSettings.portfolio.expertise.filter((e: any) => e.title !== cat);
    handleLocalUpdate('portfolio.projects', newProjects);
    handleLocalUpdate('portfolio.expertise', newExpertise);
    if (activeCategory === cat) setActiveCategory(Object.keys(newProjects)[0] || '');
  };

  const addProject = () => {
    if (!activeCategory) return;
    const newList = [...(tempSettings.portfolio.projects[activeCategory] || [])];
    newList.push({ title: 'New Project', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' });
    handleLocalUpdate(`portfolio.projects.${activeCategory}`, newList);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories</h4>
            <button onClick={addCategory} className="text-brand-orange hover:scale-110 transition-transform"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="space-y-1">
            {categories.map(cat => (
              <div key={cat} className="group flex items-center justify-between">
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeCategory === cat ? 'bg-brand-heading text-white shadow-lg' : 'text-brand-heading hover:bg-slate-50'}`}
                >
                  {cat}
                </button>
                <button 
                  onClick={() => removeCategory(cat)}
                  className="px-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 space-y-8">
          {activeCategory ? (
            <>
              <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-2xl font-black text-brand-heading tracking-tight">{activeCategory}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {(tempSettings.portfolio.projects[activeCategory] || []).length} Projects
                  </p>
                </div>
                <button 
                  onClick={addProject}
                  className="px-6 py-2.5 bg-brand-heading text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              {/* Category Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                 <InputGroup 
                    label="Category Cover Image" 
                    value={tempSettings.portfolio.expertise.find((e: any) => e.title === activeCategory)?.img || ''} 
                    onChange={v => {
                        const newExp = [...tempSettings.portfolio.expertise];
                        const idx = newExp.findIndex((e: any) => e.title === activeCategory);
                        if (idx !== -1) {
                            newExp[idx] = { ...newExp[idx], img: v };
                            handleLocalUpdate('portfolio.expertise', newExp);
                        }
                    }}
                 />
                 <InputGroup 
                    label="Grid Aspect Ratio (e.g. 1/1, 16/9, 3/4)" 
                    value={(tempSettings.portfolio.categoryRatios && tempSettings.portfolio.categoryRatios[activeCategory]) || ''} 
                    onChange={v => {
                        const newRatios = { ...(tempSettings.portfolio.categoryRatios || {}) };
                        newRatios[activeCategory] = v;
                        handleLocalUpdate('portfolio.categoryRatios', newRatios);
                    }}
                 />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(tempSettings.portfolio.projects[activeCategory] || []).map((project: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4 group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-slate-300" />
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project #{i + 1}</span>
                      </div>
                      <button 
                        onClick={() => {
                          const newList = [...tempSettings.portfolio.projects[activeCategory]];
                          newList.splice(i, 1);
                          handleLocalUpdate(`portfolio.projects.${activeCategory}`, newList);
                        }}
                        className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <InputGroup 
                      label="Project Title" 
                      value={project.title} 
                      onChange={v => {
                        const newList = [...tempSettings.portfolio.projects[activeCategory]];
                        newList[i] = { ...project, title: v };
                        handleLocalUpdate(`portfolio.projects.${activeCategory}`, newList);
                      }} 
                    />
                    <InputGroup 
                      label="Image URL" 
                      value={project.img} 
                      onChange={v => {
                        const newList = [...tempSettings.portfolio.projects[activeCategory]];
                        newList[i] = { ...project, img: v };
                        handleLocalUpdate(`portfolio.projects.${activeCategory}`, newList);
                      }} 
                    />
                    {project.img && (
                        <div className="h-32 rounded-2xl overflow-hidden border border-slate-100">
                           <img src={project.img} className="w-full h-full object-cover" alt="Preview" />
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-32 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                  <ChevronRight className="w-10 h-10" />
               </div>
               <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Select a category to manage projects</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
