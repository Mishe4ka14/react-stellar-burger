import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css"
import PropTypes from 'prop-types';

const IngredientList = ({ filter }) => {

  return (
    <li className={styles.container}>
      {filter.map((ingredient) => (
        <Ingredient key={ingredient._id} ingredient={ingredient} />
      ))}
    </li>
  );
};

IngredientList.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.object)
}

export default IngredientList