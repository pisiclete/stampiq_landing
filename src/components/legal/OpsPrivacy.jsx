// StampIQ — privacy policy of the Ops Cockpit. Covers the internal tool and its
// YouTube API use, not the StampIQ app. English only.
import React from 'react';

export default function OpsPrivacy() {
  return (
    <>
      <h1>Ops Cockpit Privacy Policy</h1>
      <p>Last updated: September 22, 2026</p>

      <h2>What this covers</h2>
      <p>
        This policy covers the StampIQ Ops Cockpit at ops.stampiq.io, the internal tool described on{' '}
        <a href="/ops/">its page</a>. The StampIQ app is covered by its own{' '}
        <a href="/privacy.html">privacy policy</a>.
      </p>
      <p>
        The tool has one user, Marius, who runs StampIQ. It has no sign-up and is not open to anyone else. It holds no
        data about app users and none about the public.
      </p>

      <h2>YouTube API Services</h2>
      <p>
        The Ops Cockpit uses YouTube API Services to upload videos to StampIQ's own channel. By using the tool you
        agree to be bound by the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a>. Google's{' '}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> applies to the data Google processes.
      </p>

      <h2>What is stored</h2>
      <p>
        Signing the tool in to the StampIQ Google account stores an OAuth refresh token, the channel id and the channel
        handle. Each published video adds the video id and its URL to the post it belongs to. That is everything.
      </p>
      <p>
        The tool requests two scopes: uploading a video to the account, and reading the account's own channel to confirm
        the right one is connected. It reads no viewer data, no comments, no analytics and no data from other channels,
        and it passes nothing to a third party.
      </p>

      <h2>Deleting it</h2>
      <p>
        Disconnecting the YouTube account in the tool deletes the stored token, the channel id and the handle. Deleting
        a post deletes the video id and URL held with it. Access can be withdrawn at any time from the Google account
        at <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>, which stops every
        further upload.
      </p>
      <p>
        Videos already on the channel are managed in YouTube Studio like any other video on it.
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
