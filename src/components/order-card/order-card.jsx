import styles from './order-card.module.css'
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const OrderCard = ({order}) => {
  const yesterday = new Date()
  const location = useLocation();
  const ingredients = useSelector(store => store.ingredient.ingredient)

  return(
    <div className={`${styles.card} ${location.pathname === '/profile/orders' ? styles.card_order : ''}`}>
      <div className={styles.info}>
        <p className='text text_type_main-default ml-6 pr-30'>#345678</p>
        <FormattedDate className={` text text_type_main-default pl-30 text_color_inactive ${location.pathname === '/profile/orders' ? styles.data : ''}`} date={yesterday}/>
        <p className='text text_type_main-default text_color_inactive mr-6'>i-GTM+3</p>
      </div>
      <p className='text text_type_main-medium ml-6 mt-6'>Death Star Starship Main бургер</p>
      {location.pathname === '/profile/orders' && <p className='text text_type_main-small ml-6 mt-2'>Готовится</p>}
      <div className={`ml-10 mt-6 pb-6 ${styles.box}`}>
        {ingredients.slice(0, 6).map((ingredients, index) => (
          <>
            <img key={ingredients._id} className={`${styles.rounded_img}`}  style={{zIndex: `${5 - index}`}} src={ingredients.image_mobile} alt="#" />
          </>
        ))}
        <p className={`text text_type_main-small ${styles.number}`}>+{ingredients.length - 6}</p>
        <div className={`ml-10 mt-6 mr-4 ${styles.container}`}>
          <p className='text text_type_main-medium pr-2'>430</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}