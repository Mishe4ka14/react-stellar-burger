import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React, { useEffect, useState } from 'react';
import { async } from "q";
import Modal from "../modal/modal";
import OrderModal from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredients } from "../../utils/burger-api";

function App() {
  const [ingredientsData, setIngredientsData] = useState(null)

  const [modalOrder, setModalOrder] = useState(false);
  const [modalIngredient, setModalIngredient] = useState(false);
  const [ingredient, setIngredient] = React.useState(null);

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
     async function getData() {
      const {data} = await getIngredients(); {/*результат запроса деструктаризируем и записываем в state */}
      setIngredientsData(data)
     }
     getData()
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
