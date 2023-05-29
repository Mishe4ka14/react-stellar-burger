import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {data} from '../../utils/data'

const BurgerConstructor = () => {
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
      <ul className={`${styles.scroll} custom-scroll`} style={{overflowY: 'scroll', msOverflowX: 'hidden'}}>
        {data.map((ingredient) => {
          if (ingredient.__v === 1 ){   { /*условие нужно только для отображения некоторых ингредиентов пока нет запроса к API и взаимодействия с ингредиентами */} 
            return (
              <li className={styles.container} key={ingredient._id}>
                <DragIcon type='primary'/>
                <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image}/>
              </li>
            );
        }
        return null;
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
          <Button htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BurgerConstructor
