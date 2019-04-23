import SocketIOClient from 'socket.io-client';
import env from './environment';

// let connectionID = null;
// let connectionIDCallback = null;

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
    console.log('emit');
    this.socket.emit(event, options);
  }

  // onConnectionID(callback) {
  //   if (connectionID) callback(connectionID);
  //   else connectionIDCallback = callback;
  // }
}

export default new Socket();
