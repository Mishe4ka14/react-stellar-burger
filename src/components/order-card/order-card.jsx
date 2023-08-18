import styles from './order-card.module.css'
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {useState, useEffect, } from 'react'
import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch } from 'react-redux';
import React from 'react'

export const OrderCard = ({order}) => {
  const yesterday = new Date()
  const location = useLocation();
  const dispatch = useDispatch();

  const ingredients = useSelector(store => store.ingredient.ingredient)

  const [orderIngredients, setOrderIngredients] = useState([]);
  const [orderPrice, setOrderPrice] = useState([]);
  // console.log(ingredients)

  //отбираем ингредиенты для каждого заказа
  useEffect(() => {
    const currentIngredients = order.ingredients.flatMap((ing) => {
      return ingredients.filter((ingred) => ingred._id === ing);
    });
    setOrderIngredients(currentIngredients);
  }, [ingredients, order.ingredients]);

  useEffect(() => {
    const totalPrice = orderIngredients.reduce((total, ing) => total + ing.price, 0);
    setOrderPrice(totalPrice)
  }, [orderIngredients]);

  return(
    <div className={`${styles.card} ${location.pathname === '/profile/orders' ? styles.card_order : ''}`}>
      <div className={styles.info}>
        <p className='text text_type_main-default ml-6 pr-30'>{order.number}</p>
        <FormattedDate className={` text text_type_main-default pl-30 text_color_inactive ${location.pathname === '/profile/orders' ? styles.data : ''}`} date={new Date(order.createdAt)}/>
        <p className='text text_type_main-default text_color_inactive mr-6'>i-GTM+3</p>
      </div>
      <p className='text text_type_main-medium ml-6 mt-6'>{order.name}</p>
      {location.pathname === '/profile/orders' && 
        <p className={`text text_type_main-default ml-6 mt-2`} style={order.status !== 'done' ?{color: 'aqua'} : null}>
        {order.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
      }
      <div className={`ml-10 mt-6 pb-6 ${styles.box}`}>   
        {[...new Set(orderIngredients)].slice(0, 6).map((ingredient, index) => (
          <React.Fragment key={`${index}`}>
            {index === 5 &&
              <p className={`text text_type_main-small ${styles.number}`}>+{orderIngredients.length - 6}</p> 
            }
            <img className={`${styles.rounded_img}`} style={{ zIndex: `${5 - index}` }} src={ingredient.image_mobile} alt="#" />
          </React.Fragment>
        ))}  
        <div className={`ml-10 mt-6 mr-4 ${styles.container}`}>
          <p className='text text_type_main-medium pr-2'>{orderPrice}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}