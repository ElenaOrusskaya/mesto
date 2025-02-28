// Функция для загрузки данных о пользователе
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-32",
  headers: {
    authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
    "Content-Type": "application/json",
  },
};

// Функция для обработки ответа сервера
const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

// Функция для загрузки данных о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при загрузке данных пользователя:", err);
    });
};

// Функция для загрузки карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при загрузке карточек:", err);
    });
};

// Функция для обновления данных профиля на сервере
export const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при обновлении данных профиля:", err);
    });
};

// Функция для добавления новой карточки на сервер
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    });
};

// Функция для добавления лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при добавлении лайка:", err);
    });
};

// Функция для удаления лайка
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при удалении лайка:", err);
    });
};

// Функция для удаления карточки
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
};

// Функция для обновления аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then(getResponseData)
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
};
