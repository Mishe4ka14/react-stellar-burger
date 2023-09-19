import styles from './profile-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Link, Outlet } from 'react-router-dom';
import { LOGOUT_SUCCESS, logoutRequest } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const ProfilePage = ():JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('refreshToken')

  const handleLogout = () => {
    dispatch(logoutRequest(token)); 
    dispatch({ type: LOGOUT_SUCCESS });
  }

  return(
    <>
      <AppHeader/>
      <div className={location.pathname === '/profile' ? styles.container : styles.container_orders}>
        <div className={styles.box}>
          <nav className={location.pathname === '/profile' ? styles.nav : styles.nav_orders}>
            <Link to='/profile' className={`text text_type_main-medium mt-6 mb-6  ${location.pathname === '/profile' ? styles.link : styles.inactive }`}>Профиль</Link>
            <Link to='/profile/orders' className={`text text_type_main-medium text_color_inactive mt-6 mb-6 ${location.pathname === '/profile/orders' ? styles.link : styles.inactive } `}>История заказов</Link>
            <a onClick={handleLogout} className={`text text_type_main-medium text_color_inactive mt-6 mb-6 ${ styles.Link }`}>Выход</a>
            <p className="text text_type_main-small text_color_inactive ">В этом разделе вы можете изменить свои персональные данные</p>
          </nav>
          <Outlet/>
        </div>
      </div>
    </>
  )
}