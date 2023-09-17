import { string } from "prop-types";
import { MODAL_OPEN, MODAL_CLOSE, TModalActions } from "../actions/modal";
import { TIngredient, TOrder } from "../types/data";

type TModalState = {
    modalType: string | null
    modalProps: TIngredient | TOrder | null
}

const initialState: TModalState = {
  modalType: null,
  modalProps: null
}
  
export const modalReducer = (store = initialState, action: TModalActions): TModalState => {
    switch (action.type) {
        case MODAL_OPEN:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case MODAL_CLOSE:
            return initialState
        default:
            return store
    }
}