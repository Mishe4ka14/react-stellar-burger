import { createSlice } from '@reduxjs/toolkit'
import { WebsocketStatus } from "../../utils/ws-status";
import { wsConnecting, wsClose, wsError, wsMessage, wsOpen } from "../actions/feed";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  message: [],
  total: null,
  totalToday: null,
  connectingError: '',
}

export const feedSlice = createSlice({
  name: 'feed',
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


export const { actions: feedActions, reducer: feedReducer } = feedSlice;