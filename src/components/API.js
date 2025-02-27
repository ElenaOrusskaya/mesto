// Функция для загрузки данных о пользователе
export const getUserInfo = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-32/users/me", {
    headers: {
      authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных пользователя:", err);
    });
};

// Функция для загрузки карточек
export const getInitialCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-32/cards", {
    headers: {
      authorization: "e7004724-17d7-442c-8602-b7cc109a5dba", 
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке карточек:", err);
    });
};

// Функция для обновления данных на странице
export const updateUserInfo = (userData) => {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileAvatar = document.querySelector(".profile__image");

  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
};

// Функция для обновления данных профиля на сервере
export const updateProfileInfo = (name, about) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-32/users/me", {
    method: "PATCH",
    headers: {
      authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении данных профиля:", err);
    });
};

// Функция для добавления новой карточки на сервер
export const addNewCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-32/cards", {
    method: "POST",
    headers: {
      authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    });
};

// Функция для добавления лайка
export const addLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-32/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для удаления лайка
export const removeLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-32/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Функция для удаления карточки
export const deleteCardFromServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для обновления аватара
export const updateAvatar = (avatarUrl) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-32/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "e7004724-17d7-442c-8602-b7cc109a5dba",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
};
