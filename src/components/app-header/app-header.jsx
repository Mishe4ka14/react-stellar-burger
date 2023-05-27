import { Logo, BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import {styles} from './app-header.module.css'

const AppHeader = () => {
  return(
    <header>
      <BurgerIcon/>
      <ListIcon type="secondary"/>
      <Logo/>
      <ProfileIcon type="secondary"/>
    </header>
  )
}

export default AppHeader