import React from 'react'
import styles from './ingredient-details.module.css'
import { ingredientPropType } from '../../utils/prop-types';

const IngredientDetails = ({props}) => {
  return(
    <>
    <h2 className="text text_type_main-large mt-5 ml-10">Детали ингредиента</h2>
  <section className={styles.container}>
    <img src={props.image_large} alt={props.name} />
    <h3 className="text text_type_main-medium mt-4">{props.name}</h3>
    <ul className={styles.box}>
      <li className={styles.info}>
        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
        <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{props.calories}</p>
      </li>
      <li className={styles.info}>
        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
        <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{props.proteins}</p>
      </li>
      <li className={styles.info}>
        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
        <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{props.fat}</p>
      </li>
      <li className={styles.info}>
        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
        <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{props.carbohydrates}</p>
      </li>
    </ul>
  </section>
  </>
  )
}

IngredientDetails.propTypes = {
 props:  ingredientPropType
}

export default IngredientDetails