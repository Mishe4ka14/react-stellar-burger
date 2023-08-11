import styles from './login-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

export function LoginPage() {
  return(
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input type={'email'} extraClass='mt-4 mb-4' placeholder={'E-mail'}/>
        <Input type={'password'} extraClass='mt-4 mb-4' placeholder={'Пароль'} icon={'ShowIcon'}/>
        <Button htmlType="button" extraClass='mt-4 mb-20'>Войти</Button>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Вы - новый пользователь?</h2>
          <Button htmlType="button" type="secondary" size="small">Зарегестрироваться</Button>
        </div>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Заьыли пароль?</h2>
          <Button htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
        </div>
      </div>
    </>
  )
}