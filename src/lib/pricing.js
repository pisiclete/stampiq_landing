export const STAMPIQ_PRICING = {
  CH: { country: 'Switzerland', flag: '🇨🇭', currency: 'CHF', currencyPos: 'before',
        premium_monthly: '10.90', premium_yearly: '109.00',
        pro_monthly: '32.90', pro_yearly: '329.90' },
  DE: { country: 'Germany', flag: '🇩🇪', currency: 'EUR', currencyPos: 'after',
        premium_monthly: '9,99', premium_yearly: '99,99',
        pro_monthly: '29,99', pro_yearly: '299,99' },
  AT: { country: 'Austria', flag: '🇦🇹', currency: 'EUR', currencyPos: 'after',
        premium_monthly: '9,99', premium_yearly: '99,99',
        pro_monthly: '29,99', pro_yearly: '299,99' },
  LI: { country: 'Liechtenstein', flag: '🇱🇮', currency: 'CHF', currencyPos: 'before',
        premium_monthly: '10.90', premium_yearly: '109.00',
        pro_monthly: '32.90', pro_yearly: '329.90' },
  NL: { country: 'Netherlands', flag: '🇳🇱', currency: 'EUR', currencyPos: 'after',
        premium_monthly: '9,99', premium_yearly: '99,99',
        pro_monthly: '29,99', pro_yearly: '299,99' },
  PL: { country: 'Poland', flag: '🇵🇱', currency: 'PLN', currencyPos: 'after',
        premium_monthly: '34.99', premium_yearly: '349.99',
        pro_monthly: '119.99', pro_yearly: '1199.99' },
};

export const STAMPIQ_DEFAULT_COUNTRY = 'DE';

export function detectCountry() {
  if (typeof window === 'undefined') return STAMPIQ_DEFAULT_COUNTRY;
  const stored = localStorage.getItem('siq_country');
  if (stored && STAMPIQ_PRICING[stored]) return stored;
  const langs = navigator.languages || [navigator.language];
  for (const l of langs) {
    const region = (l.split('-')[1] || '').toUpperCase();
    if (STAMPIQ_PRICING[region]) return region;
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzMap = {
      'Europe/Zurich': 'CH', 'Europe/Berlin': 'DE', 'Europe/Vienna': 'AT',
      'Europe/Vaduz': 'LI', 'Europe/Amsterdam': 'NL', 'Europe/Warsaw': 'PL',
    };
    if (tzMap[tz]) return tzMap[tz];
  } catch (e) {}
  return STAMPIQ_DEFAULT_COUNTRY;
}
