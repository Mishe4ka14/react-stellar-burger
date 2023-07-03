export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const MODAL_ORDER = 'MODAL_ORDER';
export const MODAL_INGREDIENT = 'MODAL_INGREDIENT';

export const openIngredientModal = (ingredient) => ({
  type: MODAL_OPEN,
  modalType: MODAL_INGREDIENT,
  modalProps: ingredient
});

export const openOrderModal = (order) => ({
  type: MODAL_OPEN,
  modalType: MODAL_ORDER,
  props: order
});

export const closeModal = () => ({
  type: MODAL_CLOSE,
});