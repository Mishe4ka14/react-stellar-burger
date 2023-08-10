import { combineReducers } from 'redux';
import { ingredientsReducer, constructorReducer } from './ingredients';
import { modalReducer } from './modal';


export const rootReducer = combineReducers({
  ingredient: ingredientsReducer,
  modal: modalReducer,
}) 