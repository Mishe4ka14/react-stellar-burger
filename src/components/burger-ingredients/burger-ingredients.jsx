import styles from './burger-ingredients.module.css'
import { Tab, } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import IngredientList from '../ingredient-list/ingredient-list'
import { useEffect } from 'react'
import {  useSelector } from 'react-redux';

const BurgerIngredients = () => { 
  
  const {ingredient} = useSelector(store => store.ingredient)
  const data = ingredient;
  const buns = data.filter((ingredient) => ingredient.type === 'bun');
  const sauces = data.filter((ingredient) => ingredient.type === 'sauce');
  const mains = data.filter((ingredient) => ingredient.type === 'main');
  
  const [activeTab, setActiveTab] = React.useState('bun');

    useEffect(() => {
      //обработчик события прокрутки
      const handleScroll = () => {
        const sections = ['.bun', '.sauce', '.main'];

        //вычисляем расстояние до каждой секции
        const distances = sections.map((section) => {
          const element = document.querySelector(section);
          const distance = Math.abs(element.getBoundingClientRect().top - 90);
          return { section, distance };
        });
        
        //находим блмжайшую секцию
        const closestSection = distances.reduce((closest, current) =>
          current.distance < closest.distance ? current : closest
        );
        
        //устанавливаем активную ближайшую секцию
        setActiveTab(closestSection.section.slice(1));
      };
    
      const scrollWrapper = document.querySelector('.custom-scroll');
      scrollWrapper.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        scrollWrapper.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return(
    <section className={styles.section}>
      <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={activeTab === 'bun'} onClick={() => setActiveTab('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={activeTab === 'sauce'} onClick={() => setActiveTab('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={activeTab === 'main'} onClick={() => setActiveTab('main')}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.scroll} custom-scroll`}>
          <h3 className="bun text text_type_main-medium mb-6">Булки</h3>
          <IngredientList filter={buns} type="bun"/>
          <h3 className="sauce text text_type_main-medium mt-10 mb-6">Соусы</h3>
          <IngredientList filter={sauces} type="sauce"/>
          <h3 className="main text text_type_main-medium mt-10 mb-6">Начинки</h3>
          <IngredientList filter={mains} type="main"/>
      </ul>
    </section>
  )
}


export default BurgerIngredients