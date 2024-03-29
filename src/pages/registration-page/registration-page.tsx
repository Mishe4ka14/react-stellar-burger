import styles from './registration-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputHandlers } from '../../hooks/use-input';
import { Link } from 'react-router-dom';
import { registerRequest } from '../../services/actions/auth';
import { useDispatch } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks'
import { AppThunk } from '../../services/types';

export const RegistrationPage = ():JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerFailed = useSelector(store => store.auth.registerFailed); 

  const  {values, handleInputChange} = useInputHandlers({
    email: '', password: '', name: ''
  })

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(values.email.length > 0 || values.name.length > 0 || values.password.length > 0){
      await dispatch(registerRequest(values.email, values.name, values.password) as AppThunk)
      if (!registerFailed) {
        navigate('/');
      }
    }
  }

  return (
    <>
      <AppHeader/>
      <form className={styles.container} onSubmit={handleClick}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type={'text'} extraClass='mt-4 mb-4' placeholder={'Имя'} value={values.name}
        onChange={handleInputChange}
        name="name"/>
        <EmailInput extraClass='mt-4 mb-4' placeholder={'E-mail'} value={values.email}
        onChange={handleInputChange}
        name="email"/>
        <PasswordInput extraClass='mt-4 mb-4' placeholder={'Пароль'} icon={'ShowIcon'} value={values.password}
        onChange={handleInputChange}
        name="password"/>
        <Button htmlType="submit" extraClass='mt-4' >Зарегистрироваться</Button>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Уже зарегистрированы?</h2>
          <Link to='/login'>
            <Button htmlType="button" type="secondary" size="small">Войти</Button>
          </Link>
        </div>
      </form>
    </>
  )
}