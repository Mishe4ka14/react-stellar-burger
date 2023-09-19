import styles from './404-page.module.css'
import AppHeader from '../../components/app-header/app-header'
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';

export const ErrorPage = ():JSX.Element => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }
  return(
    <>
      <AppHeader/>
      <div className={styles.page}>
        <div className={styles.box}>
          <h1 className="text text_type_main-large" >УПС... ОШИБОЧКА 404, ТАКОЙ СТРАНИЦЫ НЕТ</h1>
          <Button onClick={handleBack} htmlType="button">Назад</Button>
        </div>
      </div>
    </>
  )
}