import { getOrderNumber } from "../../utils/burger-api";
import { openOrderModal } from "./modal";

export const GET_CONSTRUCTOR_REQUEST = 'GET_CONSTRUCTOR_REQUEST';
export const GET_CONSTRUCTOR_SUCCESS = {
                                        type: 'GET_CONSTRUCTOR_SUCCESS',
                                        order: null
                                        };
export const GET_CONSTRUCTOR_FAILED = 'GET_CONSTRUCTOR_FAILED';

export const getOrder = (ID) => {
  return function(dispatch){
    dispatch({
      type: GET_CONSTRUCTOR_REQUEST
    });
    getOrderNumber(ID).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_CONSTRUCTOR_SUCCESS,
          order: res.order.number
        });
        dispatch(openOrderModal(res.order))
      } else {
        dispatch({
          type: GET_CONSTRUCTOR_FAILED
        });
      }
    });
}
}
