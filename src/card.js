const cardTemplate = document.querySelector("#card-template");

function createCard(iteam, deleteCardColbeck, likeCardColbeck) {
  const cardTemplateContent = cardTemplate.content;
  const element = cardTemplateContent.cloneNode(true);
  const imgCard = element.querySelector(".card__image");
  const titleCard = element.querySelector(".card__title");
  const likeButton = element.querySelector(".card__like-button");
  const deleteButton = element.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCardColbeck);
  likeButton.addEventListener("click", likeCardColbeck);

  imgCard.src = iteam.link;
  imgCard.alt = iteam.name;
  titleCard.textContent = iteam.name;
  return element;
}

function likeCard(evt) {
  const buttonLike = evt.target.closest(".card__like-button");
  buttonLike.classList.toggle("card__like-button_is-active");
}

function deleteCard(event) {
  const card = event.target.closest(".places__item");
  card.remove();
}

export { createCard, likeCard, deleteCard };
