import React from 'react'
import galka from '../../images/done.svg'
import styles from './order-details.module.css'
import { number } from 'prop-types'
import { useSelector } from 'react-redux'

const OrderModal = () => {
  const { order } = useSelector(store => store.constructor)
  return(
    <section className={styles.container}>
      <h2 className={`${styles.number} text text_type_digits-large`}>{order.number}</h2>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img className={styles.galka} src={galka} alt="Галка"/>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
    </section>
    
  )
}

// OrderModal.propTypes = {
//   number: number
// }

// OrderModal.defaultProps = {
//   number: ''
// };

export default OrderModal