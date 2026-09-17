import { feedPaths, feedResponse } from '../../lib/blog.js';

export const getStaticPaths = () => feedPaths(['en']);
export const GET = ({ props }) => feedResponse(props.lang);
