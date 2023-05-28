import { data } from "../../utils/data";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css"

const IngredientList = ({ type }) => {
  const filter = data.filter((ingredient) => ingredient.type === type);

  return (
    <li className={styles.container}>
      {filter.map((ingredient) => (
        <Ingredient key={ingredient._id} ingredient={ingredient} />
      ))}
    </li>
  );
};

export default IngredientList