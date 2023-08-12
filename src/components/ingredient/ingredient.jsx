import styles from './ingredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const Ingredient = ({ing, onClick}) => {

  const location = useLocation();

  const {image, price, name} = ing;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ing,
    collect: monitor => ({
        didDrop: monitor.didDrop(),
        item: monitor.getItem()
    })
});

const {constructor, bun} = useSelector(store => store.ingredient)

const [counterR, setCounter] = useState(0);

useEffect(() => {
  let counter = 0
  if (bun && ing.type === "bun" && ing._id === bun._id) {
      counter = 1;
  } else {
      counter = constructor.filter((item) => item._id === ing._id).length;
  }
  setCounter(counter)
}, [ bun, constructor])


  return(
    <Link
    key={ing._id}
    // Тут мы формируем динамический путь для нашего ингредиента
    to={`/ingredients/${ing._id}`}
    // а также сохраняем в свойство background роут,
    // на котором была открыта наша модалка
    state={{ background: location }}
    className={styles.link}
  >
      <div className={`${styles.box}`} onClick={onClick} ref={dragRef}>
          {counterR > 0 &&  <Counter count={counterR} />}
        <img src={image} alt={name} />
        <div className={styles.container}>
          <p className={`${styles.price} text text_type_main-default mr-2 pt-1 pb-1`}>{price}</p>
          <CurrencyIcon/>
        </div>
        <p className="text text_type_main-default">{name}</p>
      </div>
    </Link>
  )
}

Ingredient.propTypes = {
  ing: ingredientPropType,
  onClick: PropTypes.func.isRequired
}
export default Ingredient