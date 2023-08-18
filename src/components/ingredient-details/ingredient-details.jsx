import {React, useState, useEffect} from 'react'
import styles from './ingredient-details.module.css'
import { useLocation } from 'react-router-dom';
import { getIngredientsRequest } from '../../utils/burger-api';
import { useParams } from 'react-router-dom';
import AppHeader from '../app-header/app-header';

const IngredientDetails = () => {
  const { ingredientId } = useParams(); 

  const location = useLocation();
  const background = location.state && location.state.background;

  const [ingredient, setIngredient] = useState({});

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await getIngredientsRequest();
        const ingredient = response.data.find(item => item._id === ingredientId);
        if (ingredient) {
          setIngredient(ingredient);
        }
      } catch (error) {
        console.error('Error fetching ingredient:', error);
      }
    };
    fetchIngredient();
  }, [ingredientId]);

  return(
    <>
      {background ? null : <AppHeader />}
      <div className={background ? null : styles.page}>
        <h2 className="text text_type_main-large mt-5 ml-10">Детали ингредиента</h2>
        <section className={styles.container}>
          <img src={ingredient.image_large} alt={ingredient.name} />
          <h3 className="text text_type_main-medium mt-4">{ingredient.name}</h3>
          <ul className={styles.box}>
            <li className={styles.info}>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{ingredient.calories}</p>
            </li>
            <li className={styles.info}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{ingredient.proteins}</p>
            </li>
            <li className={styles.info}>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{ingredient.fat}</p>
            </li>
            <li className={styles.info}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className={`${styles.number} text text_type_main-default text_color_inactive`}>{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </section>
      </div>
  </>
  )
}



export default IngredientDetails