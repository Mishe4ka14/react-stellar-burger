import styles from './ingredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const Ingredient = ({ingredient}) => {
  const {image, price, name, __v} = ingredient;

  return(
    <div className={`${styles.box}`}>
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
  ingredient: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
}
export default Ingredient