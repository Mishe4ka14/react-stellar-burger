import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css"
import PropTypes from 'prop-types';

const IngredientList = ({ filter, openModal }) => {

  return (
    <div className={styles.box}>
      {filter.map((ingredient) => (
        <div key={ingredient._id} className={styles.container} onClick={() => openModal(ingredient)}>
          <Ingredient  ingredient={ingredient} onClick={openModal} />
        </div>
      ))}
    </div>
  );
};

IngredientList.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.object)
}

export default IngredientList