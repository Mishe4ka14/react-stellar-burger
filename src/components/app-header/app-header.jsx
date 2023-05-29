import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
  return(
    <header className={styles.header}>
      <a href='https://www.example.com/' className={styles.link}>
        <BurgerIcon/>
        <p className='text text_type_main-default mr-5 ml-2'>Конструктор</p>
      </a>  
      <a href='https://www.example.com/' className={styles.link}>
        <ListIcon type="secondary"/>
        <p className='text text_type_main-default text_color_inactive mr-5 ml-2'>Лента заказов</p>
      </a>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <a href='https://www.example.com/' className={styles.link}>
        <ProfileIcon type="secondary"/>
        <p className='text text_type_main-default text_color_inactive mr-5 ml-2'>Личный кабинет</p>
      </a>
    </header>
  )
}

export default AppHeader