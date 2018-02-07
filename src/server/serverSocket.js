import WebSocket from 'ws';
import cookie from 'cookie';
import { verify } from './utils/jwtUtils';
import envData from 'env-data';

const User = require('mongoose').model('User');

class ServerSocket {
  constructor(server) {
    this._wss = new WebSocket.Server({ server });
    this._wss.on('connection', this._connection);

    WebSocket.prototype.sendJson = function (obj) {
      this.send(JSON.stringify(obj));
    };
  }

  _connection(socket, req) {
    const cookies = cookie.parse(req.headers.cookie);
    const authLoc = cookies['auth.loc'];

    try {
      if (authLoc) {
        verify(authLoc, envData.getData('jwtSecret')).then((decoded) => {
          User.findOne({ _id: decoded }).then((user) => {
            if (user) {
              socket.sendJson({ status: 200, data: { message: 'connected' } });

              // setInterval(() => {
              //   socket.sendJson({ status: 200, data: { type: 'incrementUncheckedCount' } });
              // }, 10000);
            }
          });
        });
      } else socket.sendJson({ status: 400, data: { error: 'not authorized' } });
    } catch (err) {
      socket.sendJson({ status: 400, data: { error: 'not authorized' } });
    }
  }
}

export default ServerSocket;
