import { getOrderNumber } from "../../utils/burger-api";
import { openOrderModal } from "./modal";

export const GET_CONSTRUCTOR_REQUEST = 'GET_CONSTRUCTOR_REQUEST';
export const GET_CONSTRUCTOR_SUCCESS = {
                                        type: 'GET_CONSTRUCTOR_SUCCESS',
                                        order: null
                                        };
export const GET_CONSTRUCTOR_FAILED = 'GET_CONSTRUCTOR_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const CHANGE_INGREDIENT = 'CHANGE_INGREDIENT';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient,
})

export const removeIngredient = (ingredient) => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient
})

export const changeIngedients = (fromIndex, toIndex) => ({
  type: CHANGE_INGREDIENT,
  fromIndex: fromIndex,
  toIndex: toIndex
});

export const getOrder = (ID) => {
  return function(dispatch){
    dispatch({
      type: GET_CONSTRUCTOR_REQUEST
    });
    getOrderNumber(ID).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_CONSTRUCTOR_SUCCESS,
          order: res.order.number
        });
        dispatch(openOrderModal(res.order))
      } else {
        dispatch({
          type: GET_CONSTRUCTOR_FAILED
        });
      }
    });
}
}
