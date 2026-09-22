// StampIQ — privacy policy of the Ops Cockpit. Covers the internal tool and its
// YouTube API use, not the StampIQ app. English only.
import React from 'react';

export default function OpsPrivacy() {
  return (
    <>
      <h1>Ops Cockpit Privacy Policy</h1>
      <p>Last updated: September 22, 2026</p>
      <p>Effective date: September 22, 2026</p>

      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy explains how StampIQ, operated by Marius Dygudaj, Zug, Switzerland, collects, uses, stores,
        and protects data in connection with the StampIQ Ops Cockpit (the “Tool”), the internal operations application
        available at ops.stampiq.io.
      </p>
      <p>
        We process this data in accordance with the Swiss Federal Act on Data Protection (FADP/nDSG) and the EU General
        Data Protection Regulation (GDPR).
      </p>
      <p>
        <strong>Data Controller:</strong>
        <br/>Marius Dygudaj
        <br/>StampIQ, Chamerstrasse 70, 6300 Zug, Switzerland
        <br/>Email: <a href="mailto:marius@stampiq.io">marius@stampiq.io</a>
      </p>

      <h2>2. Scope</h2>
      <p>
        This Privacy Policy applies to the Tool only. The StampIQ mobile and web applications used by our customers are
        governed by the separate <a href="/privacy.html">StampIQ Privacy Policy</a>.
      </p>
      <p>
        The Tool is an internal application. It has no public interface, no registration and no customer accounts.
        Access is limited to the operator of StampIQ, who is also the owner of the accounts the Tool publishes to. It
        processes no personal data of users of the StampIQ App and no personal data of members of the public.
      </p>

      <h2>3. YouTube API Services</h2>
      <p>
        The Tool uses YouTube API Services to upload videos to the StampIQ YouTube channel. By using the Tool, you
        agree to be bound by the <a href="https://www.youtube.com/t/terms">YouTube Terms of Service</a>.
      </p>
      <p>
        Data processed by Google in connection with those services is subject to the{' '}
        <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
      </p>

      <h2>4. Data We Collect</h2>
      <p>The Tool stores the following data when it is connected to the StampIQ Google account:</p>
      <ul>
        <li>An OAuth 2.0 refresh token issued by Google for that account</li>
        <li>The identifier and the handle of the YouTube channel the account owns</li>
        <li>For each video the Tool has uploaded, the video identifier and its URL</li>
      </ul>
      <p>
        The Tool requests two scopes: permission to upload a video to the account, and read access to the account's own
        channel in order to confirm that the correct channel is connected. It collects no viewer data, no comment data,
        no analytics data and no data concerning any other channel.
      </p>

      <h2>5. How We Use the Data</h2>
      <p>
        The refresh token is exchanged for a short-lived access token each time a video is uploaded. The channel
        identifier and handle are shown in the Tool so that the operator can verify the connected channel. The video
        identifier and URL are stored so that a published video can be opened from the post it belongs to. The data is
        used for no other purpose.
      </p>

      <h2>6. How We Share the Data</h2>
      <p>
        The data is not sold, rented or disclosed to third parties. It is transmitted only to Google, in the requests
        the Tool makes to YouTube API Services.
      </p>

      <h2>7. Data Storage and Security</h2>
      <p>
        The data is stored in the Tool's database on infrastructure operated by StampIQ within the European Union.
        Access to the Tool is restricted at the network edge to a single authenticated identity, and the Tool holds no
        long-lived access token.
      </p>

      <h2>8. Data Retention and Deletion</h2>
      <p>
        Disconnecting the YouTube account in the Tool deletes the stored refresh token, the channel identifier and the
        channel handle. Deleting a post deletes the video identifier and the URL stored with it.
      </p>
      <p>
        Authorisation can be withdrawn at any time from the Google account security settings at{' '}
        <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>, which revokes the
        refresh token and prevents any further access by the Tool.
      </p>
      <p>
        Videos already published to the channel remain under the control of the channel owner and are managed in
        YouTube Studio.
      </p>

      <h2>9. Your Rights</h2>
      <p>
        Under the GDPR and the Swiss FADP you have the right of access, rectification, erasure, restriction, data
        portability and objection in respect of personal data we hold about you. Requests are made to{' '}
        <a href="mailto:marius@stampiq.io">marius@stampiq.io</a> and are answered within 30 days. You also have the
        right to lodge a complaint with a supervisory authority.
      </p>

      <h2>10. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy. The date at the top of this page states when it was last changed.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        StampIQ, Chamerstrasse 70, 6300 Zug, Switzerland
        <br/>Email: <a href="mailto:marius@stampiq.io">marius@stampiq.io</a>
      </p>
    </>
  );
}
