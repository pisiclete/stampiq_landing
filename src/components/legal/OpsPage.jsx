// StampIQ — wrapper for the Ops Cockpit pages: the legal chrome, English only.
import React from 'react';
import LegalPage from './LegalPage';
import OpsCockpit from './OpsCockpit';
import OpsPrivacy from './OpsPrivacy';
import OpsTerms from './OpsTerms';

const BODIES = { index: OpsCockpit, privacy: OpsPrivacy, terms: OpsTerms };

export default function OpsPage({ page }) {
  const Body = BODIES[page];
  return (
    <LegalPage lang="en">
      <Body/>
    </LegalPage>
  );
}
