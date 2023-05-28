import styles from './burger-constructor.module.css'
import {ConstructorElement, LockIcon, CurrencyIcon, DragIcon, DeleteIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {data} from '../../utils/data'

const BurgerConstructor = () => {
  return(
    <section> 
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={data[0].image}
      />
      <ul className={`${styles.scroll} custom-scroll`} style={{overflowY: 'scroll', msOverflowX: 'hidden'}}>
        {data.map((ingredient) => {
          if (ingredient.__v === 1 ){   { /*условие нужно только для отображения НЕКОТОРЫХ ингредиентов пока нет запроса к API и взаимодействия с ингредиентами */} 
            return  <ConstructorElement
                      key={ingredient._id}
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                    />
            }
          return null;
        })}
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={data[0].image}
        />
    </section>
  )
}

export default BurgerConstructor
