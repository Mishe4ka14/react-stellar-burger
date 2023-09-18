import styles from './loader.module.css';

export const Loader = ():JSX.Element => {
  return(
    <div className={styles.container}>
      <h2 className='text text_type_main-large'>Ваш ЗВЕЗДНЫЙ БУРГЕР собирается</h2>
    </div>
  )
}