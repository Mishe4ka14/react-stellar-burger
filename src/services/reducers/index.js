import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { openIngredientModal } from '../actions/modal';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
  ingredient: ingredientsReducer,
  modal: modalReducer
}) 