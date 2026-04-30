import React from 'react';
import LegalPage from './LegalPage';
import Privacy from './Privacy';

export default function PrivacyPage({ lang = 'en' }) {
  return (
    <LegalPage lang={lang}>
      <Privacy/>
    </LegalPage>
  );
}
