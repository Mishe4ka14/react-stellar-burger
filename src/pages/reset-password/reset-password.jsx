import styles from './reset-password.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../utils/use-input';
import { Link } from 'react-router-dom';

export function ResetPassword() {
  const [inputValues, handleInputChange] = useInputHandlers();
  return(
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input type={'password'} extraClass='mt-4 mb-4' placeholder={'Введите новый пароль'} value={inputValues.email} onChange={handleInputChange} name="password"/>
        <Input type={'text'} extraClass='mt-4 mb-4' placeholder={'Введите код из письма'} value={inputValues.email} onChange={handleInputChange} name="code"/>
        <Button htmlType="button" extraClass='mt-4'>Сохранить</Button>
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