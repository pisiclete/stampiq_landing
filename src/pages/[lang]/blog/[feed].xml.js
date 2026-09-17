import { feedPaths, feedResponse } from '../../../lib/blog.js';

export const getStaticPaths = () => feedPaths(['de', 'fr', 'it', 'nl', 'pl']);
export const GET = ({ props }) => feedResponse(props.lang);
