import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 sm:py-24 px-6 sm:px-12 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-[32px] sm:rounded-[64px] p-8 sm:p-16 shadow-2xl relative border border-slate-100">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-orange font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-10 hover:text-brand-heading transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Studio
        </Link>
        
        <h1 className="text-3xl sm:text-6xl font-black text-brand-heading mb-8 tracking-tight leading-none">Terms of Service</h1>
        
        <div className="space-y-6 text-brand-text/80 leading-relaxed font-light text-sm sm:text-base">
          <p className="font-bold text-brand-heading">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl sm:text-3xl font-black text-brand-heading mt-10 mb-4 tracking-tight">1. Agreement to Terms</h2>
          <p>By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

          <h2 className="text-xl sm:text-3xl font-black text-brand-heading mt-10 mb-4 tracking-tight">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Vivek Studio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on Vivek Studio's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-black text-brand-heading mt-10 mb-4 tracking-tight">3. Disclaimer</h2>
          <p>The materials on Vivek Studio's website are provided on an 'as is' basis. Vivek Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2 className="text-xl sm:text-3xl font-black text-brand-heading mt-10 mb-4 tracking-tight">4. Limitations</h2>
          <p>In no event shall Vivek Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Vivek Studio's website, even if Vivek Studio or a Vivek Studio authorized representative has been notified orally or in writing of the possibility of such damage.</p>

          <h2 className="text-xl sm:text-3xl font-black text-brand-heading mt-10 mb-4 tracking-tight">5. Revisions and Errata</h2>
          <p>The materials appearing on Vivek Studio's website could include technical, typographical, or photographic errors. Vivek Studio does not warrant that any of the materials on its website are accurate, complete, or current. Vivek Studio may make changes to the materials contained on its website at any time without notice.</p>
          
          <h2 className="text-xl sm:text-3xl font-black text-brand-heading mt-10 mb-4 tracking-tight">6. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where Vivek Studio operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </div>
    </div>
  );
}