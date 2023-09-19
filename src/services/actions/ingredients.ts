import { getIngredientsRequest } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { IIngredientResponse } from "../types/api";
import { TIngredient } from "../types/types";

export const GET_INGREDIENTS_REQUEST:'GET_INGREDIENTS_REQUEST'  = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED:'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

//типизация экшенов

export interface IGetIngredientAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredient: TIngredient[];
}

// Объединяем в Union
export type TIngredientActions = 
  | IGetIngredientAction
  | IGetIngredientFailedAction
  | IGetIngredientSuccessAction;


export const getIngredients:AppThunk  = ()=> {
  return (dispatch:AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(ingredientsSuccess(res.data));
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          payload: error.message,
        });
      });
  };
};

const ingredientsSuccess = (ingredient:Array<TIngredient>):IGetIngredientSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredient
});