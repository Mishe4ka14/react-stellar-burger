import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { url } from "../../utils/constanst";
import React, { useEffect, useState } from 'react';
import { async } from "q";


function App() {
  const [ingredientsData, setIngredientsData] = useState(null)
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
        {ingredientsData !== null && <BurgerIngredients data={ingredientsData}/>}
        {ingredientsData !== null && <BurgerConstructor data={ingredientsData}/>}
      </main>
    </div>
  );
}

export default App;
