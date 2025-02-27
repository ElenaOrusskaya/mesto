import { addLike, removeLike, deleteCardFromServer } from "./API.js";
import { openPopup } from "./modal.js";

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

  // Если лайкнут, добавляем класс активности
  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Скрываем иконку удаления, если карточка чужая
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  }

  // Добавляем data-атрибуты
  cardElement.dataset.cardId = cardData._id;
  likeButton.dataset.cardId = cardData._id;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  // Обработчик для лайка
  likeButton.addEventListener("click", toggleLike);

  return cardElement;
}

export function deleteCard(cardElement) {
  const cardId = cardElement.dataset.cardId; // Получаем ID карточки

  // Показываем попап подтверждения
  const confirmPopup = document.querySelector(".popup_type_confirm");
  openPopup(confirmPopup);

  // Обработчик подтверждения удаления
  const confirmForm = confirmPopup.querySelector(".popup__form");
  confirmForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    deleteCardFromServer(cardId)
      .then(() => {
        cardElement.remove();
        closePopup(confirmPopup);
      })
      .catch((err) => {
        console.error("Ошибка при удалении карточки:", err);
      });
  });
}

export function toggleLike(evt) {
  const likeButton = evt.target;
  const likeCount = likeButton.nextElementSibling;
  const cardId = likeButton.dataset.cardId;

  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // Выбираем функцию в зависимости от состояния лайка
  const likeAction = isLiked ? removeLike : addLike;

  likeAction(cardId)
    .then((updatedCard) => {
      // Обновляем состояние кнопки лайка
      likeButton.classList.toggle("card__like-button_is-active");

      // Обновляем счётчик лайков
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при лайке:", err);
    });
}
