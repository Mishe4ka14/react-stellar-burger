import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css"
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch } from "react-redux";
import { openIngredientModal } from "../../services/actions/modal";

const IngredientList = ({ filter }) => {

  const dispatch = useDispatch();

  return (
    <div className={styles.box}>
      {filter.map((ingredient) => (
        <div key={ingredient._id} className={styles.container} onClick={() => dispatch(openIngredientModal(ingredient))}>
          <Ingredient  ing={ingredient} onClick={() => dispatch(openIngredientModal(ingredient))} />
        </div>
      ))}
    </div>
  );
};

IngredientList.propTypes = {
  filter: PropTypes.arrayOf(ingredientPropType),
}

export default IngredientList