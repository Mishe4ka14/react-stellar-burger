import { MODAL_OPEN, MODAL_CLOSE } from "../actions/modal";

const initialState = {
  modalType: null,
  modalProps: {}
}
  
export const modalReducer = (store = initialState, action) => {
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