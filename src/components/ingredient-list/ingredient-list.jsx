import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css"
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import {MODAL_INGREDIENT, openIngredientModal } from "../../services/actions/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const IngredientList = ({ filter }) => {

  const dispatch = useDispatch();
  const {modalType} = useSelector(store => store.modal)
  return (
    <div className={styles.box}>
      {filter.map((ingredient) => (
        <div key={ingredient._id} className={styles.container} onClick={() => dispatch(openIngredientModal(ingredient))}>
          <Ingredient  ing={ingredient} onClick={() => dispatch(openIngredientModal(ingredient))} />
        </div>
      ))}
        { modalType === MODAL_INGREDIENT && 
                <Modal> 
                    <IngredientDetails/>
                </Modal> 
            }
    </div>
  );
};

IngredientList.propTypes = {
  filter: PropTypes.arrayOf(ingredientPropType),
}

export default IngredientList