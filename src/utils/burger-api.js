const NORMA_API = 'https://norma.nomoreparties.space/api'

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
  .then(checkResponse)
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

