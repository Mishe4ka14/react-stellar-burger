import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, TIngredientActions} from '../actions/ingredients'
import { GET_CONSTRUCTOR_REQUEST, GET_CONSTRUCTOR_SUCCESS, GET_CONSTRUCTOR_FAILED, ADD_INGREDIENT, REMOVE_INGREDIENT, CHANGE_INGREDIENT, TConstructorActions } from "../actions/constructor"
import { TIngredient, TOrder } from '../types/data.js'

type TIngredientState = {
  ingredient: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  bun: TIngredient | null;
  constructor: Array<TIngredient>;
  constructorRequest: boolean;
  constructorFailed: boolean;
  order: TOrder | null
}

const initialState: TIngredientState = {
  ingredient: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  bun: null,
  constructor: [],
  constructorRequest: false,
  constructorFailed: false,
  order: null
}

//редьюсер в котором описываем все экшены
export const ingredientsReducer = (store = initialState, action: TIngredientActions | TConstructorActions):TIngredientState => {
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
      return {...store, constructorRequest: false, constructorFailed: false, order: action.order, constructor: [], bun: null}
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