import styles from './login-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useInputHandlers } from '../../hooks/use-input';
import { useDispatch } from '../../hooks/hooks'
import { loginRequest } from '../../services/actions/auth';
import { useNavigate } from 'react-router-dom';
import { AppThunk } from '../../services/types';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const  {values, handleInputChange} = useInputHandlers({
    email: '', password: ''
  })


const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (values.email && values.password) {
    try { 
      await dispatch(loginRequest(values.email, values.password));
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  }
};


  return(
    <>
      <AppHeader/>
      <form className={styles.container} onSubmit={handleLogin}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput extraClass='mt-4 mb-4' placeholder={'E-mail'} value={values.email} onChange={handleInputChange}
        name="email"/>
        <PasswordInput extraClass='mt-4 mb-4' placeholder={'Пароль'} icon={'ShowIcon'} value={values.password}
        onChange={handleInputChange}
        name="password"/>
        <Button htmlType="submit" extraClass='mt-4 mb-20'>Войти</Button>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Вы - новый пользователь?</h2>
          <Link to='/register'>
            <Button htmlType="button" type="secondary" size="small">Зарегистрироваться</Button>
          </Link>
        </div>
        <div className={styles.box}>
            <h2 className="text text_type_main-small text_color_inactive">Забыли пароль?</h2>
          <Link to='/forgot-password'>
            <Button htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
          </Link>
        </div>
      </form>
    </>
  )
}