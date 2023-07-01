import {
  GET_CONSTRUCTOR_FAILED,
  GET_CONSTRUCTOR_REQUEST,
  GET_CONSTRUCTOR_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients.js'


const initialState = {
  ingredients: [],
  constructor: [],
  currentIngredient: [],
  order: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

//редьюсер в котором описываем все экшены
export const ingredientsReducer = (store = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST : {
      return {...store, ingredientsRequest: true, itemsFailed: false}
    }
    case GET_INGREDIENTS_SUCCESS : {
      return {...store, ingredientsRequest: false, itemsFailed: false, ingredients: action.data}
    }
    case GET_CONSTRUCTOR_FAILED : {
      return {...store, ingredientsRequest: false, itemsFailed: true}
    }
    default: {
      return store
    }
  }
}