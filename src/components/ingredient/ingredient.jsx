import styles from './ingredient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';

const Ingredient = ({ing, onClick}) => {
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
// console.log(constructor)

// const bun = constructor.find((item) => item.type === 'bun');
// const noBuns = constructor.filter((item) => item.type !== 'bun')

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
    <div className={`${styles.box}`} onClick={onClick} ref={dragRef}>
        {counterR > 0 &&  <Counter count={counterR} />}
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
  ing: ingredientPropType,
  onClick: PropTypes.func.isRequired
}
export default Ingredient