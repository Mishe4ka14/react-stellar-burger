import { createSlice } from '@reduxjs/toolkit'
import { WebsocketStatus } from "../../utils/ws-status";
import { wsConnecting, wsClose, wsError, wsMessage, wsOpen } from "../actions/orders";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  message: [],
  total: null,
  totalToday: null,
  connectingError: '',
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
      })
      .addCase(wsError, (state, action) => {
        state.connectingError = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.message = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
});

export const { actions: ordersActions, reducer: ordersReducer } = ordersSlice;
