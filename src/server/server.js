import express from 'express';
import compression from 'compression';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import zlib from 'zlib';
import mainRoute from './routes';
import envSelector from './utils/envSelector';

const compress = compression({
  flush: zlib.Z_PARTIAL_FLUSH,
});

export default class Server {
  constructor(port) {
    this._app = express();
    this._app.set('port', port);
    this._app.use(compress);

    this._app.use(cookieParser());

    this._app.use(session({
      secret: 'none atm',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    }));

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
