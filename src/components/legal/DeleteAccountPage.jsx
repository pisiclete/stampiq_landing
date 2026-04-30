import React from 'react';
import LegalPage from './LegalPage';
import DeleteAccount from './DeleteAccount';

export default function DeleteAccountPage({ lang = 'en' }) {
  return (
    <LegalPage lang={lang}>
      <DeleteAccount/>
    </LegalPage>
  );
}
