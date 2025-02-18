const cardTemplate = document.querySelector("#card-template").content;

export function createCard({cardData, deleteCard, handleImageClick, toggleLike}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  cardImage.addEventListener("click", () => handleImageClick(cardData));
  likeButton.addEventListener("click", toggleLike);

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
