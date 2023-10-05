import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { Link, useLocation } from 'react-router-dom';

const AppHeader = ():JSX.Element => {
  const location = useLocation();
  return(
    <header className={styles.header}>
      <Link to='/' className={styles.link}>
        <BurgerIcon  type={location.pathname === '/' ? 'primary': 'secondary'}/>
        <p className={`text text_type_main-default mr-5 ml-2  ${location.pathname === '/' ? '': 'text_color_inactive'}`}>Конструктор</p>
      </Link>  
      <Link to='/feed' className={styles.link}>
        <ListIcon type={location.pathname === '/feed' ? 'primary': 'secondary'}/>
        <p className={`text text_type_main-default mr-5 ml-2  ${location.pathname === '/feed' ? '': 'text_color_inactive'}`}>Лента заказов</p>
      </Link>
      <div className={styles.logo}>
        <Logo/>
      </div>
      <Link to='/profile' className={styles.link}>
        <ProfileIcon type={location.pathname === '/profile' ||  location.pathname === '/profile/orders' ? 'primary': 'secondary'}/>
        <p className={`text text_type_main-default mr-5 ml-2 ${location.pathname === '/profile' ||  location.pathname === '/profile/orders' ? '': 'text_color_inactive'}`}>Личный кабинет</p>
      </Link>
    </header>
  )
}

export default AppHeader