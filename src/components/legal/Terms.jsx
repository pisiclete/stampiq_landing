// StampIQ — Terms of Service content (translation keys live in translations-legal.json).
import React from 'react';
import { useT, useLang } from '../../i18n/I18nContext';
import { renderSections } from './renderSections';

const SECTIONS = [
  { type: 'h2', key: 'terms.s1_title' },
  { type: 'p',  key: 'terms.s1_p1' },
  { type: 'p',  key: 'terms.s1_p2' },

  { type: 'h2', key: 'terms.s2_title' },
  { type: 'p',  key: 'terms.s2_p1' },
  { type: 'ul', items: ['terms.s2_li1','terms.s2_li2','terms.s2_li3'] },
  { type: 'p',  key: 'terms.s2_p2' },

  { type: 'h2', key: 'terms.s3_title' },
  { type: 'h3', key: 'terms.s3_1_title' },
  { type: 'p',  key: 'terms.s3_1_p1' },
  { type: 'h3', key: 'terms.s3_2_title' },
  { type: 'p',  key: 'terms.s3_2_p1' },
  { type: 'ul', items: ['terms.s3_2_li1','terms.s3_2_li2','terms.s3_2_li3'] },
  { type: 'p',  key: 'terms.s3_2_p2' },
  { type: 'h3', key: 'terms.s3_3_title' },
  { type: 'p',  key: 'terms.s3_3_p1' },

  { type: 'h2', key: 'terms.s4_title' },
  { type: 'p',  key: 'terms.s4_p1' },
  { type: 'ul', items: ['terms.s4_li1','terms.s4_li2','terms.s4_li3','terms.s4_li4','terms.s4_li5','terms.s4_li6','terms.s4_li7','terms.s4_li8'] },
  { type: 'p',  key: 'terms.s4_p2' },
  { type: 'h3', key: 'terms.s4_historical_title' },
  { type: 'p',  key: 'terms.s4_historical_p1' },
  { type: 'p',  key: 'terms.s4_historical_p2' },

  { type: 'h2', key: 'terms.s5_title' },
  { type: 'h3', key: 'terms.s5_1_title' },
  { type: 'p',  key: 'terms.s5_1_p1' },
  { type: 'p',  key: 'terms.s5_1_tier_free_title' },
  { type: 'ul', items: ['terms.s5_1_tier_free_li1','terms.s5_1_tier_free_li2'] },
  { type: 'p',  key: 'terms.s5_1_tier_premium_title' },
  { type: 'ul', items: ['terms.s5_1_tier_premium_li1','terms.s5_1_tier_premium_li2','terms.s5_1_tier_premium_li3'] },
  { type: 'p',  key: 'terms.s5_1_tier_pro_title' },
  { type: 'ul', items: ['terms.s5_1_tier_pro_li1','terms.s5_1_tier_pro_li2'] },
  { type: 'h3', key: 'terms.s5_2_title' },
  { type: 'p',  key: 'terms.s5_2_p1' },
  { type: 'p',  key: 'terms.s5_2_p2' },
  { type: 'h3', key: 'terms.s5_3_title' },
  { type: 'p',  key: 'terms.s5_3_p1' },
  { type: 'h3', key: 'terms.s5_4_title' },
  { type: 'ul', items: ['terms.s5_4_li1','terms.s5_4_li2','terms.s5_4_li3'] },
  { type: 'h3', key: 'terms.s5_5_title' },
  { type: 'ul', items: ['terms.s5_5_li1','terms.s5_5_li2','terms.s5_5_li3','terms.s5_5_li4'] },
  { type: 'h3', key: 'terms.s5_6_title' },
  { type: 'p',  key: 'terms.s5_6_p1' },
  { type: 'p',  key: 'terms.s5_6_p2' },
  { type: 'ul', items: ['terms.s5_6_li1','terms.s5_6_li2','terms.s5_6_li3'] },
  { type: 'p',  key: 'terms.s5_6_p3' },
  { type: 'h3', key: 'terms.s5_7_title' },
  { type: 'p',  key: 'terms.s5_7_p1' },
  { type: 'h3', key: 'terms.s5_8_title' },
  { type: 'p',  key: 'terms.s5_8_p1' },

  { type: 'h2', key: 'terms.s6_title' },
  { type: 'h3', key: 'terms.s6_1_title' },
  { type: 'p',  key: 'terms.s6_1_p1' },
  { type: 'ul', items: ['terms.s6_1_li1','terms.s6_1_li2'] },
  { type: 'p',  key: 'terms.s6_1_p2' },
  { type: 'h3', key: 'terms.s6_2_title' },
  { type: 'p',  key: 'terms.s6_2_p1' },
  { type: 'ul', items: ['terms.s6_2_li1','terms.s6_2_li2','terms.s6_2_li3','terms.s6_2_li4'] },
  { type: 'h3', key: 'terms.s6_3_title' },
  { type: 'p',  key: 'terms.s6_3_p1' },
  { type: 'h3', key: 'terms.s6_4_title' },
  { type: 'p',  key: 'terms.s6_4_p1' },

  { type: 'h2', key: 'terms.s7_title' },
  { type: 'h3', key: 'terms.s7_1_title' },
  { type: 'p',  key: 'terms.s7_1_p1' },
  { type: 'h3', key: 'terms.s7_2_title' },
  { type: 'p',  key: 'terms.s7_2_p1' },
  { type: 'h3', key: 'terms.s7_3_title' },
  { type: 'p',  key: 'terms.s7_3_p1' },
  { type: 'p',  key: 'terms.s7_3_p2' },
  { type: 'p',  key: 'terms.s7_3_p3' },
  { type: 'p',  key: 'terms.s7_3_p4' },
  { type: 'h3', key: 'terms.s7_4_title' },
  { type: 'p',  key: 'terms.s7_4_p1' },
  { type: 'ul', items: ['terms.s7_4_li1','terms.s7_4_li2','terms.s7_4_li3'] },
  { type: 'p',  key: 'terms.s7_4_p2' },

  { type: 'h2', key: 'terms.s8_title' },
  { type: 'h3', key: 'terms.s8_1_title' },
  { type: 'p',  key: 'terms.s8_1_p1' },
  { type: 'ul', items: ['terms.s8_1_li1','terms.s8_1_li2','terms.s8_1_li3','terms.s8_1_li4','terms.s8_1_li5'] },
  { type: 'p',  key: 'terms.s8_1_p2' },
  { type: 'h3', key: 'terms.s8_2_title' },
  { type: 'p',  key: 'terms.s8_2_p1' },
  { type: 'ul', items: ['terms.s8_2_li1','terms.s8_2_li2','terms.s8_2_li3','terms.s8_2_li4','terms.s8_2_li5','terms.s8_2_li6'] },
  { type: 'h3', key: 'terms.s8_3_title' },
  { type: 'p',  key: 'terms.s8_3_p1' },

  { type: 'h2', key: 'terms.s9_title' },
  { type: 'p',  key: 'terms.s9_p1' },
  { type: 'ul', items: ['terms.s9_li1','terms.s9_li2','terms.s9_li3','terms.s9_li4','terms.s9_li5','terms.s9_li6','terms.s9_li7','terms.s9_li8','terms.s9_li9'] },
  { type: 'p',  key: 'terms.s9_p2' },

  { type: 'h2', key: 'terms.s10_title' },
  { type: 'p',  key: 'terms.s10_p1' },
  { type: 'ul', items: ['terms.s10_li1','terms.s10_li2','terms.s10_li2b','terms.s10_li2c','terms.s10_li3','terms.s10_li4'] },
  { type: 'p',  key: 'terms.s10_p2' },

  { type: 'h2', key: 'terms.s11_title' },
  { type: 'h3', key: 'terms.s11_1_title' },
  { type: 'p',  key: 'terms.s11_1_p1' },
  { type: 'ul', items: ['terms.s11_1_li1','terms.s11_1_li2','terms.s11_1_li3','terms.s11_1_li4'] },
  { type: 'p',  key: 'terms.s11_1_p2' },
  { type: 'h3', key: 'terms.s11_2_title' },
  { type: 'p',  key: 'terms.s11_2_p1' },
  { type: 'ul', items: ['terms.s11_2_li1','terms.s11_2_li2','terms.s11_2_li3','terms.s11_2_li4'] },
  { type: 'p',  key: 'terms.s11_2_p2' },
  { type: 'h3', key: 'terms.s11_3_title' },
  { type: 'p',  key: 'terms.s11_3_p1' },
  { type: 'ul', items: ['terms.s11_3_li1','terms.s11_3_li2','terms.s11_3_li3'] },
  { type: 'p',  key: 'terms.s11_3_p2' },
  { type: 'ul', items: ['terms.s11_3_li4','terms.s11_3_li5','terms.s11_3_li6'] },

  { type: 'h2', key: 'terms.s12_title' },
  { type: 'p',  key: 'terms.s12_p1' },
  { type: 'ul', items: ['terms.s12_li1','terms.s12_li2','terms.s12_li3','terms.s12_li4'] },

  { type: 'h2', key: 'terms.s13_title' },
  { type: 'h3', key: 'terms.s13_1_title' },
  { type: 'p',  key: 'terms.s13_1_p1' },
  { type: 'ul', items: ['terms.s13_1_li1','terms.s13_1_li3','terms.s13_1_li2'] },
  { type: 'p',  key: 'terms.s13_1_p2' },
  { type: 'h3', key: 'terms.s13_2_title' },
  { type: 'p',  key: 'terms.s13_2_p1' },
  { type: 'ul', items: ['terms.s13_2_li1','terms.s13_2_li2','terms.s13_2_li3','terms.s13_2_li4'] },
  { type: 'p',  key: 'terms.s13_2_p2' },
  { type: 'h3', key: 'terms.s13_3_title' },
  { type: 'p',  key: 'terms.s13_3_p1' },
  { type: 'ul', items: ['terms.s13_3_li1','terms.s13_3_li2','terms.s13_3_li3','terms.s13_3_li4'] },

  { type: 'h2', key: 'terms.s14_title' },
  { type: 'p',  key: 'terms.s14_p1' },
  { type: 'ul', items: ['terms.s14_li1','terms.s14_li2','terms.s14_li3','terms.s14_li4'] },

  { type: 'h2', key: 'terms.s15_title' },
  { type: 'h3', key: 'terms.s15_1_title' },
  { type: 'p',  key: 'terms.s15_1_p1' },
  { type: 'p',  key: 'terms.s15_1_p2' },
  { type: 'h3', key: 'terms.s15_2_title' },
  { type: 'p',  key: 'terms.s15_2_p1' },
  { type: 'p',  key: 'terms.s15_2_p2' },
  { type: 'h3', key: 'terms.s15_3_title' },
  { type: 'p',  key: 'terms.s15_3_p1' },

  { type: 'h2', key: 'terms.s16_title' },
  { type: 'p',  key: 'terms.s16_p1' },

  { type: 'h2', key: 'terms.s17_title' },
  { type: 'p',  key: 'terms.s17_p1' },

  { type: 'h2', key: 'terms.s18_title' },
  { type: 'p',  key: 'terms.s18_p1' },

  { type: 'h2', key: 'terms.s19_title' },
  { type: 'p',  key: 'terms.s19_p1' },

  { type: 'h2', key: 'terms.s20_title' },
  { type: 'p',  key: 'terms.s20_p1' },
  { type: 'p',  key: 'terms.s20_contact_support' },
  { type: 'p',  key: 'terms.s20_contact_legal' },

  { type: 'hr' },
  { type: 'p.footer-note', key: 'terms.footer' },
];

export default function Terms() {
  const t = useT();
  const lang = useLang();
  const home = lang === 'en' ? '/' : `/${lang}/`;
  return (
    <>
      <a href={home} className="back-link" dangerouslySetInnerHTML={{ __html: t('legal.back_link') }}/>
      <h1 dangerouslySetInnerHTML={{ __html: t('terms.heading') }}/>
      <p className="last-updated" dangerouslySetInnerHTML={{ __html: t('legal.last_updated') }}/>
      <p className="effective-date" dangerouslySetInnerHTML={{ __html: t('terms.effective_date') }}/>
      {renderSections(SECTIONS, t)}
    </>
  );
}
