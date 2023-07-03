import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from '../actions/ingredients.js'
import { GET_CONSTRUCTOR_REQUEST, GET_CONSTRUCTOR_SUCCESS, GET_CONSTRUCTOR_FAILED, ADD_INGREDIENT, REMOVE_INGREDIENT, CHANGE_INGREDIENT } from "../actions/constructor"

const initialState = {
  ingredient: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  bun: null,
  constructor: [],
  constructorRequest: false,
  constructorFailed: false,
  order: {
    number: null
  },  
}

//редьюсер в котором описываем все экшены
export const ingredientsReducer = (store = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST : {
      return {...store, ingredientsRequest: true, ingredientsFailed: false}
    }
    case GET_INGREDIENTS_SUCCESS : {
      return {...store, ingredientsRequest: false, ingredientsFailed: false, ingredient: action.ingredient}
    }
    case GET_INGREDIENTS_FAILED : {
      return {...store, ingredientsRequest: false, ingredientsFailed: true}
    }
    case GET_CONSTRUCTOR_REQUEST : {
      return {...store, constructorRequest: true, constructorFailed: false}
    }
    case GET_CONSTRUCTOR_SUCCESS : {
      return {...store, constructorRequest: false, constructorFailed: false, order: {number: action.order}}
    }
    case GET_CONSTRUCTOR_FAILED : {
      return {...store, constructorRequest: false, constructorFailed: true}
    }
    case ADD_INGREDIENT : {  
      if (action.ingredient.type === "bun") {
        return {...store, bun: action.ingredient }
    } else {
        return {...store, constructor: [...store.constructor, action.ingredient]
        }
    }}
    case REMOVE_INGREDIENT: {
      const arr = store.constructor
      const index = arr.indexOf(action.ingredient);
      if (index > -1) {arr.splice(index, 1);}
      return {...store, constructor: [...arr],}
    }
    case CHANGE_INGREDIENT:
      const allIngredients = [...store.constructor];
      allIngredients.splice(action.toIndex, 0, allIngredients.splice(action.fromIndex, 1)[0]);
      return {...store, constructor: [...allIngredients],}
    default: {
      return store
    }
  }
}