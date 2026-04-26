// StampIQ post-launch landing — pricing data
// Replace placeholder values with real numbers when ready.
// Currency codes follow ISO 4217. Amounts are display strings (already formatted).

window.STAMPIQ_PRICING = {
  CH: { country: 'Switzerland', flag: '🇨🇭', currency: 'CHF', currencyPos: 'before',
        premium_monthly: '4.90', premium_yearly: '39.00',
        pro_monthly: '9.90', pro_yearly: '79.00' },
  DE: { country: 'Germany', flag: '🇩🇪', currency: 'EUR', currencyPos: 'after',
        premium_monthly: '4,99', premium_yearly: '39,99',
        pro_monthly: '9,99', pro_yearly: '79,99' },
  AT: { country: 'Austria', flag: '🇦🇹', currency: 'EUR', currencyPos: 'after',
        premium_monthly: '4,99', premium_yearly: '39,99',
        pro_monthly: '9,99', pro_yearly: '79,99' },
  LI: { country: 'Liechtenstein', flag: '🇱🇮', currency: 'CHF', currencyPos: 'before',
        premium_monthly: '4.90', premium_yearly: '39.00',
        pro_monthly: '9.90', pro_yearly: '79.00' },
  NL: { country: 'Netherlands', flag: '🇳🇱', currency: 'EUR', currencyPos: 'after',
        premium_monthly: '4,99', premium_yearly: '39,99',
        pro_monthly: '9,99', pro_yearly: '79,99' },
  PL: { country: 'Poland', flag: '🇵🇱', currency: 'PLN', currencyPos: 'after',
        premium_monthly: '19,99', premium_yearly: '159,99',
        pro_monthly: '39,99', pro_yearly: '319,99' },
};
window.STAMPIQ_DEFAULT_COUNTRY = 'DE'; // fallback for visitors outside the 6 supported markets

// Country detection cascade
window.detectCountry = function() {
  // 1. localStorage override
  const stored = localStorage.getItem('siq_country');
  if (stored && window.STAMPIQ_PRICING[stored]) return stored;

  // 2. navigator.language(s)
  const langs = navigator.languages || [navigator.language];
  for (const l of langs) {
    const region = (l.split('-')[1] || '').toUpperCase();
    if (window.STAMPIQ_PRICING[region]) return region;
  }

  // 3. timezone fallback
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzMap = {
      'Europe/Zurich': 'CH', 'Europe/Berlin': 'DE', 'Europe/Vienna': 'AT',
      'Europe/Vaduz': 'LI', 'Europe/Amsterdam': 'NL', 'Europe/Warsaw': 'PL',
    };
    if (tzMap[tz]) return tzMap[tz];
  } catch (e) {}

  return window.STAMPIQ_DEFAULT_COUNTRY;
};

window.formatPrice = function(country, amount) {
  const c = window.STAMPIQ_PRICING[country];
  if (!c) return amount;
  return c.currencyPos === 'before' ? `${c.currency} ${amount}` : `${amount} ${c.currency}`;
};
