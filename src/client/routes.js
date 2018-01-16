import loadable from 'loadable-components';

export const HomePage = loadable(() => import('./components/HomePage'));
export const Contact = loadable(() => import('./components/Contact'));
export const Counter = loadable(() => import('./components/Counter'));
