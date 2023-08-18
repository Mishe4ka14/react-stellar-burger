import styles from './login-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useInputHandlers } from '../../hooks/use-input';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../services/actions/auth';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const  {values, handleInputChange} = useInputHandlers({
    email: '', password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      dispatch(loginRequest(values.email, values.password))
        .then((res) => {
          if (res && res.success) {
            navigate('/');
          }
        })
        .catch(err => {
          console.log(`Error: ${err}`);
        });
    }
  };

  return(
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput type={'email'} extraClass='mt-4 mb-4' placeholder={'E-mail'} value={values.email} onChange={handleInputChange}
        name="email"/>
        <PasswordInput type={'password'} extraClass='mt-4 mb-4' placeholder={'Пароль'} icon={'ShowIcon'} value={values.password}
        onChange={handleInputChange}
        name="password"/>
        <Button onClick={handleLogin} htmlType="button" extraClass='mt-4 mb-20'>Войти</Button>
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
      </div>
    </>
  )
}