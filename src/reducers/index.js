import { combineReducers } from 'redux'
import {listReducers} from './listdata'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
  }

const reducer = combineReducers({
    listReducers:listReducers
})  
const persistedReducer = persistReducer(persistConfig, reducer)

export default persistedReducer