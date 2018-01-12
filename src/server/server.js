import express from 'express';
import compression from 'compression';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import zlib from 'zlib';
import mainRoute from './routes';

const compress = compression({
  flush: zlib.Z_PARTIAL_FLUSH,
});

export default class Server {
  constructor(port) {
    this._app = express();
    this._app.set('port', port);
    this._app.use(compress);

    this._app.use(bodyParser.urlencoded({ extended: false }));

    this._app.use(mainRoute);

    this._app.use((err, req, res, next) => {
      res.status(500).send(`An error occured: ${err}`);
    });
  }

  listen() {
    const port = this._app.get('port');
    this._app.listen(port, () => {
      console.log(`${chalk.bgBlue.bold('[SERVER]:')} 🌍  Server started on port: ${port}`);
    });
  }
}
