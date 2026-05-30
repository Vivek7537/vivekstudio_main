import React from 'react';

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
}

export const InputGroup = ({ label, value, onChange, textarea, type = 'text', placeholder }: InputGroupProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-brand-heading focus:outline-none focus:border-brand-orange transition-all font-medium min-h-[100px] resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-brand-heading focus:outline-none focus:border-brand-orange transition-all font-bold"
      />
    )}
  </div>
);
