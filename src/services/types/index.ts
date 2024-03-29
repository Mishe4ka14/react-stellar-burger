import { rootReducer } from "../reducers"
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TIngredientActions } from "../actions/ingredients";
import { TConstructorActions } from "../actions/constructor";
import { TModalActions } from "../actions/modal";
import { TFeedActions } from "../actions/feed";
import { TAuthActions } from "../actions/auth";
import { TOrdersActions } from "../actions/orders";

export type RootState = ReturnType<typeof rootReducer>

// Типизация всех экшенов 
export type TAppActions = 
| TIngredientActions
| TConstructorActions
| TModalActions
| TFeedActions
| TAuthActions
| TOrdersActions;


// Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>; 
export type AppThunkk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TAppActions>;

export type AppDispatch<TReturn = void> = ( action: TAppActions | AppThunk<TReturn> | AppThunkk<TReturn> ) => TReturn;