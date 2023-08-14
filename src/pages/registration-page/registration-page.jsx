import styles from './registration-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../utils/use-input';
import { Link } from 'react-router-dom';
import { registerRequest } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector(store => store);
  const user = useSelector(store => store.auth);

  const  {values, handleInputChange} = useInputHandlers({
    email: '', password: '', name: ''
  })

  const handleClick = async (e) => {
    e.preventDefault();
    // const { email, name, password } = values;
    await dispatch(registerRequest(values.email, values.name, values.password))
    console.log(user)
    if (!store.auth.registerFailed) {
      navigate('/');
    }
  }

  return (
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type={'text'} extraClass='mt-4 mb-4' placeholder={'Имя'} value={values.name}
        onChange={handleInputChange}
        name="name"/>
        <EmailInput type={'email'} extraClass='mt-4 mb-4' placeholder={'E-mail'} value={values.email}
        onChange={handleInputChange}
        name="email"/>
        <PasswordInput type={'password'} extraClass='mt-4 mb-4' placeholder={'Пароль'} icon={'ShowIcon'} value={values.password}
        onChange={handleInputChange}
        name="password"/>
        <Button htmlType="button" extraClass='mt-4'onClick={handleClick} >Зарегистрироваться</Button>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Уже зарегистрированы?</h2>
          <Link to='/login'>
            <Button htmlType="button" type="secondary" size="small">Войти</Button>
          </Link>
        </div>
      </div>
    </>
  )
}