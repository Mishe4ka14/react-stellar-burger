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
import { feedActions } from "./reducers/feed";
import {rootReducer } from "./reducers/index"; // Подключение корневого редюсера

// Мидлвары для каждого процесса
const feedMiddleware = socketMiddleware({
  wsConnect: feedActions.connect,
  wsDisconnect: feedActions.disconnect,
  wsConnecting: feedActions.wsConnecting,
  onOpen: feedActions.wsOpen,
  onClose: feedActions.wsClose,
  onError: feedActions.wsError,
  onMessage: feedActions.wsMessage,
});

const ordersMiddleware = socketMiddleware({
  wsConnect: ordersActions.connect,
  wsDisconnect: ordersActions.disconnect,
  wsConnecting: ordersActions.wsConnecting,
  onOpen: ordersActions.wsOpen,
  onClose: ordersActions.wsClose,
  onError: ordersActions.wsError,
  onMessage: ordersActions.wsMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware);
  // },
});