import { popups, popupCaption, popupImage, popupTypeImage } from "./index.js";

function closeByEscape(event) {
  if (event.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    if (popupOpen) {
      closePopupHandler(popups);
    }
  }
}
function openImeg(iteam) {
  popupImage.src = iteam.src;
  popupImage.alt = iteam.alt;
  popupCaption.textContent = iteam.alt;
  openPopup(popupTypeImage);
}

function closePopupHandler(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export { openPopup, closePopupHandler };
