// Shared renderer used by Privacy/Terms/DeleteAccount.
// Each section node maps to a JSX element via the `type` field. Content comes
// from translations via t(key). Embedded HTML in translations (tables, links,
// <strong>) is rendered via dangerouslySetInnerHTML.
import React from 'react';

export function renderSections(sections, t) {
  return sections.map((s, i) => {
    const html = (key) => ({ __html: t(key) });
    if (s.type === 'h2')   return <h2 key={i} dangerouslySetInnerHTML={html(s.key)}/>;
    if (s.type === 'h3')   return <h3 key={i} dangerouslySetInnerHTML={html(s.key)}/>;
    if (s.type === 'p')    return <p key={i} dangerouslySetInnerHTML={html(s.key)}/>;
    if (s.type === 'p.last-updated')   return <p key={i} className="last-updated" dangerouslySetInnerHTML={html(s.key)}/>;
    if (s.type === 'p.effective-date') return <p key={i} className="effective-date" dangerouslySetInnerHTML={html(s.key)}/>;
    if (s.type === 'p.footer-note')    return <p key={i} className="footer-note" dangerouslySetInnerHTML={html(s.key)}/>;
    if (s.type === 'table')return <div key={i} dangerouslySetInnerHTML={html(s.key)}/>;
    if (s.type === 'hr')   return <hr key={i}/>;
    if (s.type === 'ul')   return (
      <ul key={i}>
        {s.items.map((k, j) => <li key={j} dangerouslySetInnerHTML={html(k)}/>)}
      </ul>
    );
    return null;
  });
}
