import styles from './profile-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../utils/use-input';
import { Link } from 'react-router-dom';
import { LOGOUT_SUCCESS, addInfo, getUser, logoutRequest } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export function ProfilePage() {
  
  const dispatch = useDispatch();
  const token = localStorage.getItem('refreshToken')

  const { user } = useSelector((store) => store.auth)

  const {values, handleInputChange, setInputValues} = useInputHandlers({
    name: '', password: '', email: ''
  });

  const setInfo = () => {
    setInputValues({name: user.name, password: '', email: user.email})
  }

  useEffect(() => {
    dispatch(getUser())
    if(user){
      setInfo()
    }
  }, [])


  const handleLogout = () => {
    dispatch(logoutRequest(token)); 
    dispatch({ type: LOGOUT_SUCCESS });
  }

  const handleChangeInfo = (e) => {
    e.preventDefault()
    dispatch(addInfo(values.name, values.email, values.password))
    console.log(user)
  }

  return(
    <>
      <AppHeader/>
      <div className={styles.box}>
        <nav className={styles.nav}>
          <Link className={`text text_type_main-medium mt-6 mb-6  ${ styles.link }`}>Профиль</Link>
          <Link className={`text text_type_main-medium text_color_inactive mt-6 mb-6 ${ styles.Link } `}>История заказов</Link>
          <a onClick={handleLogout} className={`text text_type_main-medium text_color_inactive mt-6 mb-6 ${ styles.Link }`}>Выход</a>
          <p className="text text_type_main-small text_color_inactive ">В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
        <div className={styles.container}>
          <Input type={'text'} extraClass='mt-4 mb-4' placeholder='Имя' value={values.name} onChange={handleInputChange} name="name" icon={'EditIcon'} />
          <EmailInput  type={'email'} extraClass='mt-4 mb-4' placeholder={'Логин'} value={values.email} onChange={handleInputChange} name="email" icon={'EditIcon'}/>
          <PasswordInput type={'password'} extraClass='mt-4 mb-4' placeholder={'Пароль'} value={values.password} onChange={handleInputChange} name="password" icon={'EditIcon'}/>
          {(values.name && values.email && values.password) &&
            <div className={styles.btn}>
              <Button onClick={handleChangeInfo} size="medium">Сохранить</Button>
              <Button onClick={setInfo} type="secondary" size="medium" >Отмена</Button>
            </div>
          }
        </div>
      </div>
    </>
  )
}