import styles from './forgot-password.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { forgotPasswordRequest } from '../../utils/burger-api';

export const ForgotPassword = ():JSX.Element => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const emailSet = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleForgot = (e: React.FormEvent<HTMLFormElement>) => {
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
      <form className={styles.container} onSubmit={handleForgot}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input type={'email'} extraClass='mt-4 mb-4' placeholder={'Укажите e-mail'} value={email} onChange={emailSet} name="email"/>
        <Button extraClass='mt-4' htmlType='submit'>Восстановить</Button>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Вспомнили пароль?</h2>
          <Link to='/login'>
            <Button htmlType="button" type="secondary" size="small">Войти</Button>
          </Link>
        </div>
      </form>  
    </>
  )
  }