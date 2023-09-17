import { getOrderNumber } from "../../utils/burger-api";
import { TIngredient, TOrder } from "../types/data";
import { openOrderModal } from "./modal";

export const GET_CONSTRUCTOR_REQUEST:'GET_CONSTRUCTOR_REQUEST' = 'GET_CONSTRUCTOR_REQUEST';
export const GET_CONSTRUCTOR_SUCCESS:'GET_CONSTRUCTOR_SUCCESS' = 'GET_CONSTRUCTOR_SUCCESS';
export const GET_CONSTRUCTOR_FAILED:'GET_CONSTRUCTOR_FAILED' = 'GET_CONSTRUCTOR_FAILED';
export const ADD_INGREDIENT:'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT:'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const CHANGE_INGREDIENT:'CHANGE_INGREDIENT' = 'CHANGE_INGREDIENT';

export interface IGetConstructorAction {
  readonly type: typeof GET_CONSTRUCTOR_REQUEST;
}

export interface IGetConstructorFailed {
  readonly type: typeof GET_CONSTRUCTOR_FAILED;
}

export interface IGetConstructorSuccess {
  readonly type: typeof GET_CONSTRUCTOR_SUCCESS;
  readonly order: TOrder
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly ingredient: TIngredient
}

export interface IChangeIngredients {
  readonly type: typeof CHANGE_INGREDIENT;
  readonly fromIndex: number;
  readonly toIndex: number
}

export type TConstructorActions =
  | IGetConstructorAction
  | IGetConstructorFailed
  | IGetConstructorSuccess
  | IAddIngredient
  | IRemoveIngredient
  | IChangeIngredients;

export const addIngredient = (ingredient: TIngredient) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient,
})

export const removeIngredient = (ingredient: TIngredient) => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient
})

export const changeIngedients = (fromIndex:number, toIndex:number) => ({
  type: CHANGE_INGREDIENT,
  fromIndex: fromIndex,
  toIndex: toIndex
});

export const getOrder = (ID: Array<string>) => {
  return function(dispatch) {
    dispatch({
      type: GET_CONSTRUCTOR_REQUEST,
    });

    try {
      return getOrderNumber(ID)
        .then(res => {
          if (res && res.success) {
            dispatch({
              type: GET_CONSTRUCTOR_SUCCESS,
              order: res.order.number,
            });
            dispatch(openOrderModal(res.order));
          } else {
            dispatch({
              type: GET_CONSTRUCTOR_FAILED,
            });
          }
        })
        .catch(error => {
          dispatch({
            type: GET_CONSTRUCTOR_FAILED,
          });
          console.error("Error: ", error.message);
        });
    } catch (error) {
      if (error instanceof Error) { // Проверка типа
        dispatch({
          type: GET_CONSTRUCTOR_FAILED,
        });
        console.log("Error: ", error.message);
      }
    }  
  };
};