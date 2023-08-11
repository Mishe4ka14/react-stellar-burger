import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider, createStoreHook } from "react-redux";
import { rootReducer } from "./services/reducers";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import HomePage from "./pages/home-page/home-page";
import { RegistrationPage } from "./pages/registration-page/registration-page";
import { LoginPage } from "./pages/login-page/login-page";

const composeEnhancers =
typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk));

//создаем хранилище с расширением devtools
const store = createStore(rootReducer, enhancer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
  <BrowserRouter>
        <App/>
  </BrowserRouter>
  
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
