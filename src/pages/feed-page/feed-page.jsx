import styles from './feed-page.module.css'
import AppHeader from "../../components/app-header/app-header";
import { OrderCard } from '../../components/order-card/order-card';
import { Link, useLocation } from 'react-router-dom';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect, disconnect } from '../../services/actions/feed';
import { WSS_API } from '../../utils/burger-api';

export const FeedPage = () => {
  const location = useLocation();
  const dispatch = useDispatch(); 
  const message = useSelector(store => store.feed.message)
  const total = useSelector(store => store.feed.total)
  const totalToday = useSelector(store => store.feed.totalToday)

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
          {message.map((order) => (
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
                {message.filter(order => order.status === 'done').slice(0, 30).map((order) => ( 
                  <p className={`text text_type_main-medium pb-2 ${styles.numbers}`} key={order._id}>{order.number}</p>
                ))}
              </div>
            </div>
              <div className={styles.column}>
                {message.filter(order => order.status !== 'done').slice(0, 30).map((order) => ( 
                  <p className={`text text_type_main-medium pb-2 ${styles.numbers}`} key={order._id} style={{color: 'white'}}>{order.number}</p>
                ))}
              </div>
          </div>
          <h2 className="text text_type_main-medium ml-15">Выполено за все время:</h2>
          <p className="text text_type_digits-large ml-15">{total}</p>
          <h2 className="text text_type_main-medium ml-15 mt-5">Выполено сегодня:</h2>
          <p className="text text_type_digits-large ml-15">{totalToday}</p>
        </div>
      </div>
    </>
  )
} 