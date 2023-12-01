import { popups, popupCaption, popupImage, popupTypeImage } from "./index.js";

function closePopup(evt) {
  evt.forEach((popup) => {
    popup.classList.remove("popup_is-opened");
  });
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    if (popupOpen) {
      closePopup(popups);
    }
  }
}
function openImeg(iteam) {
  popupImage.src = iteam.src;
  popupImage.alt = iteam.alt;
  popupCaption.textContent = iteam.alt;
  openPopupHandle(popupTypeImage);
}

function closePopupHandler(e) {
  e.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}
function openPopupHandle(e) {
  e.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export { openPopupHandle, closePopupHandler, openImeg };
