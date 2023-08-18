import { OrderCard } from "../../components/order-card/order-card"
import styles from './profile-orders.module.css'
import {React, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { connect, disconnect, wsConnecting } from '../../services/actions/orders';
import { WSS_API } from "../../utils/burger-api";

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnecting(`${WSS_API}`))
    return dispatch(disconnect)
  }, [])
  return(
    <ul className={`${styles.scroll} custom-scroll`}>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
    </ul>
  )
}