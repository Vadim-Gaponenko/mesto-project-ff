// @todo: Темплейт карточки
import { createCard, deleteCardServer, clickLike } from "./card.js";
import "../pages/index.css";
import { initialCards } from "./cards";
import {
  openPopup,
  closePopupHandler,
  handleCloseByOverlayClick,
} from "./modal.js";
import {
  getCards,
  getUserData,
  editMyProfile,
  createCardNew,
  updateMyAvatar,
} from "./api.js";

import { enableValidation, clearValidation } from "./validation.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const profileAdd = document.querySelector(".profile__add-button");
const battonAvatar = document.querySelector(".avatar__button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeCard = document.querySelector(".popup_type_new-card");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const popupCardName = document.querySelector(".popup__input_type_card-name");
const popupCaardUrl = document.querySelector(".popup__input_type_url");
const nameInputAvatar = document.querySelector(".popup__input_type_avatar");
const addForm = document.forms["edit-profile"];
const addPlace = document.forms["new-place"];
const AddAvatar = document.forms["edit-avatar"];
const popupList = document.querySelectorAll(".popup");
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const closeButtonList = document.querySelectorAll(".popup__close");
let userId = "";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
function setButtonText(buttonSave, text) {
  buttonSave.textContent = text;
}

Promise.all([getCards(), getUserData()])
  .then(([cards, userData]) => {
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    console.log(cards);
    cards.forEach((item) => {
      const cardItem = createCard(
        item,
        deleteCardServer,
        clickLike,
        openImagePopup,
        userId
      );

      cardsContainer.append(cardItem);
    });
  })
  .catch((error) => {
    console.log(error);
  });

function handleFormSubmitProfile(evt) {
  setButtonText(evt.submitter, "Сохранение...");
  evt.preventDefault();
  editMyProfile(inputName.value, inputDescription.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopupHandler(popupTypeEdit);
      clearValidation(popupTypeEdit, validationConfig);
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setButtonText(evt.submitter, "Сохранить"));
}

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, "Сохранение...");
  createCardNew({
    name: popupCardName.value,
    link: popupCaardUrl.value,
  })
    .then((newCard) => {
      const newCardAdd = createCard(
        newCard,
        deleteCardServer,
        clickLike,
        openImagePopup,
        userId
      );
      cardsContainer.prepend(newCardAdd);
      closePopupHandler(popupTypeCard);
      clearValidation(popupTypeCard, validationConfig);
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setButtonText(evt.submitter, "Создать"));
}
function handleAvatarSubmit(evt) {
  setButtonText(evt.submitter, "Сохранение...");
  evt.preventDefault();
  updateMyAvatar({ avatar: nameInputAvatar.value })
    .then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar})`;
      closePopupHandler(popupTypeAvatar);
      clearValidation(popupTypeAvatar, validationConfig);
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setButtonText(evt.submitter, "Сохранить"));
}
enableValidation(validationConfig);
// Оброботчики

addForm.addEventListener("submit", (evt) => {
  clearValidation(popupTypeCard, validationConfig);
  handleFormSubmitProfile(evt);
});

addPlace.addEventListener("submit", handlePlaceSubmit);
AddAvatar.addEventListener("submit", (evt) => {
  clearValidation(popupTypeAvatar, validationConfig);
  handleAvatarSubmit(evt);
});

function openPopupProfile() {
  clearValidation(popupTypeEdit, validationConfig);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
}

function openPopupAddNewCard() {
  openPopup(popupTypeCard);
}

function openPopupAvatar() {
  openPopup(popupTypeAvatar);
}

profileAdd.addEventListener("click", openPopupAddNewCard);
battonAvatar.addEventListener("click", openPopupAvatar);

buttonEditProfile.addEventListener("click", openPopupProfile);

closeButtonList.forEach((el) => {
  el.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    if (popup) {
      closePopupHandler(popup);
    }
  });
});
popupList.forEach((el) => {
  el.addEventListener("click", handleCloseByOverlayClick);
});
function openImagePopup(item) {
  popupImage.src = item.src;
  popupImage.alt = item.alt;
  popupCaption.textContent = item.alt;
  openPopup(popupTypeImage);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
