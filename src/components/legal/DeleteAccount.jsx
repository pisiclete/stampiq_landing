// StampIQ — Delete Account form. Submission posts to the public deletion-request API.
import React, { useState } from 'react';
import { useT, useLang } from '../../i18n/I18nContext';
import { renderSections } from './renderSections';

const SECTIONS = [
  { type: 'h2', key: 'delete.what_happens_title' },
  { type: 'p',  key: 'delete.what_happens_intro' },
  { type: 'ul', items: ['delete.what_happens_li1','delete.what_happens_li2','delete.what_happens_li3','delete.what_happens_li4'] },

  { type: 'h2', key: 'delete.data_retained_title' },
  { type: 'p',  key: 'delete.data_retained_intro' },
  { type: 'ul', items: ['delete.data_retained_li1','delete.data_retained_li2'] },
];

function DeleteForm() {
  const t = useT();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  async function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('https://api.stampiq.io/api/v1/auth/account/request-deletion/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="deletion-form">
        <div className="form-message success" dangerouslySetInnerHTML={{ __html: t('delete.success_message') }}/>
      </div>
    );
  }

  return (
    <div className="deletion-form">
      <form onSubmit={onSubmit}>
        <label htmlFor="email" dangerouslySetInnerHTML={{ __html: t('delete.email_label') }}/>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={status === 'submitting'}
        />
        <button type="submit" disabled={status === 'submitting' || !email.trim()}
          dangerouslySetInnerHTML={{ __html: status === 'submitting' ? '...' : t('delete.submit_button') }}/>
      </form>
      {status === 'error' && (
        <div className="form-message error" dangerouslySetInnerHTML={{ __html: t('delete.error_message') }}/>
      )}
    </div>
  );
}

export default function DeleteAccount() {
  const t = useT();
  const lang = useLang();
  const home = lang === 'en' ? '/' : `/${lang}/`;
  return (
    <>
      <a href={home} className="back-link" dangerouslySetInnerHTML={{ __html: t('legal.back_link') }}/>
      <h1 dangerouslySetInnerHTML={{ __html: t('delete.heading') }}/>
      <p dangerouslySetInnerHTML={{ __html: t('delete.intro') }}/>
      {renderSections(SECTIONS, t)}
      <DeleteForm/>
      <p dangerouslySetInnerHTML={{ __html: t('delete.contact_note') }}/>
    </>
  );
}
