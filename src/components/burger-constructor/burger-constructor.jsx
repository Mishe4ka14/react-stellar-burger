import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = ({data, openModal}) => {
  return(
    <section className={styles.section}> 
      <div className='mr-4 mb-2 mt-2'>  
        <ConstructorElement 
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <ul className={`${styles.scroll} custom-scroll`}>
        {data.map((ingredient) => {
            return (
              <li className={styles.container} key={ingredient._id}>
                <DragIcon type='primary'/>
                <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image}/>
              </li>
            );
        })}
      </ul>
      <div className='mr-4 mt-2'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <div className={styles.box}>
        <p className={`${styles.price} text text_type_main-large mr-3`}>610</p>
        <CurrencyIcon/>
        <div className={styles.btn}>
          <Button htmlType="button" type="primary" size="large" onClick={() => openModal()}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BurgerConstructor
