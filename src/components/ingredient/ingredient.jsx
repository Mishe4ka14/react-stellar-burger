import styles from './ingredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

const Ingredient = ({ingredient}) => {
  const {image, price, name, __v} = ingredient;
  return(
    <div className={`${styles.box}`}>
      {__v === 1 && <Counter count={1}/>} {/* выставляем условие для отображения счетчика пока нет реального добавления ингредиентов */}
      <img src={image} alt={name} />
      <div className={styles.container}>
        <p className="text text_type_main-default mr-2 pt-1 pb-1" style={{fontSize: 20}}>{price}</p>
        <CurrencyIcon/>
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  )
}

export default Ingredient