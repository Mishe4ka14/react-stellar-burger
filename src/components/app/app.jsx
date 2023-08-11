import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../../pages/home-page/home-page";
import { LoginPage } from '../../pages/login-page/login-page'
import { RegistrationPage } from '../../pages/registration-page/registration-page';
function App() {
  return (
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
      </Routes>
  );
}

export default App;
