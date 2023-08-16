import { combineReducers } from 'redux';
import { ingredientsReducer, constructorReducer } from './ingredients';
import { modalReducer } from './modal';
import { authReducer } from './auth';


export const rootReducer = combineReducers({
  ingredient: ingredientsReducer,
  modal: modalReducer,
  auth: authReducer,
}) 