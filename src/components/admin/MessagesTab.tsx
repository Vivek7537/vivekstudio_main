import React from 'react';
import { Trash2, Send, User, Mail, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MessagesTab = ({ messages, deleteMessage }: { messages: any[], deleteMessage: (id: string) => void }) => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Contact Messages</h3>
        <span className="px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-widest">
          {messages.length} Total
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200"
            >
              <Mail className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No messages yet</p>
            </motion.div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm group hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-6 flex-1">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                        <User className="w-4 h-4 text-brand-orange" />
                        <span className="text-xs font-bold text-brand-heading">{msg.name}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                        <Mail className="w-4 h-4 text-brand-orange" />
                        <span className="text-xs font-bold text-brand-heading">{msg.email}</span>
                      </div>
                      {msg.timestamp && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {new Date(msg.timestamp.seconds * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl relative">
                      <div className="absolute top-4 right-4 opacity-10">
                        <Send className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-medium text-brand-heading leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="self-start p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
