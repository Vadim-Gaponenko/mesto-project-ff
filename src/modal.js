function addPopup(e) {
  e.classList.add("popup_is-opened");
  openPopupHandle(document);
}

function removePopup(e) {
  e.classList.remove("popup_is-opened");
}

function closePopup(evt) {
  evt.forEach((popup) => {
    popup.classList.remove("popup_is-opened");
    closePopupHandler(document);
  });
}

function closeByEscape(event) {
  const popups = document.querySelectorAll(".popup");
  if (event.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    if (popupOpen) {
      closePopup(popups);
    }
  }
}
function openImeg(iteam) {
  const popupCaption = document.querySelector(".popup__caption");
  const popupImage = document.querySelector(".popup__image");
  const popupTypeImage = document.querySelector(".popup_type_image");
  popupImage.src = iteam.src;
  popupImage.alt = iteam.alt;
  popupCaption.textContent = iteam.alt;
  addPopup(popupTypeImage);
}

function closePopupHandler(document) {
  document.removeEventListener("keydown", closeByEscape);
}
function openPopupHandle(document) {
  document.addEventListener("keydown", closeByEscape);
}

export { addPopup, removePopup, closeByEscape, openImeg };
