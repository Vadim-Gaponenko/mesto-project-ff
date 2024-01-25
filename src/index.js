// @todo: Темплейт карточки
import { createCard, deleteCardServer, clickLike } from "./card.js";
import "./pages/index.css";
import { initialCards } from "./cards";
import { openPopupHandle, closePopupHandler, openImeg } from "./modal.js";
import {
  getCards,
  getUserData,
  editMyProfile,
  createCardNew,
  updateMyAvatar,
} from "./api.js";
import { enableValidation, clearValidation } from "./validation.js";

const editProfile = document.querySelector(".profile__edit-button");
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
// переменные для импорта в card.js
const cardTemplate = document.querySelector("#card-template");
// переменные для импорта в modal.js
const popups = document.querySelectorAll(".popup");
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");
let userId = "";
//валидация переменные

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
function rendering(buttonSave, condition) {
  buttonSave.textContent = condition;
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
        openImeg,
        userId
      );

      placesList.append(cardItem);
    });
  })
  .catch((error) => {
    console.log(error);
  });

function handleFormSubmit(evt) {
  rendering(evt.submitter, "Сохранение...");
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
    .finally(() => rendering(evt.submitter, "Сохранить"));
}

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  rendering(evt.submitter, "Сохранение...");
  createCardNew({
    name: popupCardName.value,
    link: popupCaardUrl.value,
  })
    .then((newCard) => {
      const newCardAdd = createCard(
        newCard,
        deleteCardServer,
        clickLike,
        openImeg,
        userId
      );
      placesList.prepend(newCardAdd);
      closePopupHandler(popupTypeCard);
      clearValidation(popupTypeCard, validationConfig);
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => rendering(evt.submitter, "Создать"));
}
function handleAvatarSubmit(evt) {
  rendering(evt.submitter, "Сохранение...");
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
    .finally(() => rendering(evt.submitter, "Сохранить"));
}
enableValidation(validationConfig);
// Оброботчики
enableValidation(validationConfig);
addForm.addEventListener("submit", handleFormSubmit);

addPlace.addEventListener("submit", handlePlaceSubmit);
AddAvatar.addEventListener("submit", handleAvatarSubmit);

profileAdd.addEventListener("click", () => {
  openPopupHandle(popupTypeCard);
});
battonAvatar.addEventListener("click", () => {
  openPopupHandle(popupTypeAvatar);
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
