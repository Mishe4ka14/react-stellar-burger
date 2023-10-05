import { IHeaders, IIngredientResponse, IOptions, IOrderResponse, IOrdersResponse, IRegisterResponse, IResponse } from "../services/types/api";
import { TIngredient, TOrder, TUser } from "../services/types/types";

const NORMA_API: string = 'https://norma.nomoreparties.space/api'
export const WSS_API: string = 'wss://norma.nomoreparties.space/orders'

const checkResponse = <T>(res: Response): Promise<T>=> {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export function getIngredientsRequest():Promise<IIngredientResponse>{
  return fetch(`${NORMA_API}/ingredients`)
  .then(checkResponse<IIngredientResponse>)
}

export function getOrderNumber(ID:Array<string>) {
  return fetch(`${NORMA_API}/orders`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    } as IHeaders,
    body: JSON.stringify({
      "ingredients": ID
 }),
})
  .then(checkResponse<TOrder>);
}

//запрос на регистрацию 
export const registerUser = async (email: string, name:string, password: string) => {
  return fetch(`${NORMA_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    }),
  }).then(checkResponse<IRegisterResponse>)
}

//запрос на авторизацию
export const loginUser = async (email:string, password:string) => {
  return fetch(`${NORMA_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    }),
  }).then(checkResponse<IRegisterResponse>)
}

//запрос на выход
export const logOutUser = async (token:string) => {
  return await fetch(`${NORMA_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "token": token
    }),
  });
}

//запрос на получание данные пользователя
export const getUserInfo = () => {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem("accessToken"),
    } as IHeaders,
  }) as Promise<IRegisterResponse>;
}

//запрос на изменение данных пользователя
export const addUserInfo = (name:string, email:string, password:string) => {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem("accessToken"),
    } as IHeaders,
    body: JSON.stringify({
      email: email,
      name: name,
      password: password
    }),
  }) as Promise<IRegisterResponse>
}

//запрос на восстановление пароля
export const forgotPasswordRequest = (email:string) => {
  return fetch(` ${NORMA_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "email": email,
    }),
  }).then(checkResponse)
}

//запрос получания заказа
export const getOrder = (number: string): Promise<IOrdersResponse> => {
  return fetch(`${NORMA_API}/orders/${number}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse<IOrdersResponse>);
}


//запрос на изменение пароля
export const resetPasswordRequest = (password:string, token:string) => {
  return fetch(`${NORMA_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    }),
  }).then(checkResponse)
}


//запрос на обновление токена
export const refreshToken = ():Promise<IResponse> => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkResponse<IResponse>);
};

//функция обертка вокруг запроса
export const fetchWithRefresh = async (url:string, options: IOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if(err instanceof Error) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }}
};


