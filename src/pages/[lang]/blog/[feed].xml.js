import { feedPaths, feedResponse } from '../../../lib/blog.js';
import { BLOG_LANGS } from '../../../i18n/langs.mjs';

export const getStaticPaths = () => feedPaths(BLOG_LANGS.filter((lang) => lang !== 'en'));
export const GET = ({ props }) => feedResponse(props.lang);
