export const listReducers = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'OPENING_WEBSOCKET':
        return state
      case 'WEBSOCKET_OPENED':
        return state
      case 'WEBSOCKET_INFO':
        let newInfo = state.Info.map((item) =>{ if(Object.keys(item)[0] === Object.keys(action.data)[0]){ 
          return {[Object.keys(item)[0]]:{
            amount: action.data[Object.keys(item)[0]].amount,
            count: action.data[Object.keys(item)[0]].count,
            totalPrice: action.data[Object.keys(item)[0]].price+item[Object.keys(item)[0]].price,
            price:action.data[Object.keys(item)[0]].price
            }};
        }
        else
        {
          return item;
        }
      })
        return  {
          ...state,
          Info:newInfo,
        }
      case 'WEBSOCKET_INFO_LIST':
        return  {
          ...state,
          Info:action.data,
        }
      case 'ERROR_OPENING_WEBSOCKET':
        return state
      default:
        return state  
    }
}