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
  clickLikeButton,
  updateMyAvatar,
} from "./api.js";

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
let userId = "";
//валидация переменные

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// option
//   .then(([serverCards, myId]) => {
//     serverCards.forEach((item) => {
//       let likeServer = item.likes.length;
//       const isMyCard = item.owner._id === myId;
//       const cardItem = createCard(
//         item,
//         (event) => {
//           if (isMyCard) {
//             deleteCardServer(item._id).then(() => {
//               const res = event.target.closest(".places__item");
//               res.remove();
//             });
//           }
//         },
//         (evt) => {
//           likeTuCard(evt, item, likeServer);
//         },
//         openImeg,
//         isMyCard,
//         likeServer
//       );

//       placesList.append(cardItem);
//     });
//   })
//   .catch((error) => {
//     throw error;
//   });
Promise.all([getCards(), getUserData()])
  .then(([cards, userData]) => {
    userId = userData._id;

    // profileTitle.textContent = userData.name;
    // profileDescription.textContent = userData.about;
    // profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
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

  createCardNew({
    name: popupCardName.value,
    link: popupCaardUrl.value,
  }).then((newCard) => {
    const newCardAdd = createCard(
      newCard,
      deleteCardServer,
      clickLike,
      openImeg,
      userId
    );
    placesList.prepend(newCardAdd);
  });
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
//валидация
function showInputError(formElement, inputElement, errorMessage) {
  const errorElemenmt = formElement.querySelector(`.${inputElement.id}__error`);
  inputElement.classList.add("popup__input_type_error");
  errorElemenmt.classList.add("popup__error_visible");
  errorElemenmt.textContent = errorMessage;
}
function hideInputError(formElement, inputElement) {
  const errorElemenmt = formElement.querySelector(`.${inputElement.id}__error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElemenmt.classList.remove("popup__error_visible");
  errorElemenmt.textContent = "";
}

const checkInputValidaty = (formElement, inputElement) => {
  if (inputElement.type === "url") {
    const urlRegex =
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/;
    const isLink = urlRegex.test(inputElement.value);
    if (!isLink) {
      showInputError(formElement, inputElement, "Введите корректную ссылку");
      return;
    }
  }
  if (inputElement.id === "card-name") {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    const inputValue = inputElement.value;
    const isValidName = nameRegex.test(inputValue);
    if (!isValidName) {
      const errorMessage =
        "Некорректное название. Пожалуйста, используйте только латинские и кириллические буквы, знаки дефиса и пробелы.";
      showInputError(formElement, inputElement, errorMessage);
      return;
    }
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListereners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidaty(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    setEventListereners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button_inactive");
  }
};

enableValidation();

export { popups, popupCaption, popupImage, popupTypeImage, cardTemplate };
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
