import SocketIOClient from 'socket.io-client';
import env from './environment';

class Socket {
  constructor() {
    this.connect = this.connect.bind(this);
    this.on = this.on.bind(this);
    this.emit = this.emit.bind(this);
  }

  connect(token) {
    this.socket = SocketIOClient('http://192.168.1.2:5000', { 
      transports: ['websocket'], 
      jsonp: false,
      query: { token }
    });   
    this.socket.connect(); 
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }

  emit(event, options) {
    this.socket.emit(event, options);
  }
}

export default new Socket();
