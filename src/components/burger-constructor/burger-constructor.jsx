import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useCallback } from 'react';
import { getOrder } from '../../services/actions/constructor';
import { useSelector, useDispatch } from 'react-redux';
import { MODAL_ORDER } from '../../services/actions/modal';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/constanst';
import { addIngredient, changeIngedients } from '../../services/actions/constructor';
import Modal from '../modal/modal';
import OrderModal from '../order-details/order-details';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../loader/loader';

const BurgerConstructor = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { constructor, bun } = useSelector((store) => store.ingredient);
  const user = useSelector((store) => store.auth.user)
  const { modalType } = useSelector((store) => store.modal);

  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = () => {
    navigate(-1);
  };

  const submitOrder = () => {
    const noBuns = constructor.filter(item => item.type !== 'bun');
    const ids = [bun?._id, ...noBuns.map(item => item._id)];
    
    if (ids.length > 0) {
      if (user) {
        setIsLoading(true); // Показываем прелоадер перед запросом
        dispatch(getOrder(ids))
          .catch(error => {
            console.log(`Error: ${error}`);
          });
      } else {
        navigate('/login');
      }
    }
  };
  
  useEffect(() => {
    let isMounted = true;
  
    return () => {
      isMounted = false;
    };
  }, []);
  
  const [price, setPrice] = useState(0);
  
  useEffect(() => {
    let totalPrice = constructor.reduce((acc, ingredient) => acc + ingredient.price, 0);
    if (bun) {
      totalPrice += bun.price * 2;
    }
    setPrice(totalPrice);
  }, [constructor, bun]);
  
  const [, dropTarget] = useDrop({
    accept: ItemTypes.INGREDIENT,
    drop: ingredient => {
      dispatch(addIngredient(ingredient));
    },
  });
  
  const change = useCallback((dragIndex, hoverIndex) => {
    dispatch(changeIngedients(dragIndex, hoverIndex));
  }, []);

  return (
    <section className={styles.section} ref={dropTarget}>
      {bun && (
        <div className="mr-4 mb-2 mt-2">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={`${styles.scroll} custom-scroll`}>
        {constructor
          .filter((ingredient) => ingredient.type !== 'bun')
          .map((ingredient, index) => 
          <ConstructorItem  key={uuidv4()} ingredient={ingredient} index={index} swap={change}/>
          )}
      </ul>
      {bun && (
        <div className="mr-4 mt-2">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={styles.box}>
        <p className={`${styles.price} text text_type_main-large mr-3`}>{price}</p>
        <CurrencyIcon />
        <div className={styles.btn}>
          <Button htmlType="button" type="primary" size="large" onClick={submitOrder}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {modalType === MODAL_ORDER && (
        <Modal onClose={handleModalClose}>
          <OrderModal />
        </Modal>
      )}
       {isLoading && <Loader />}
    </section>
  );
};

export default BurgerConstructor;
