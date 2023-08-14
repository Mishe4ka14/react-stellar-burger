import styles from './forgot-password.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../utils/use-input';
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { forgotPasswordRequest } from '../../utils/burger-api';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const emailSet = (e) => {
    setEmail(e.target.value);
  }

  const handleForgot = (e) => {
    e.preventDefault();
    if(email.length > 0){
    return forgotPasswordRequest(email)
        .then(() => {
          navigate('/reset-password')
        })
        .catch(error => {
          console.log("Error:", error);
    })
    }}

  return(
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input type={'email'} extraClass='mt-4 mb-4' placeholder={'Укажите e-mail'} value={email} onChange={emailSet} name="email"/>
        <Button onClick={handleForgot} htmlType="button" extraClass='mt-4'>Восстановить</Button>
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