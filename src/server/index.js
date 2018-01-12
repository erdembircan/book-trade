import Server from './server';
import minimist from 'minimist';
import config from './config';
import envSelector from './utils/envSelector';
import path from 'path';

envSelector.setParams({
  production: path.resolve(__dirname, './sData'),
  development: path.resolve(__dirname, './config'),
});

const parsedArgs = minimist(process.argv, {
  default: {
    'server-port': config.developmentServerPort,
  },
});

const server = new Server(process.env.PORT || parsedArgs['server-port']);

server.listen();
