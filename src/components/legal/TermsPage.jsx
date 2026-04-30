import React from 'react';
import LegalPage from './LegalPage';
import Terms from './Terms';

export default function TermsPage({ lang = 'en' }) {
  return (
    <LegalPage lang={lang}>
      <Terms/>
    </LegalPage>
  );
}
