import styles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorContext } from '../../services/constructor-context'
import { useContext, useReducer, useEffect } from 'react'
import { getOrderNumber } from '../../utils/burger-api'
import { useState } from 'react'
import Modal from '../modal/modal'
import OrderModal from '../order-details/order-details'
import { useSelector } from 'react-redux'

const BurgerConstructor = () => {


  const {ingredients} = useSelector(store => store.ingredient )
  const [data, setData] = useState(null);

  useEffect(() => {
    if (ingredients) {
      setData(ingredients);
    }
  }, [ingredients]);

  //стейт окна заказа
  const [modalOrder, setModalOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  
  const openModalOrder = () => {
    setModalOrder(true)
  }
  
  const closeModalOrder = () => {
    setModalOrder(false)
  }

  //стейт нажатой кнопки
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleClickButton = () => {
    openModalOrder();
    setIsButtonClicked(true);
  };

  const bun = data.find((item) => item.type === 'bun');
  const bunName = bun ? bun.name : '';

  const initialState = {
    count: 0,
    ids: []
  };

//пишем редьюсер для подсчета суммы заказа и сразу собираем все id
  function reducer(state, action){
    const noBuns = data.filter((item) => item.type !== 'bun')
    switch(action.type){
      case 'change':
        const totalPrice = (bun.price * 2) + noBuns.reduce((a, b) => a + b.price, 0);
        const IDs = [bun._id, ...noBuns.map((item) => item._id)];
        return { count: totalPrice, ids: IDs };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  
  //меняем сумму заказа при изменении данных
  useEffect(() => {
    dispatch({ type: 'change' });
  }, [data]);
  
  const id = state.ids
  const price = state.count; 

  // делаем запрос при нажатой кнопке
  useEffect(() => {
    const getNumber = async () => {
      const res = await getOrderNumber(id);
      const number = res.order.number;
      setOrderNumber(number)
    };
    if (id.length > 0) {
      getNumber();}
    }, [isButtonClicked]);
  
  return(
    <section className={styles.section}> 
      <div className='mr-4 mb-2 mt-2'>  
        <ConstructorElement 
          type="top"
          isLocked={true}
          text={`${bunName.name} (верх)`} 
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={`${styles.scroll} custom-scroll`}>
        {data.map((ingredient) => {
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
      <div className='mr-4 mt-2'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bunName.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={styles.box}>
        <p className={`${styles.price} text text_type_main-large mr-3`}>{price}</p>
        <CurrencyIcon/>
        <div className={styles.btn}>
          <Button htmlType="button" type="primary" size="large" onClick={handleClickButton}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {modalOrder && <Modal handleClose={closeModalOrder} >
        <OrderModal number={orderNumber}/>
      </Modal>}
    </section>
  )
}

export default BurgerConstructor
