import { startWebsocketConnection } from '../services'


export const openingWebsocket = () => {
    return {
      type: 'OPENING_WEBSOCKET'
    }
  }
export const websocketOpened = () => {
    return {
      type: 'WEBSOCKET_OPENED'
    }
  }  
export const websocketInfo = (data) => {
    return {
      type: 'WEBSOCKET_INFO',
      data:data,
    }
  }  
export const websocketInfoList = (data) => {
    return {
      type: 'WEBSOCKET_INFO_LIST',
      data:data,
    }
  }  
export const errorOpeningWebsocket = (errorMessage) => {
    return {
      type: 'ERROR_OPENING_WEBSOCKET',
      errorMessage
    }
  }  

export function openChatWebSocket(props) {
  console.log('pros',props);
  return dispatch => {
    dispatch(openingWebsocket())
      return startWebsocketConnection()
        .then(client => {
          dispatch(websocketOpened())
          client.onerror = function () {
            console.log('Connection Error');
          };
  
          client.onopen = function () {
            console.log('WebSocket Client Connected');

            client.send(JSON.stringify({
                "event": "subscribe", 
                "channel": "book", 
                "symbol": "tBTCUSD"
                }));

          };
  
          client.onclose = function () {
            console.log('echo-protocol Client Closed');
          };
  
          client.onmessage = function (e) {
            if (typeof e.data === 'string') {
              let message = JSON.parse(e.data)
              if(message.event == 'info' || message.event == 'subscribed' )
              {
                console.log('message received');
              }
              else
              {
                //console.log('message',message);
                if(typeof message[1] === 'string')
                {
                  console.log('type displayed');
                }
                else if(Array.isArray(message[1]) && message[1].length === 50)
                {
                  let arr = message[1].map((item)=> { return {[item[0]]:{'amount':item[0],'count':item[1],'price':item[2],'totalPrice':item[2]}};});
                  dispatch(websocketInfoList(arr))
                }
                else
                {
                  let data = message[1];
                  let arr = {[data[0]]:{'amount':data[0],'count':data[1],'price':data[2],'totalPrice':data[2]}};
                  dispatch(websocketInfo(arr))
                }

              }

            }
          };
        })
        .catch(error => '')
    }
  }