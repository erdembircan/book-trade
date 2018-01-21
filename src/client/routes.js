import loadable from 'loadable-components';

export const HomePage = loadable(() => import('./containers/HomePage'));
export const Contact = loadable(() => import('./containers/Contact'));
export const SignUp = loadable(() => import('./containers/SignUp'));
export const LogIn = loadable(()=> import('./containers/LogIn'));
