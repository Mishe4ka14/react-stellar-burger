import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React, { useEffect, useState } from 'react';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {  getIngredientsRequest } from "../../utils/burger-api";
import { ConstructorContext } from "../../services/constructor-context";
import { useSelector } from "react-redux";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
          <main className={styles.main}>
            <BurgerIngredients/>
            {/* {ingredients && <BurgerConstructor/>} */}
          </main>
    </div>
  );
}

export default App;
