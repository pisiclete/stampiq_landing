// StampIQ — Privacy Policy content (translation keys live in translations-legal.json).
import React from 'react';
import { useT, useLang } from '../../i18n/I18nContext';
import { renderSections } from './renderSections';

const SECTIONS = [
  { type: 'h2', key: 'privacy.s1_title' },
  { type: 'p',  key: 'privacy.s1_p1' },
  { type: 'p',  key: 'privacy.s1_p2' },
  { type: 'p',  key: 'privacy.s1_data_controller' },

  { type: 'h2', key: 'privacy.s2_title' },
  { type: 'p',  key: 'privacy.s2_p1' },

  { type: 'h2', key: 'privacy.s3_title' },
  { type: 'h3', key: 'privacy.s3_1_title' },
  { type: 'p',  key: 'privacy.s3_1_p1' },
  { type: 'ul', items: ['privacy.s3_1_li1','privacy.s3_1_li2','privacy.s3_1_li3','privacy.s3_1_li4','privacy.s3_1_li5','privacy.s3_1_li6','privacy.s3_1_li7'] },
  { type: 'p',  key: 'privacy.s3_1_p2' },
  { type: 'ul', items: ['privacy.s3_1_li8','privacy.s3_1_li9','privacy.s3_1_li10'] },
  { type: 'h3', key: 'privacy.s3_2_title' },
  { type: 'p',  key: 'privacy.s3_2_p1' },
  { type: 'ul', items: ['privacy.s3_2_li1','privacy.s3_2_li2','privacy.s3_2_li3','privacy.s3_2_li4','privacy.s3_2_li5','privacy.s3_2_li6'] },
  { type: 'h3', key: 'privacy.s3_3_title' },
  { type: 'p',  key: 'privacy.s3_3_p1' },
  { type: 'ul', items: ['privacy.s3_3_li1','privacy.s3_3_li2','privacy.s3_3_li3','privacy.s3_3_li4','privacy.s3_3_li5'] },
  { type: 'h3', key: 'privacy.s3_4_title' },
  { type: 'p',  key: 'privacy.s3_4_p1' },
  { type: 'ul', items: ['privacy.s3_4_li1','privacy.s3_4_li2','privacy.s3_4_li3','privacy.s3_4_li4'] },
  { type: 'p',  key: 'privacy.s3_4_p2' },
  { type: 'h3', key: 'privacy.s3_5_title' },
  { type: 'p',  key: 'privacy.s3_5_p1' },
  { type: 'ul', items: ['privacy.s3_5_li1','privacy.s3_5_li2','privacy.s3_5_li3'] },
  { type: 'h3', key: 'privacy.s3_6_title' },
  { type: 'p',  key: 'privacy.s3_6_p1' },
  { type: 'ul', items: ['privacy.s3_6_li1','privacy.s3_6_li2','privacy.s3_6_li3','privacy.s3_6_li4'] },
  { type: 'h3', key: 'privacy.s3_7_title' },
  { type: 'p',  key: 'privacy.s3_7_p1' },
  { type: 'ul', items: ['privacy.s3_7_li1','privacy.s3_7_li2','privacy.s3_7_li3','privacy.s3_7_li4','privacy.s3_7_li5','privacy.s3_7_li6'] },
  { type: 'h3', key: 'privacy.s3_8_title' },
  { type: 'p',  key: 'privacy.s3_8_p1' },
  { type: 'ul', items: ['privacy.s3_8_li1','privacy.s3_8_li2','privacy.s3_8_li3','privacy.s3_8_li4'] },
  { type: 'h3', key: 'privacy.s3_9_title' },
  { type: 'p',  key: 'privacy.s3_9_p1' },
  { type: 'ul', items: ['privacy.s3_9_li1','privacy.s3_9_li2','privacy.s3_9_li3','privacy.s3_9_li4'] },
  { type: 'p',  key: 'privacy.s3_9_p2' },
  { type: 'p',  key: 'privacy.s3_9_p3' },
  { type: 'h3', key: 'privacy.s3_10_title' },
  { type: 'ul', items: ['privacy.s3_10_li1','privacy.s3_10_li2','privacy.s3_10_li3','privacy.s3_10_li4'] },

  { type: 'h2', key: 'privacy.s4_title' },
  { type: 'p',  key: 'privacy.s4_p1' },
  { type: 'table', key: 'privacy.s4_table' },
  { type: 'h3', key: 'privacy.s4_1_title' },
  { type: 'p',  key: 'privacy.s4_1_p1' },
  { type: 'p',  key: 'privacy.s4_1_p2' },

  { type: 'h2', key: 'privacy.s5_title' },
  { type: 'p',  key: 'privacy.s5_p1' },
  { type: 'h3', key: 'privacy.s5_1_title' },
  { type: 'table', key: 'privacy.s5_1_table' },
  { type: 'h3', key: 'privacy.s5_2_title' },
  { type: 'p',  key: 'privacy.s5_2_p1' },

  { type: 'h2', key: 'privacy.s6_title' },
  { type: 'h3', key: 'privacy.s6_1_title' },
  { type: 'ul', items: ['privacy.s6_1_li1','privacy.s6_1_li2'] },
  { type: 'h3', key: 'privacy.s6_2_title' },
  { type: 'ul', items: ['privacy.s6_2_li1','privacy.s6_2_li2','privacy.s6_2_li3','privacy.s6_2_li4','privacy.s6_2_li5'] },
  { type: 'p',  key: 'privacy.s6_2_p1' },

  { type: 'h2', key: 'privacy.s7_title' },
  { type: 'p',  key: 'privacy.s7_p1' },
  { type: 'h3', key: 'privacy.s7_1_title' },
  { type: 'p',  key: 'privacy.s7_1_p1' },
  { type: 'ul', items: ['privacy.s7_1_li1','privacy.s7_1_li2','privacy.s7_1_li3'] },
  { type: 'h3', key: 'privacy.s7_2_title' },
  { type: 'p',  key: 'privacy.s7_2_p1' },
  { type: 'ul', items: ['privacy.s7_2_li1','privacy.s7_2_li2','privacy.s7_2_li3'] },
  { type: 'h3', key: 'privacy.s7_3_title' },
  { type: 'p',  key: 'privacy.s7_3_p1' },
  { type: 'ul', items: ['privacy.s7_3_li1','privacy.s7_3_li2'] },
  { type: 'p',  key: 'privacy.s7_3_p2' },

  { type: 'h2', key: 'privacy.s8_title' },
  { type: 'p',  key: 'privacy.s8_p1' },
  { type: 'table', key: 'privacy.s8_table' },
  { type: 'h3', key: 'privacy.s8_1_title' },
  { type: 'p',  key: 'privacy.s8_1_p1' },
  { type: 'ul', items: ['privacy.s8_1_li1','privacy.s8_1_li2','privacy.s8_1_li3'] },
  { type: 'h3', key: 'privacy.s8_2_title' },
  { type: 'ul', items: ['privacy.s8_2_li1','privacy.s8_2_li2','privacy.s8_2_li3'] },

  { type: 'h2', key: 'privacy.s9_title' },
  { type: 'p',  key: 'privacy.s9_p1' },
  { type: 'h3', key: 'privacy.s9_1_title' },
  { type: 'p',  key: 'privacy.s9_1_p1' },
  { type: 'h3', key: 'privacy.s9_2_title' },
  { type: 'p',  key: 'privacy.s9_2_p1' },
  { type: 'h3', key: 'privacy.s9_3_title' },
  { type: 'p',  key: 'privacy.s9_3_p1' },
  { type: 'h3', key: 'privacy.s9_4_title' },
  { type: 'p',  key: 'privacy.s9_4_p1' },
  { type: 'h3', key: 'privacy.s9_5_title' },
  { type: 'p',  key: 'privacy.s9_5_p1' },
  { type: 'h3', key: 'privacy.s9_6_title' },
  { type: 'p',  key: 'privacy.s9_6_p1' },
  { type: 'h3', key: 'privacy.s9_7_title' },
  { type: 'p',  key: 'privacy.s9_7_p1' },
  { type: 'h3', key: 'privacy.s9_8_title' },
  { type: 'p',  key: 'privacy.s9_8_p1' },
  { type: 'ul', items: ['privacy.s9_8_li1','privacy.s9_8_li2'] },
  { type: 'p',  key: 'privacy.s9_8_p2' },
  { type: 'h3', key: 'privacy.s9_9_title' },
  { type: 'p',  key: 'privacy.s9_9_p1' },
  { type: 'ul', items: ['privacy.s9_9_li1','privacy.s9_9_li2'] },

  { type: 'h2', key: 'privacy.s10_title' },
  { type: 'p',  key: 'privacy.s10_p1' },
  { type: 'p',  key: 'privacy.s10_p2' },
  { type: 'p',  key: 'privacy.s10_p3' },

  { type: 'h2', key: 'privacy.s11_title' },
  { type: 'p',  key: 'privacy.s11_p1' },
  { type: 'p',  key: 'privacy.s11_p2' },

  { type: 'h2', key: 'privacy.s12_title' },
  { type: 'p',  key: 'privacy.s12_p1' },
  { type: 'p',  key: 'privacy.s12_p2' },
  { type: 'ul', items: ['privacy.s12_li1','privacy.s12_li2','privacy.s12_li3','privacy.s12_li4'] },
  { type: 'p',  key: 'privacy.s12_p3' },
  { type: 'ul', items: ['privacy.s12_li5','privacy.s12_li6','privacy.s12_li7'] },
  { type: 'p',  key: 'privacy.s12_p4' },

  { type: 'h2', key: 'privacy.s13_title' },
  { type: 'p',  key: 'privacy.s13_p1' },
  { type: 'ul', items: ['privacy.s13_li1','privacy.s13_li2','privacy.s13_li3'] },
  { type: 'p',  key: 'privacy.s13_p2' },

  { type: 'h2', key: 'privacy.s14_title' },
  { type: 'p',  key: 'privacy.s14_p1' },
  { type: 'p',  key: 'privacy.s14_contact_privacy' },
  { type: 'p',  key: 'privacy.s14_contact_support' },

  { type: 'hr' },
  { type: 'p.footer-note', key: 'privacy.footer' },
];

export default function Privacy() {
  const t = useT();
  const lang = useLang();
  const home = lang === 'en' ? '/' : `/${lang}/`;
  return (
    <>
      <a href={home} className="back-link" dangerouslySetInnerHTML={{ __html: t('legal.back_link') }}/>
      <h1 dangerouslySetInnerHTML={{ __html: t('privacy.heading') }}/>
      <p className="last-updated" dangerouslySetInnerHTML={{ __html: t('legal.last_updated') }}/>
      <p className="effective-date" dangerouslySetInnerHTML={{ __html: t('privacy.effective_date') }}/>
      {renderSections(SECTIONS, t)}
    </>
  );
}
