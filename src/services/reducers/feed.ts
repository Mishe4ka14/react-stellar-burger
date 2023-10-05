import { createReducer } from '@reduxjs/toolkit'
import { WebsocketStatus } from "../../utils/ws-status";
import { wsConnecting, wsClose, wsError, wsMessage, wsOpen } from "../actions/feed";
import { TOrder } from '../types/types';

type TFeedState = {
  status: string;
  message: Array<TOrder>;
  total: null | number;
  totalToday: null | number;
  connectingError: string;
}

const initialState: TFeedState = {
  status: WebsocketStatus.OFFLINE,
  message: [],
  total: null,
  totalToday: null,
  connectingError: '',
}

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
        state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
        state.message = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
    });
});