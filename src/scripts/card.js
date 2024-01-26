import { cardTemplate } from "./constants.js";
import { deleteMyCard, changeCardLike } from "./api.js";

function createCard(
  item,
  deleteCardColbeck,
  likeCardColbeck,
  openImegColbeck,
  userId
) {
  const cardTemplateContent = cardTemplate.content;
  const element = cardTemplateContent.cloneNode(true);
  const card = element.querySelector(".card");

  const imgCard = element.querySelector(".card__image");
  const titleCard = element.querySelector(".card__title");
  const likeButton = element.querySelector(".card__like-button");
  const deleteButton = element.querySelector(".card__delete-button");
  const conterLike = element.querySelector(".like__counter");

  imgCard.src = item.link;
  imgCard.alt = item.name;
  titleCard.textContent = item.name;
  let likes = item.likes;
  imgCard.addEventListener("click", () => {
    openImegColbeck(imgCard);
  });
  if (userId === item.owner._id) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }

  const checkLike = () => {
    return likes.some((like) => like._id === userId);
  };

  const changeLike = (newLikes) => {
    likes = newLikes;
    setLikeStatus();
  };

  const setLikeStatus = () => {
    const isLiked = checkLike();
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    } else {
      likeButton.classList.remove("card__like-button_is-active");
    }
    conterLike.textContent = likes.length;
  };
  setLikeStatus();

  deleteButton.addEventListener("click", () =>
    deleteCardColbeck(item._id, card)
  );

  likeButton.addEventListener("click", () =>
    likeCardColbeck(item._id, checkLike(), changeLike)
  );
  return element;
}

function deleteCardServer(id, element) {
  deleteMyCard(id)
    .then(() => {
      deleteCard(element);
    })
    .catch((error) => {
      console.log(error);
    });
}

function clickLike(id, isLiked, changeLike) {
  changeCardLike(id, isLiked)
    .then((data) => {
      changeLike(data.likes);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteCard(element) {
  element.remove();
}

export { createCard, clickLike, deleteCardServer };
