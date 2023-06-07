import React from 'react'
import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types';
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
//   ingredient: PropTypes.shape({
//     "_id": PropTypes.string.isRequired,
//      "name":PropTypes.string.isRequired,
//      "type":PropTypes.string.isRequired,
//      "proteins":PropTypes.number.isRequired,
//      "fat":PropTypes.number.isRequired,
//      "carbohydrates":PropTypes.number.isRequired,
//      "calories":PropTypes.number.isRequired,
//      "price":PropTypes.number.isRequired,
//      "image":PropTypes.string.isRequired,
//      "image_mobile":PropTypes.string.isRequired,
//      "image_large":PropTypes.string.isRequired,
//      "__v":PropTypes.number.isRequired
// })
}

export default IngredientDetails