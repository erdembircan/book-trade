import loadable from 'loadable-components';

export const HomePage = loadable(() => import('./containers/HomePage'));
export const Contact = loadable(() => import('./containers/Contact'));
export const Counter = loadable(() => import('./containers/Counter'));
