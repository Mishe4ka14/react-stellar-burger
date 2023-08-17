import styles from './feed-page.module.css'
import AppHeader from "../../components/app-header/app-header";
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
        <div>
          <div className={`mb-15 ${styles.box}`}>
            <div className={styles.column}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              <p className={`text text_type_main-medium pb-2 ${styles.numbers}`}>034567</p>
              <p className={`text text_type_main-medium pb-2 ${styles.numbers}`}>034567</p>
              <p className={`text text_type_main-medium pb-2 ${styles.numbers}`}>034567</p>
            </div>
            <div>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              <p className="text text_type_main-medium pb-2">034567</p>
              <p className="text text_type_main-medium pb-2">034567</p>
              <p className="text text_type_main-medium pb-2">034567</p>
            </div>
          </div>
        <h2 className="text text_type_main-medium ml-15">Выполено за все время:</h2>
        <p className="text text_type_digits-large ml-15">510</p>
        <h2 className="text text_type_main-medium ml-15 mt-15">Выполено сегодня:</h2>
        <p className="text text_type_digits-large ml-15">322</p>
        </div>
      </div>
    </>
  )
} 