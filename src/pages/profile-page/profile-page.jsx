import styles from './profile-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../utils/use-input';
import { Link } from 'react-router-dom';

export function ProfilePage() {
  const [inputValues, handleInputChange] = useInputHandlers();
  return(
    <>
      <AppHeader/>
      <div className={styles.box}>
        <nav className={styles.nav}>
          <a className="text text_type_main-medium mt-6 mb-6">Профиль</a>
          <a className="text text_type_main-medium text_color_inactive mt-6 mb-6">История заказов</a>
          <a className="text text_type_main-medium text_color_inactive mt-6 mb-6">Выход</a>
          <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
        <div className={styles.container}>
          <Input type={'text'} extraClass='mt-4 mb-4' placeholder='Имя' value={inputValues.name} onChange={handleInputChange} name="name" icon={'EditIcon'}/>
          <Input type={'email'} extraClass='mt-4 mb-4' placeholder={'Логин'} value={inputValues.email} onChange={handleInputChange} name="email" icon={'EditIcon'}/>
          <Input type={'password'} extraClass='mt-4 mb-4' placeholder={'Пароль'} value={inputValues.password} onChange={handleInputChange} name="password" icon={'EditIcon'}/>
        </div>
      </div>
    </>
  )
}