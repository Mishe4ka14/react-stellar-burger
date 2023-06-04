import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { url } from "../../utils/constanst";
import React, { useEffect, useState } from 'react';
import { async } from "q";
import Modal from "../modal/modal";
import OrderModal from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const [ingredientsData, setIngredientsData] = useState(null)

  const [modalOrder, setModalOrder] = useState(false);
  const [modalIngredient, setModalIngredient] = useState(false);
  const [ingredient, setIngredient] = React.useState({});

  const openModalIngredient = (item) => {
    setModalIngredient(true)
    setIngredient(item)
  }

  const openModalOrder = () => {
    setModalOrder(true)
  }

  const closeModal = () => {
    setModalOrder(false)
    setModalIngredient(false)
  }

  useEffect(() => {
    const getIngredientData = async () => {
      try {const res = await fetch(`${url}`);
          if(!res.ok){
            throw new Error('ОшибОчка при выполнении запроса, чек консоль')
          }    
          const {data} = await res.json(); {/* сразу деструктуризируем результат, извлекая только массив */}
          setIngredientsData(data)
        }
        catch(err){
          console.log(`Ошибка ${err}`)
        }
      }
      getIngredientData();
    }, [])
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        {ingredientsData !== null && <BurgerIngredients openModal={openModalIngredient} data={ingredientsData}/>}
        {ingredientsData !== null && <BurgerConstructor openModal={openModalOrder} data={ingredientsData}/>}
      </main>
      {modalOrder && <Modal handleClose={closeModal} >
        <OrderModal/>
      </Modal>}
      {modalIngredient && <Modal handleClose={closeModal} >
        <IngredientDetails props={ingredient}/>
      </Modal>}
    </div>
  );
}

export default App;
