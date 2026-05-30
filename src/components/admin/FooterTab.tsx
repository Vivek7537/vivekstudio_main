import React from 'react';
import { InputGroup } from './InputGroup';

export const FooterTab = ({ tempSettings, handleLocalUpdate }: { tempSettings: any, handleLocalUpdate: (path: string, value: any) => void }) => {
  return (
    <div className="space-y-12">
      <section className="space-y-8">
        <h3 className="text-xl font-bold">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm">
          <InputGroup label="Public Email" value={tempSettings.contact.email} onChange={v => handleLocalUpdate('contact.email', v)} />
          <InputGroup label="WhatsApp Number" value={tempSettings.contact.whatsapp || ''} onChange={v => handleLocalUpdate('contact.whatsapp', v)} />
          <InputGroup label="Heading" value={tempSettings.contact.heading} onChange={v => handleLocalUpdate('contact.heading', v)} />
          <InputGroup label="Heading Font Size" value={tempSettings.contact.headingFontSize} onChange={v => handleLocalUpdate('contact.headingFontSize', v)} />
          <InputGroup label="Subtext" value={tempSettings.contact.subtext} onChange={v => handleLocalUpdate('contact.subtext', v)} textarea />
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-xl font-bold">Footer Bio & Socials</h3>
        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-8">
          <InputGroup label="Footer Bio Text" value={tempSettings.footer.text} onChange={v => handleLocalUpdate('footer.text', v)} textarea />
          <InputGroup label="Copyright Text" value={tempSettings.footer.copyright || ''} onChange={v => handleLocalUpdate('footer.copyright', v)} />
          <InputGroup label="Office Address" value={tempSettings.footer.address || ''} onChange={v => handleLocalUpdate('footer.address', v)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputGroup label="Instagram Profile URL" value={tempSettings.footer.socials.instagram} onChange={v => handleLocalUpdate('footer.socials.instagram', v)} />
            <InputGroup label="Twitter Profile URL" value={tempSettings.footer.socials.twitter} onChange={v => handleLocalUpdate('footer.socials.twitter', v)} />
            <InputGroup label="LinkedIn Profile URL" value={tempSettings.footer.socials.linkedin} onChange={v => handleLocalUpdate('footer.socials.linkedin', v)} />
            <InputGroup label="YouTube Channel URL" value={tempSettings.footer.socials.youtube || ''} onChange={v => handleLocalUpdate('footer.socials.youtube', v)} />
          </div>
        </div>
      </section>
    </div>
  );
};
