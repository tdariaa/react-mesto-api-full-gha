export const BASE_URL = 'http://localhost:4000';

function getResponseData(res) {
  console.log(res.ok, res.status);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => {
      return getResponseData(res)
    })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => {
      return getResponseData(res)
    });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${jwt}`,
    },
    credentials: 'include'
  })
    .then((res) => {
      return getResponseData(res)
    })
};

export const logout = () => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  })
}