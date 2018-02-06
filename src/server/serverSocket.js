import WebSocket from 'ws';

class ServerSocket {
  constructor(server) {
    this._wss = new WebSocket.Server({ server });
    this._wss.on('connection', this._connection);
  }

  _connection(socket, req) {
    socket.send('welcome');
  }
}

export default ServerSocket;
