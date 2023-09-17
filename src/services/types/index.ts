import { rootReducer } from "../reducers"
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from "../store";
import { TIngredientActions } from "../actions/ingredients";
import { TConstructorActions } from "../actions/constructor";
import { TModalActions } from "../actions/modal";
import { TFeedActions } from "../actions/feed";
import { TAuthActions } from "../actions/auth";

export type RootState = ReturnType<typeof rootReducer>

// Типизация всех экшенов 
export type TAppActions = 
| TIngredientActions
| TConstructorActions
| TModalActions
| TFeedActions
| TAuthActions;


// Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, TAppActions>
>; 

export type AppDispatch<TReturn = void> = ( action: TAppActions | AppThunk<TReturn> ) => TReturn;