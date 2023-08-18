import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware/socket-middleware";
import {rootReducer } from "./reducers/index"; 
import { 
  connect as feedConnect, 
  disconnect as feedDisconnect, 
  wsClose as feedWsClose, 
  wsConnecting as feedWsConnecting, 
  wsError as feedWsError, 
  wsMessage as feedWsMessage, 
  wsOpen as feedWsOpen
} from './actions/feed';

import { 
  connect as orderConnect, 
  disconnect as orderDisconnect, 
  wsClose as orderWsClose, 
  wsConnecting as orderWsConnecting, 
  wsError as orderWsError, 
  wsMessage as orderWsMessage, 
  wsOpen as orderWsOpen
} from './actions/feed';

const feedMiddleware = socketMiddleware({
  wsConnect: feedConnect,
  wsDisconnect: feedDisconnect,
  wsConnecting: feedWsConnecting,
  onOpen: feedWsOpen,
  onClose: feedWsClose,
  onError: feedWsError,
  onMessage: feedWsMessage,
});


const ordersMiddleware = socketMiddleware({
  wsConnect: orderConnect,
  wsDisconnect: orderDisconnect,
  wsConnecting: orderWsConnecting,
  onOpen: orderWsOpen,
  onClose: orderWsClose,
  onError: orderWsError,
  onMessage: orderWsMessage,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware)
  });