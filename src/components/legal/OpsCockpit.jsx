// StampIQ — public description of the Ops Cockpit, the internal tool audited by
// Google for its YouTube API use. English only, not part of the app's i18n.
import React from 'react';

export default function OpsCockpit() {
  return (
    <>
      <h1>StampIQ Ops Cockpit</h1>
      <p>Last updated: September 22, 2026</p>

      <h2>1. What the Tool Is</h2>
      <p>
        The StampIQ Ops Cockpit (the “Tool”) is the internal operations application of StampIQ, operated by Marius
        Dygudaj, Zug, Switzerland. It holds the marketing calendar, the outreach records, the newsletters and the
        social posts of StampIQ. It is available at ops.stampiq.io.
      </p>
      <p>
        The Tool is not offered to the public. It has no registration and no customer accounts, and access is
        restricted to the operator of StampIQ, who is also the owner of the accounts the Tool publishes to.
      </p>

      <h2>2. Use of YouTube API Services</h2>
      <p>
        A social post is prepared in the Tool with its video, its title and its description in the languages StampIQ
        publishes in. On publication, the Tool uploads the video to the StampIQ YouTube channel through YouTube API
        Services and records the video identifier and the URL returned by the API.
      </p>
      <p>
        The Tool reads no other data from those services, displays no YouTube content to any third party, and accesses
        no channel other than the one below.
      </p>
      <p>
        Channel: <a href="https://www.youtube.com/@stampiq_app">YouTube @stampiq_app</a>
      </p>

      <h2>3. Legal Documents</h2>
      <p>
        <a href="/ops/privacy.html">Ops Cockpit Privacy Policy</a>
        <br/>
        <a href="/ops/terms.html">Ops Cockpit Terms of Use</a>
      </p>
      <p>
        The StampIQ mobile and web applications used by our customers are governed by the separate{' '}
        <a href="/privacy.html">StampIQ Privacy Policy</a> and <a href="/terms.html">StampIQ Terms of Service</a>.
      </p>

      <h2>4. Contact Us</h2>
      <p>
        StampIQ, Chamerstrasse 70, 6300 Zug, Switzerland
        <br/>Email: <a href="mailto:marius@stampiq.io">marius@stampiq.io</a>
      </p>
    </>
  );
}
