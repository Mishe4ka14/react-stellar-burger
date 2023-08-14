import { Route, Routes } from 'react-router-dom';
import HomePage from "../../pages/home-page/home-page";
import { LoginPage } from '../../pages/login-page/login-page'
import { RegistrationPage } from '../../pages/registration-page/registration-page';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import {React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/actions/auth';
import { ErrorPage } from '../../pages/404-page/404-page';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [])

  return (
    <>
      <Routes location={background || location}>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login"  element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />}/>
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />}/>
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />}/>
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}/>
        <Route path='/ingredients/:ingredientId'
               element={<IngredientDetails />} />
        <Route path='*' element={<ErrorPage/>} />       
      </Routes>

      {background && (
        <>
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <>
                <Modal onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              </>
            }
          />
        </Routes>
        </>
      )}
    </>
    
  );
}

export default App;
