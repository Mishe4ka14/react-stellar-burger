import { OrderCard } from "../../components/order-card/order-card"
import styles from './profile-orders.module.css'
import { useEffect } from 'react';
import { useDispatch } from '../../hooks/hooks';
import { connect } from '../../services/actions/orders';
import {disconnect as disconnectOrders} from '../../services/actions/orders'
import { WSS_API } from "../../utils/burger-api";
import { useSelector } from "../../hooks/hooks";
import { useLocation, Link } from "react-router-dom";


export const ProfileOrders = ():JSX.Element => {

  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector(store => store.orders) ;
  const message = [...orders.message];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const tokenPattern = /Bearer\s(.+)/; 
    const match = token?.match(tokenPattern);
    const extractedToken = match ? match[1] : null; 
    dispatch(connect(`${WSS_API}?token=${extractedToken}`))
    return () => {
      dispatch(disconnectOrders());
    };
  }, [])


  return(
    <ul className={`${styles.scroll} custom-scroll`}>
      {message.reverse().map((order) => (
        <Link to={`/profile/orders/${order.number}`} className={styles.link} state={{ background: location }} key={order._id}>
          <OrderCard order={order} key={order._id}/>
        </Link>
      ))} 
    </ul>
  )
}