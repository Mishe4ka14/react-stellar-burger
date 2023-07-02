import { GET_CONSTRUCTOR_REQUEST, GET_CONSTRUCTOR_SUCCESS, GET_CONSTRUCTOR_FAILED } from "../actions/constructor"

const constructorInitialState = {
  ingredient: [],
  bun: null,
  constructorRequest: false,
  constructorFailed: false,
  order: {
  number: null
  },
}

export const constructorReducer = (store = constructorInitialState, action) => {
  switch (action.type){
    case GET_CONSTRUCTOR_REQUEST : {
      return {...store, constructorRequest: true, constructorFailed: false}
    }
    case GET_CONSTRUCTOR_SUCCESS : {
      return {...store, constructorRequest: false, constructorFailed: false, order: {number: action.order}}
    }
    case GET_CONSTRUCTOR_FAILED : {
      return {...store, constructorRequest: false, constructorFailed: true}
    }
    default: {
      return store
    }
  }
}
