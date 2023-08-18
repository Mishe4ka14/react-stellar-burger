import styles from './feed-page.module.css'
import AppHeader from "../../components/app-header/app-header";
import { OrderCard } from '../../components/order-card/order-card';
import { Link, useLocation } from 'react-router-dom';
import { OrderInfo } from '../../components/order-info/order-info';
import {React, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { connect, disconnect, wsConnecting, wsMessage } from '../../services/actions/feed';
import { WSS_API } from '../../utils/burger-api';
import { getIngredients } from '../../services/actions/ingredients';

export const FeedPage = () => {
  const location = useLocation();
  const dispatch = useDispatch(); 
  const feed = useSelector(store => store.feed)

  //   useEffect(() => {
  //   dispatch(getIngredients());
  // }, [])

  useEffect(() => {
  dispatch(connect(`${WSS_API}/all`))
  return () => {
    dispatch(disconnect());
  };
}, []);

  
  return(
    <>
      <AppHeader/>
      <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.title}`}>Лента заказов</h1>
      <div className={styles.page}>
        <ul className={`${styles.scroll} custom-scroll`}>
          {feed.message.map((order) => (
          <Link to={`/feed/${order.number}`} className={styles.link} state={{ background: location }} key={order._id}>
            <OrderCard order={order} key={order._id}/>
          </Link>
            ))} 
        </ul>
        <div>
          <div style={{display: 'flex'}}>
            <h2 className="text text_type_main-medium pb-6 ml-15">Готовы:</h2>
            <h2 style={{marginLeft: '180px'}} className="text text_type_main-medium pb-6">В работе:</h2>
          </div>
          <div style={{display: 'flex'}}>
            <div className={`mb-15 ${styles.box}`}>
              <div className={styles.column}>
                {feed.message.filter(order => order.status === 'done').slice(0, 30).map((order) => ( 
                  <p className={`text text_type_main-medium pb-2 ${styles.numbers}`} key={order._id}>{order.number}</p>
                ))}
              </div>
            </div>
              <div className={styles.column}>
                {feed.message.filter(order => order.status !== 'done').slice(0, 30).map((order) => ( 
                  <p className={`text text_type_main-medium pb-2 ${styles.numbers}`} key={order._id} style={{color: 'white'}}>{order.number}</p>
                ))}
              </div>
          </div>
          <h2 className="text text_type_main-medium ml-15">Выполено за все время:</h2>
          <p className="text text_type_digits-large ml-15">{feed.total}</p>
          <h2 className="text text_type_main-medium ml-15 mt-5">Выполено сегодня:</h2>
          <p className="text text_type_digits-large ml-15">{feed.totalToday}</p>
        </div>
      </div>
    </>
  )
} 