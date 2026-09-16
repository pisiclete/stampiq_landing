// React parts of the blog pages. The page body itself is static Astro markup.
import React from 'react';
import { I18nProvider } from '../../i18n/I18nContext';
import { Header, Footer } from '../chrome';
import { FinalCTA } from '../cta';
import { AnnouncementBar } from '../events';
import { StoreBadges } from '../components';

export const BlogHeader = ({ lang, alternates }) => (
  <I18nProvider lang={lang} alternates={alternates}>
    <AnnouncementBar/>
    <Header/>
  </I18nProvider>
);

export const BlogFooter = ({ lang }) => (
  <I18nProvider lang={lang}>
    <FinalCTA/>
    <Footer/>
  </I18nProvider>
);

export const BlogStoreBadges = ({ lang }) => (
  <I18nProvider lang={lang}>
    <StoreBadges/>
  </I18nProvider>
);
