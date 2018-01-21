import envData from 'env-data';
import minimist from 'minimist';
import path from 'path';
import Server from './server';
import { connect } from './models';

global.navigator = { userAgent: 'all' };

envData.setParameters({
  development: path.resolve(__dirname, '../../src/server/config/index.js'),
  production: path.resolve(__dirname, '../../src/server/sData/index.js'),
});

const parsedArgs = minimist(process.argv, {
  default: {
    serverPort: envData.getData('serverPort'),
  },
});

connect(envData.getData('mongoDb'));

const server = new Server(process.env.PORT || parsedArgs.serverPort);

server.listen();
