import styles from './burger-ingredients.module.css'
import {Counter, Tab, } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import IngredientList from '../ingredient-list/ingredient-list'


const BurgerIngredients = () => { 
  const [current, setCurrent] = React.useState('one')
  return(
    <section className={styles.section}>
      <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.scroll} custom-scroll`} style={{overflowY: 'scroll', msOverflowX: 'hidden'}}>
          <h3 className="text text_type_main-medium mt-10 mb-6">Булки</h3>
          <IngredientList type="bun"/>
          <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
          <IngredientList type="sauce"/>
          <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
          <IngredientList type="main"/>
      </ul>
    </section>
  )
}

export default BurgerIngredients