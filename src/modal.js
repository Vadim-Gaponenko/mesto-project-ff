function addPopup(e) {
  e.classList.add("popup_is-opened");
}

function removePopup(e) {
  e.classList.remove("popup_is-opened");
}

function closePopup(evt) {
  evt.forEach((popup) => {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeByEscape);
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

export { addPopup, removePopup, closeByEscape };
