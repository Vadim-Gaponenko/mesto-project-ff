// @todo: Темплейт карточки
import { createCard, deleteCard, likeCard } from "./card.js";
import "./pages/index.css";
import { initialCards } from "./cards";
import { openPopupHandle, closePopupHandler, openImeg } from "./modal.js";
const editProfile = document.querySelector(".profile__edit-button");
const profileAdd = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupCardName = document.querySelector(".popup__input_type_card-name");
const popupCaardUrl = document.querySelector(".popup__input_type_url");
const addForm = document.forms["edit-profile"];
const addPlace = document.forms["new-place"];
// переменные для импорта в card.js
const cardTemplate = document.querySelector("#card-template");
// переменные для импорта в modal.js
const popups = document.querySelectorAll(".popup");
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

initialCards.forEach((iteam) => {
  const cardItem = createCard(iteam, deleteCard, likeCard, openImeg);
  placesList.append(cardItem);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = inputName.value;
  const descriptionValue = inputDescription.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  closePopupHandler(popupTypeEdit);
  evt.target.reset();
}

function handlePlaceSubmit(evt) {
  evt.preventDefault();

  const cardName = popupCardName.value;
  const cardUrl = popupCaardUrl.value;
  const newCard = {
    name: cardName,
    link: cardUrl,
  };
  const newCardAdd = createCard(newCard, deleteCard, likeCard, openImeg);
  placesList.prepend(newCardAdd);
  closePopupHandler(popupTypeCard);
  evt.target.reset();
}
// Оброботчики

addForm.addEventListener("submit", handleFormSubmit);

addPlace.addEventListener("submit", handlePlaceSubmit);

profileAdd.addEventListener("click", () => {
  openPopupHandle(popupTypeCard);
});

editProfile.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopupHandle(popupTypeEdit);
});

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest(".popup__close");
  const popup = event.target.closest(".popup");

  if (closeButton && popup) {
    closePopupHandler(popup);
  }
});

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest(".popup__close");
  const popup = event.target.closest(".popup");
  const contentPopup = event.target.closest(".popup__content");
  if (closeButton || (popup && !contentPopup)) {
    closePopupHandler(popup);
  }
});

export { popups, popupCaption, popupImage, popupTypeImage, cardTemplate };
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
