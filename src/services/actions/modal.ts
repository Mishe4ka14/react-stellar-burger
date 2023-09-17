import { TIngredient, TOrder } from "../types/data";

export const MODAL_OPEN:'MODAL_OPEN' = 'MODAL_OPEN';
export const MODAL_CLOSE:'MODAL_CLOSE' = 'MODAL_CLOSE';
export const MODAL_ORDER:'MODAL_ORDER' = 'MODAL_ORDER';
export const MODAL_INGREDIENT:'MODAL_INGREDIENT' = 'MODAL_INGREDIENT';

export interface IOpenIngredientModal {
  readonly type: typeof MODAL_OPEN;
  modalType: typeof MODAL_INGREDIENT;
  modalProps: TIngredient;
}

export interface IOpenOrderModal {
  readonly type: typeof MODAL_OPEN;
  modalType: typeof MODAL_ORDER;
  modalProps: TOrder
}

export interface ICloseModal {
  readonly type: typeof MODAL_CLOSE;
}

export type TModalActions = 
| IOpenIngredientModal
| IOpenOrderModal
| ICloseModal;

export const openIngredientModal = (ingredient: TIngredient) => ({
  type: MODAL_OPEN,
  modalType: MODAL_INGREDIENT,
  modalProps: ingredient
});

export const openOrderModal = (order: TOrder) => ({
  type: MODAL_OPEN,
  modalType: MODAL_ORDER,
  modalProps: order
});

export const closeModal = () => ({
  type: MODAL_CLOSE,
});