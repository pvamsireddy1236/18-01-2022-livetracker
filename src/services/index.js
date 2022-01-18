export const startWebsocketConnection = () => {
    return new Promise((resolve, reject) => {
      try {
        let W3CWebSocket = require('websocket').w3cwebsocket;
        let client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2');
        return resolve(client)
      } catch (error) {
        return reject(error)
      }
    })
  }