import styles from './feed-page.module.css'
import AppHeader from "../../components/app-header/app-header";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderCard } from '../../components/order-card/order-card';

export const FeedPage = () => {
  return(
    <>
      <AppHeader/>
      <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.title}`}>Лента заказов</h1>
      <div className={styles.page}>
      <ul className={`${styles.scroll} custom-scroll`}>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
      </ul>
      </div>
    </>
  )
} 