// StampIQ — public description of the Ops Cockpit, the internal tool audited by
// Google for its YouTube API use. English only, not part of the app's i18n.
import React from 'react';

export default function OpsCockpit() {
  return (
    <>
      <h1>StampIQ Ops Cockpit</h1>
      <p>Last updated: September 22, 2026</p>

      <h2>What it is</h2>
      <p>
        The Ops Cockpit is the internal tool that runs StampIQ's marketing work. It holds the marketing calendar, the
        outreach threads, the newsletters and the social posts. One person uses it: Marius, who runs StampIQ and owns
        every account it posts to. It has no sign-up, no public pages and no users beyond that.
      </p>

      <h2>What it does with YouTube</h2>
      <p>
        A social post is written in the cockpit with its video, its title and its description in eleven languages.
        When it is published, the cockpit uploads the video to StampIQ's own YouTube channel through the YouTube Data
        API and stores the id and the URL the API returns. It reads nothing else, shows no YouTube content to anyone
        and touches no other channel.
      </p>
      <p>
        The channel: <a href="https://www.youtube.com/@stampiq_app">YouTube @stampiq_app</a>
      </p>

      <h2>Documents</h2>
      <p>
        <a href="/ops/privacy.html">Ops Cockpit privacy policy</a>
        <br/>
        <a href="/ops/terms.html">Ops Cockpit terms of use</a>
      </p>
      <p>
        The StampIQ app has its own <a href="/privacy.html">privacy policy</a> and{' '}
        <a href="/terms.html">terms of service</a>. Those cover the app. The two documents above cover this tool.
      </p>

      <h2>Contact</h2>
      <p>
        StampIQ, Chamerstrasse 70, 6300 Zug, Switzerland
        <br/>
        <a href="mailto:marius@stampiq.io">marius@stampiq.io</a>
      </p>
    </>
  );
}
