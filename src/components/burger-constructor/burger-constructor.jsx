import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useContext, useReducer, useEffect } from 'react'
import { getOrder } from '../../services/actions/constructor'
import { useState } from 'react'
import Modal from '../modal/modal'
import OrderModal from '../order-details/order-details'
import { useSelector, useDispatch } from 'react-redux'
import { MODAL_ORDER } from '../../services/actions/modal'


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {ingredient} = useSelector(store => store.ingredient)
  const { modalType } = useSelector(store => store.modal)

  const bun = ingredient.find((item) => item.type === 'bun')

    const submitOrder = () => {
    const bun = ingredient.find((item) => item.type === 'bun');
    const noBuns = ingredient.filter((item) => item.type !== 'bun')
    const IDs = [bun._id, ...noBuns.map((item) => item._id)];
    if(IDs.length > 0) {
      dispatch(getOrder(IDs))
    }
  }

  const [price, setPrice] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    ingredient.map(ingredient => (totalPrice += ingredient.price))
    if (bun) {
        totalPrice += (bun.price * 2)
    }
    setPrice(totalPrice);
    }, [ingredient, bun])

  return(
    <section className={styles.section}>
      {bun &&
      <div className='mr-4 mb-2 mt-2'>  
        <ConstructorElement 
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`} 
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      } 
      <ul className={`${styles.scroll} custom-scroll`}>
        {ingredient.map((ingredient) => {
          if(ingredient.type !== 'bun'){
            return (
               <li className={styles.container} key={ingredient._id}>
                 <DragIcon type='primary'/>
                <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image}/>
              </li>
            );
            }  
        })}
      </ul>
      {bun &&
      <div className='mr-4 mt-2'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      }
      <div className={styles.box}>
        <p className={`${styles.price} text text_type_main-large mr-3`}>{price}</p>
        <CurrencyIcon/>
        <div className={styles.btn}>
          <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
            Оформить заказ
          </Button>
        </div>
      </div>
      { modalType === MODAL_ORDER &&
                <Modal>
                    <OrderModal />
                </Modal>
            }  
    </section>
  )
}

export default BurgerConstructor
