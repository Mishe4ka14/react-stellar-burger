// import { configureStore } from "@reduxjs/toolkit";
// import { socketMiddleware } from "./middleware/socket-middleware";

// //экшены для ленты всех заказов
// import {
//   connect as FeedWsConnect,
//   disconnect as FeedWsDisconnect,
//   wsOpen as FeedWsOpen,
//   wsClose as FeedWsClose,
//   wsMessage as FeedWsMessage,
//   wsError as FeedWsError,
//   wsConnecting as FeedWsConnecting
// } from "./actions/feed";

// //экшены для заказов в профиле
// import {
//   connect as OrdersWsConnect,
//   disconnect as OrdersWsDisconnect,
//   wsOpen as OrdersWsOpen,
//   wsClose as OrdersWsClose,
//   wsMessage as OrdersWsMessage,
//   wsError as OrdersWsError,
//   wsConnecting as OrdersdWsConnecting
// } from "./actions/orders";
// import { rootReducer } from "./reducers";

// //два отдельных мидлвара для каждого процесса
// const FeedMiddleware = socketMiddleware({
//   wsConnect: FeedWsConnect,
//   wsDisconnect: FeedWsDisconnect,
//   wsConnecting: FeedWsConnecting,
//   onOpen: FeedWsOpen,
//   onClose: FeedWsClose,
//   onError: FeedWsError,
//   onMessage: FeedWsMessage,
// })

// const OrdersMiddleware = socketMiddleware({
//   wsConnect: OrdersWsConnect,
//   wsDisconnect: OrdersWsDisconnect,
//   wsConnecting: OrdersdWsConnecting,
//   onOpen: OrdersWsOpen,
//   onClose: OrdersWsClose,
//   onError: OrdersWsError,
//   onMessage:OrdersWsMessage,
// })

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(FeedMiddleware, OrdersMiddleware);
//   }
// });

import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware/socket-middleware";
import { ordersActions } from "./reducers/orders";
import { feedActions } from "./actions/feed";
import {rootReducer } from "./reducers/index"; // Подключение корневого редюсера
import { feedReducer } from "./actions/feed";
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
// Мидлвары для каждого процесса
// const feedMiddleware = socketMiddleware({
//   wsConnect: feedActions.connect,
//   wsDisconnect: feedActions.disconnect,
//   wsConnecting: feedActions.wsConnecting,
//   onOpen: feedActions.wsOpen,
//   onClose: feedActions.wsClose,
//   onError: feedActions.wsError,
//   onMessage: feedActions.wsMessage,
// });
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