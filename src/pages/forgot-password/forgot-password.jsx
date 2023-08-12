import styles from './forgot-password.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../utils/use-input';
import { Link } from 'react-router-dom';

export function ForgotPassword() {
  const [inputValues, handleInputChange] = useInputHandlers();
  return(
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input type={'email'} extraClass='mt-4 mb-4' placeholder={'Укажите e-mail'} value={inputValues.email} onChange={handleInputChange} name="email"/>
        <Button htmlType="button" extraClass='mt-4'>Восстановить</Button>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Вспомнили пароль?</h2>
          <Link to='/login'>
            <Button htmlType="button" type="secondary" size="small">Войти</Button>
          </Link>
        </div>
      </div>  
    </>
  )
}