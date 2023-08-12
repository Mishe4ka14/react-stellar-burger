import { Route, Routes } from 'react-router-dom';
import HomePage from "../../pages/home-page/home-page";
import { LoginPage } from '../../pages/login-page/login-page'
import { RegistrationPage } from '../../pages/registration-page/registration-page';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile-page/profile-page';
function App() {
  return (
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
  );
}

export default App;
