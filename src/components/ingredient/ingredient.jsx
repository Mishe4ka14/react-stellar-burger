import styles from './ingredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const Ingredient = ({ingredient, onClick}) => {
  const {image, price, name, __v} = ingredient;

  return(
    <div className={`${styles.box}`} onClick={() => onClick(ingredient)}>
      {__v === 1 && <Counter count={1}/>} {/* выставляем условие для отображения счетчика пока нет реального добавления ингредиентов */}
      <img src={image} alt={name} />
      <div className={styles.container}>
        <p className={`${styles.price} text text_type_main-default mr-2 pt-1 pb-1`}>{price}</p>
        <CurrencyIcon/>
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    "_id": PropTypes.string.isRequired,
     "name":PropTypes.string.isRequired,
     "type":PropTypes.string.isRequired,
     "proteins":PropTypes.number.isRequired,
     "fat":PropTypes.number.isRequired,
     "carbohydrates":PropTypes.number.isRequired,
     "calories":PropTypes.number.isRequired,
     "price":PropTypes.number.isRequired,
     "image":PropTypes.string.isRequired,
     "image_mobile":PropTypes.string.isRequired,
     "image_large":PropTypes.string.isRequired,
     "__v":PropTypes.number.isRequired
})
}
export default Ingredient