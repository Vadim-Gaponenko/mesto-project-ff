import { popupList } from "./constants.js";

function closeByEscape(event) {
  if (event.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    if (popupOpen) {
      closePopupHandler(popupOpen);
    }
  }
}

function closePopupHandler(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}
popupList.forEach((el) => {
  el.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closePopupHandler(event.target);
    }
  });
});

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export { openPopup, closePopupHandler };
