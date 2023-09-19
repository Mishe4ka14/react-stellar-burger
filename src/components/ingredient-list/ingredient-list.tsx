import Ingredient from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css"
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch } from "react-redux";
import { openIngredientModal } from "../../services/actions/modal";
import { TIngredient } from "../../services/types/data";
import { FC } from "react";

interface IngredientListProps {
  filter: TIngredient[];
}

const IngredientList:FC<IngredientListProps> = ({ filter }) => {

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

export default IngredientList