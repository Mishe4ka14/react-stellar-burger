import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients.js'


const initialState = {
  ingredient: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

//редьюсер в котором описываем все экшены
export const ingredientsReducer = (store = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST : {
      return {...store, ingredientsRequest: true, ingredientsFailed: false}
    }
    case GET_INGREDIENTS_SUCCESS : {
      return {...store, ingredientsRequest: false, ingredientsFailed: false, ingredient: action.data}
    }
    case GET_INGREDIENTS_FAILED : {
      return {...store, ingredientsRequest: false, ingredientsFailed: true}
    }
    default: {
      return store
    }
  }
}