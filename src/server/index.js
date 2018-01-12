import Server from './server';
import minimist from 'minimist';
import config from './config';

const parsedArgs = minimist(process.argv, {
  default: {
    'server-port': config.developmentServerPort,
  },
});

const envMode = process.env.NODE_ENV;

const server = new Server(process.env.PORT || parsedArgs['server-port']);

server.listen();
