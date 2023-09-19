import styles from './order-info.module.css'
import { useSelector } from '../../hooks/hooks'
import AppHeader from '../app-header/app-header'
import { useLocation } from 'react-router-dom'
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {useState, useEffect, } from 'react'
import { getOrder } from '../../utils/burger-api';
import React from 'react';
import { TFeed, TIngredient, TOrder } from '../../services/types/data';

export const OrderInfo = ():JSX.Element => {

  const location = useLocation();
  const ingredients = useSelector(store => store.ingredient.ingredient)
  const background = location.state && location.state.background;
  
  const [order, setOrder] = useState<TOrder>();
  const [orderIngredients, setOrderIngredients] = useState<Array<TIngredient>>([]);
  const [total, setTotal] = useState<number>();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const pathname = location.pathname;
    const match = pathname.match(/\d+$/); 
    const number = match ? match[0] : null;
    getOrder(number as string).then(res => setOrder(res.orders[0]))
  }, [])

  useEffect(() => {
    if (order !== undefined && Object.keys({order}).length !== 0 && ingredients.length !== 0) {
      setDate(new Date(order.createdAt));
      const currentIngredients = order.ingredients.flatMap((ing) => {
        return ingredients.filter((ingred) => ingred._id === ing);
      });
      setOrderIngredients(currentIngredients);
    }
  }, [ingredients, order?.ingredients]);

  useEffect(() => {
    if (orderIngredients.length !== 0) {
    const totalPrice = orderIngredients.reduce((total, ing) => total + ing.price, 0);
    setTotal(totalPrice)
    }
  }, [orderIngredients])
  return(
    <>
      {background ? null : <AppHeader />}
      <div className={background ? styles.modal : styles.container}>
        <p className={`text text_type_main-default mr-6 pb-10 ${background ? null : styles.number}`}>#{order?.number}</p>
        <div style={{display: 'flex', flexDirection: 'column', marginRight: 190}} >
          <h1 className='text text_type_main-medium pb-3'>{order?.name}</h1>
          <p className='text text_type_main-small pb-15' style={{color: 'aqua'}}>Выполнен</p>
          <p className='text text_type_main-medium pb-6'>Состав:</p>
        </div>
        <ul className={`${styles.scroll} custom-scroll`}>
          <div className={styles.box}>
            {orderIngredients.map((ingredient, index) => (
              <React.Fragment key={index}>
              <div className={styles.info}>
                <div className={styles.left}>
                  <img key={ingredient._id} className={`${styles.rounded_img}`} src={ingredient.image_mobile} alt="#" />
                  <p className='text text_type_main-default pl-4'>{ingredient.name}</p>
                </div>
                <div className={styles.right}>
                  <div className={styles.price}> 
                    <p className='text text_type_main-default mr-2'>{ingredient.price}</p>
                    <CurrencyIcon type='primary'/>
                  </div>
                </div>
              </div>
              </React.Fragment>
            ))}
          </div>
        </ul>
        <div className={styles.bottom}>
          <div className={styles.time}>
            <FormattedDate className={` text text_type_main-default mr-4 text_color_inactive`} date={date}/>
            <p className={`text text_type_main-default text_color_inactive mr-6 ${styles.gtm} `}>i-GTM+3</p>
          </div>
          <div className={styles.fullPrice}>
            <p className='text text_type_main-default ml-2'>{total}</p>  
            <CurrencyIcon type='primary'/>
          </div>          
        </div>
      </div>
    </>
  )
}