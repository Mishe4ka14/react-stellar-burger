import styles from './reset-password.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../utils/use-input';
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { resetPasswordRequest } from '../../utils/burger-api';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate(); 

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  }

  const handleReset = (e) => {
    e.preventDefault();
    if(password.length && token.length > 0){
    return resetPasswordRequest(password, token)
        .then(() => {
          navigate('/login')
        })
        .catch(error => {
          console.log("Error:", error);
    })}
  }

  return(
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input type={'password'} extraClass='mt-4 mb-4' placeholder={'Введите новый пароль'} value={password} onChange={handlePasswordChange} name="password"/>
        <Input type={'text'} extraClass='mt-4 mb-4' placeholder={'Введите код из письма'} value={token} onChange={handleTokenChange} name="code"/>
        <Button onClick={handleReset} htmlType="button" extraClass='mt-4'>Сохранить</Button>
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