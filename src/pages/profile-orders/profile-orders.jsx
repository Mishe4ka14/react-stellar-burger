import { OrderCard } from "../../components/order-card/order-card"
import styles from './profile-orders.module.css'

export const ProfileOrders = () => {

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