import styles from './loader.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const Loader = () => {
  return(
    <div className={styles.container}>
      <h2 className='text text_type_main-large'>Ваш ЗВЕЗДНЫЙ БУРГЕР собирается</h2>
    </div>
  )
}