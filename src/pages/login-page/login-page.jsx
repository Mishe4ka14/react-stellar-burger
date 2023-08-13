import styles from './login-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useInputHandlers } from '../../utils/use-input';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../services/actions/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector(store => store);
  
  const  [inputValues, handleInputChange ] = useInputHandlers()

  const handleLogin = (e) => {
    e.preventDefault();
        dispatch(
            loginRequest(inputValues.email, inputValues.password)
        )
        .then(() => {
          if (store.auth.loginFailed = false){
            console.log(store.auth.loginFailed)
            navigate('/');
          }
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
};

  return(
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input type={'email'} extraClass='mt-4 mb-4' placeholder={'E-mail'} value={inputValues.email} onChange={handleInputChange}
        name="email"/>
        <Input type={'password'} extraClass='mt-4 mb-4' placeholder={'Пароль'} icon={'ShowIcon'} value={inputValues.password}
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