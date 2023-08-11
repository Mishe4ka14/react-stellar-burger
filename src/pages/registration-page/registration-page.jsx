import styles from './registration-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

export function RegistrationPage() {
  return (
    <>
      <AppHeader/>
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type={'text'} extraClass='mt-4 mb-4' placeholder={'Имя'}/>
        <Input type={'email'} extraClass='mt-4 mb-4' placeholder={'E-mail'}/>
        <Input type={'password'} extraClass='mt-4 mb-4' placeholder={'Пароль'} icon={'ShowIcon'}/>
        <Button htmlType="button" extraClass='mt-4'>Зарегестрироваться</Button>
        <div className={styles.box}>
          <h2 className="text text_type_main-small text_color_inactive">Уже зарегестрированы?</h2>
          <Button htmlType="button" type="secondary" size="small">Войти</Button>
        </div>
      </div>
    </>
  )
}