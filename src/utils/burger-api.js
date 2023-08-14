const NORMA_API = 'https://norma.nomoreparties.space/api'

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
  return fetchWithRefresh(`${NORMA_API}/auth/user`)
  .then(checkResponse)
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


