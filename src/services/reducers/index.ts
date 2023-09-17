import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { authReducer } from './auth';
import { feedReducer } from './feed';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
  ingredient: ingredientsReducer,
  modal: modalReducer,
  auth: authReducer,
  feed: feedReducer,
  orders: ordersReducer
}) 
