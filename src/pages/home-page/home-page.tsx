import styles from "./home-page.module.css";
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const HomePage = ():JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
        </DndProvider>    
      </main>
    </div>
  );
}

export default HomePage;