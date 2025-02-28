import { addLike, removeLike } from "./API.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard({
  cardData,
  deleteCard,
  handleImageClick,
  toggleLike,
  currentUserId,
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Отображаем количество лайков
  likeCount.textContent = cardData.likes.length;

  // Проверяем, лайкнул ли текущий пользователь эту карточку
  const isLikedByUser = cardData.likes.some(
    (like) => like._id === currentUserId
  );

  // Обновляем состояние кнопки лайка
  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  // Скрываем иконку удаления, если карточка чужая
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => {
    deleteCard(cardData._id, cardElement);
  });

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  // Обработчик для лайка
  likeButton.addEventListener("click", () => {
    toggleLike(cardData._id, likeButton, likeCount, currentUserId);
  });

  return cardElement;
}

export function toggleLike(cardId, likeButton, likeCount, currentUserId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const likeAction = isLiked ? removeLike : addLike;

  likeAction(cardId)
    .then((updatedCard) => {
      console.log("Ответ от сервера:", updatedCard);

      // Проверяем, есть ли лайк от текущего пользователя
      const isLikedByUser = updatedCard.likes.some(
        (like) => like._id === currentUserId
      );

      // Обновляем состояние кнопки лайка
      if (isLikedByUser) {
        likeButton.classList.add("card__like-button_is-active");
      } else {
        likeButton.classList.remove("card__like-button_is-active");
      }

      // Обновляем счётчик лайков
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при лайке:", err);
    });
}
