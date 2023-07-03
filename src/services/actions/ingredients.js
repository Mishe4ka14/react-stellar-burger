import { getIngredientsRequest } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


export const getIngredients = () => {
  return function (dispatch) {
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

const ingredientsSuccess = (data) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredient: data,
  };
};