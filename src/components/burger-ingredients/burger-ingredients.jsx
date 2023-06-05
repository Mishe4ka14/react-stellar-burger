import styles from './burger-ingredients.module.css'
import { Tab, } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import IngredientList from '../ingredient-list/ingredient-list'
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'
const BurgerIngredients = ({data, openModal}) => { 
  const [current, setCurrent] = React.useState('bun')
  const buns = data.filter((ingredient) => ingredient.type === 'bun');
  const sauces = data.filter((ingredient) => ingredient.type === 'sauce');
  const mains = data.filter((ingredient) => ingredient.type === 'main');
  return(
    <section className={styles.section}>
      <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.scroll} custom-scroll`}>
          <h3 className="text text_type_main-medium mb-6">Булки</h3>
          <IngredientList filter={buns} type="bun" openModal={openModal}/>
          <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
          <IngredientList filter={sauces} type="sauce" openModal={openModal}/>
          <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
          <IngredientList filter={mains} type="main" openModal={openModal}/>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  openModal: PropTypes.func.isRequired
}

export default BurgerIngredients