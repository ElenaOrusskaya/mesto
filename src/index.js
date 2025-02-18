import "./pages/index.css";
import { initialCards } from "./components/initialCards.js";
import { createCard, deleteCard, toggleLike } from "./components/cards.js";
import { openPopup, closePopup, handleEscClose } from "./components/modal.js";

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

function renderCard(cardData, method = "prepend") {
  const cardElement = createCard({
    cardData,
    deleteCard,
    handleImageClick: openImagePopup,
    toggleLike,
  });

  placesList[method](cardElement);
}

initialCards.forEach((cardItem) => renderCard(cardItem, "append"));

editButtonProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
});

addButtonProfile.addEventListener("click", () => openPopup(popupAdd));

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

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCardData, "prepend");

  closePopup(popupAdd);
  
  formAddCard.reset();
}

formAddCard.addEventListener("submit", handleAddCardSubmit);
