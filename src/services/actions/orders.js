import { createAction } from "@reduxjs/toolkit";

export const connect = createAction('orders/conenct');
export const disconnect = createAction('orders/disconnect');
export const wsConnecting = createAction('orders/wsConnecting');
export const wsOpen = createAction('orders/wsOpen');
export const wsClose = createAction('orders/wsClose');
export const wsMessage = createAction('orders/wsMessage');
export const wsError = createAction('orders/wsError');