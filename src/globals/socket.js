import SocketIOClient from 'socket.io-client';
import env from './environment';

// let connectionID = null;
// let connectionIDCallback = null;

class Socket {
  constructor() {
    console.log("when this get hit?");
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
    console.log(this.socket._callbacks)
  }

  emit(event, options) {
    console.log(this.socket._callbacks)
    this.socket.emit(event, options);
  }

  // onConnectionID(callback) {
  //   if (connectionID) callback(connectionID);
  //   else connectionIDCallback = callback;
  // }
}

export default new Socket();
