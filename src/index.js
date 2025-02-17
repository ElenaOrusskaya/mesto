import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, toggleLike } from "./components/cards.js";
import { openPopup, closePopup, handleEscClose } from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const imagePopupElement = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");
const formElement = popupEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formAddCard = popupAdd.querySelector(".popup__form");
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

function renderCards(cards) {
  cards.forEach((cardItem) => {
    const cardElement = createCard(
      cardItem,
      deleteCard,
      openImagePopup,
      toggleLike
    );
    placesList.append(cardElement);
  });
}

renderCards(initialCards);

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEdit);
});
addButton.addEventListener("click", () => openPopup(popupAdd));

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

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const newCard = createCard(newCardData, deleteCard, openImagePopup);
  placesList.prepend(newCard);

  closePopup(popupAdd);

  formAddCard.reset();
}

formAddCard.addEventListener("submit", handleAddCardSubmit);
