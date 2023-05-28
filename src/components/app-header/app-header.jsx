import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
  return(
    <header className={styles.header}>
      <div className={styles.box}>
        <BurgerIcon/>
        <p className='text text_type_main-default mr-5 ml-2'>Конструктор</p>
      </div>  
      <div className={styles.box}>
        <ListIcon/>
        <p className='text text_type_main-default text_color_inactive mr-5 ml-2'>Лента заказов</p>
      </div>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <div className={styles.box}>
        <ProfileIcon/>
        <p className='text text_type_main-default text_color_inactive mr-5 ml-2'>Личный кабинет</p>
      </div>
    </header>
  )
}

export default AppHeader