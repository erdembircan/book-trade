import WebSocket from 'ws';
import cookie from 'cookie';
import { verify } from './utils/jwtUtils';
import envData from 'env-data';

const User = require('mongoose').model('User');

class ServerSocket {
  constructor(server) {
    this._wss = null;
    // this._wss = new WebSocket.Server({ server });
    // this._wss.on('connection', this._connection);

    // WebSocket.prototype.sendJson = function (obj) {
    //   this.send(JSON.stringify(obj));
    // };
  }

  init(server) {
    this._wss = new WebSocket.Server({ server });
    this._wss.on('connection', this._connection);
    WebSocket.prototype.sendJson = function (obj) {
      this.send(JSON.stringify(obj));
    };
  }

  broadcast(data, recipients) {
    if (!recipients.push) recipients = [recipients];

    this._wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        if (recipients.indexOf(client.userName) >= 0) {
          try {
            client.sendJson(data);
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  }

  _connection(socket, req) {
    const cookies = cookie.parse(req.headers.cookie);
    const authLoc = cookies['auth.loc'];

    try {
      if (authLoc) {
        verify(authLoc, envData.getData('jwtSecret')).then((decoded) => {
          User.findOne({ _id: decoded }).then((user) => {
            if (user) {
              socket.userName = user.name;
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

export default new ServerSocket();
