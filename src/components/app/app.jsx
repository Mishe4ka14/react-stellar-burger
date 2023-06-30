import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React, { useEffect, useState } from 'react';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredients } from "../../utils/burger-api";
import { ConstructorContext } from "../../services/constructor-context";

function App() {
  const [ingredientsData, setIngredientsData] = useState(null)

  const [modalIngredient, setModalIngredient] = useState(false);
  const [ingredient, setIngredient] = React.useState(null);

  const openModalIngredient = (item) => {
    setModalIngredient(true)
    setIngredient(item)
  }


  const closeModal = () => {
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
        <ConstructorContext.Provider value={ingredientsData}> 
          <main className={styles.main}>
            {ingredientsData !== null && <BurgerIngredients openModal={openModalIngredient}/>}
            {ingredientsData !== null && <BurgerConstructor/>}
          </main>
          {modalIngredient && <Modal handleClose={closeModal} >
            <IngredientDetails props={ingredient}/>
          </Modal>}
        </ConstructorContext.Provider>  
    </div>
  );
}

export default App;
