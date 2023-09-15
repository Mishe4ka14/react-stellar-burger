const NORMA_API = 'https://norma.nomoreparties.space/api'
export const WSS_API = 'wss://norma.nomoreparties.space/orders'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export function getIngredientsRequest() {
  return fetch(`${NORMA_API}/ingredients`)
  .then(checkResponse)
}

export function getOrderNumber(ID) {
  return fetch(`${NORMA_API}/orders`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      "ingredients": ID
 }),
})
  .then(checkResponse);
}

//запрос на регистрацию 
export const registerUser = async (email, name, password) => {
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
  }).then(checkResponse)
}

//запрос на авторизацию
export const loginUser = async (email, password) => {
  return fetch(`${NORMA_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    }),
  }).then(checkResponse)
}

//запрос на выход
export const logOutUser = async (token) => {
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
    },
  })
}

//запрос на изменение данных пользователя
export const addUserInfo = (name, email, password) => {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password
    }),
  })
}

//запрос на восстановление пароля
export const forgotPasswordRequest = (email) => {
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
export const getOrder = (number) => {
  return fetch(`${NORMA_API}/orders/${number}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse)
}


//запрос на изменение пароля
export const resetPasswordRequest = (password, token) => {
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
export const refreshToken = () => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkResponse);
};

//функция обертка вокруг запроса
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
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
  }
};


