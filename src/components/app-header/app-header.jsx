import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { Link, useLocation } from 'react-router-dom';


const AppHeader = () => {
  const location = useLocation();
  return(
    <header className={styles.header}>
      <Link to='/' className={styles.link}>
        <BurgerIcon  type={location.pathname === '/' ? 'primary': 'secondary'}/>
        <p className={`text text_type_main-default mr-5 ml-2  ${location.pathname === '/' ? '': 'text_color_inactive'}`}>Конструктор</p>
      </Link>  
      <a href='#' className={styles.link}>
        <ListIcon type="secondary"/>
        <p className='text text_type_main-default text_color_inactive mr-5 ml-2'>Лента заказов</p>
      </a>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <Link to='/profile' className={styles.link}>
        <ProfileIcon type={location.pathname === '/profile' ? 'primary': 'secondary'}/>
        <p className={`text text_type_main-default mr-5 ml-2 ${location.pathname === '/profile' ? '': 'text_color_inactive'}`}>Личный кабинет</p>
      </Link>
    </header>
  )
}

export default AppHeader