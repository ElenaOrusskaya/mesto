import "./pages/index.css";
import {
  getUserInfo,
  updateUserInfo,
  getInitialCards,
  updateProfileInfo,
  addNewCard,
  updateAvatar,
} from "./components/API.js";
import { createCard, deleteCard, toggleLike } from "./components/cards.js";
import { openPopup, closePopup, handleEscClose } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  toggleButtonState,
  isValid,
  showInputError,
} from "./components/validation.js";

const placesList = document.querySelector(".places__list");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const imagePopupElement = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formAddCard = document.forms["new-place"];
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");
let currentUserId;
const profileImageContainer = document.querySelector(
  ".profile__image-container"
);
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["update-avatar"];
const avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");

function renderCard(cardData, method = "prepend", currentUserId) {
  const cardElement = createCard({
    cardData,
    deleteCard,
    handleImageClick: openImagePopup,
    toggleLike,
    currentUserId,
  });

  placesList[method](cardElement);
}

editButtonProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);
  // Проверяем валидность данных и устанавливаем состояние кнопки
  const inputList = Array.from(profileForm.querySelectorAll(".popup__input"));
  const formButton = profileForm.querySelector(".popup__button");
  toggleButtonState(inputList, formButton, validationConfig);

  openPopup(popupEditProfile);
});

addButtonProfile.addEventListener("click", () => {
  clearValidation(formAddCard, validationConfig);
  openPopup(popupAdd);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

function openImagePopup(data) {
  imagePopupElement.src = data.link;
  imagePopupElement.alt = data.name;
  imagePopupCaption.textContent = data.name;

  openPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = profileForm.querySelector(".popup__button");
  const initialButtonText = submitButton.textContent; // Сохраняем исходный текст кнопки

  // Меняем текст кнопки на "Сохранение..."
  submitButton.textContent = "Сохранение...";

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  updateProfileInfo(newName, newAbout)
    .then((userData) => {
      // Обновляем данные на странице после успешного ответа от сервера
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;

      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      submitButton.textContent = initialButtonText;
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitButton = formAddCard.querySelector(".popup__button");
  const initialButtonText = submitButton.textContent; // Сохраняем исходный текст кнопки

  // Меняем текст кнопки на "Сохранение..."
  submitButton.textContent = "Сохранение...";

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  // Отправляем данные на сервер
  addNewCard(newCardData.name, newCardData.link)
    .then((cardData) => {
      // Отрисовываем карточку на странице после успешного ответа от сервера
      renderCard(cardData, "prepend", currentUserId);

      // Сбрасываем форму
      formAddCard.reset();
      closePopup(popupAdd);
      // Управляем состоянием кнопки отправки формы
      const inputList = Array.from(
        formAddCard.querySelectorAll(".popup__input")
      );
      const formButton = formAddCard.querySelector(".popup__button");
      toggleButtonState(inputList, formButton, validationConfig);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      submitButton.textContent = initialButtonText;
    });
}

formAddCard.addEventListener("submit", handleAddCardSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);

// Загрузка данных при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
      currentUserId = userData._id;
      // Обновляем информацию о пользователе
      updateUserInfo(userData);

      // Отрисовываем карточки
      cardsData.forEach((card) => {
        renderCard(card, "append", currentUserId);
      });
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных:", err);
    });
});

profileImageContainer.addEventListener("click", () => {
  openPopup(popupAvatar);
});

// Открытие попапа при клике на аватар
profileImageContainer.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
});

// Валидация поля ввода ссылки на аватар
avatarLinkInput.addEventListener("input", () => {
  isValid(avatarForm, avatarLinkInput, validationConfig);
  toggleButtonState(
    [avatarLinkInput],
    avatarForm.querySelector(".popup__button"),
    validationConfig
  );
});

// Обработчик отправки формы обновления аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector(".popup__button");
  const initialButtonText = submitButton.textContent; // Сохраняем исходный текст кнопки

  // Меняем текст кнопки на "Сохранение..."
  submitButton.textContent = "Сохранение...";

  const avatarUrl = avatarLinkInput.value;

  // Убираем проверку через checkImageUrl
  updateAvatar(avatarUrl)
    .then((userData) => {
      const profileAvatar = document.querySelector(".profile__image");
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
      showInputError(
        avatarForm,
        avatarLinkInput,
        "Не удалось обновить аватар.",
        validationConfig
      );
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      submitButton.textContent = initialButtonText;
    });
});
