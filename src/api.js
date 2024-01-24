// const token = "ecf74a5a-6c95-4add-8069-fa63833477fe";
// const cohort = "wff-cohort-4";

import { Promise } from "core-js";

// const serverCards = fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
//   method: "GET",
//   headers: {
//     authorization: `${token}`,
//     "Content-Type": "application/json",
//   },
// }).then((response) => {
//   return response.json();
// });

// const myId = fetch(`https://nomoreparties.co/v1/${cohort}/users/me `, {
//   method: "GET",
//   headers: {
//     authorization: `${token}`,
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Не удалось получить карточки");
//     }
//   })
//   .then((data) => {
//     return data._id;
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// const option = Promise.all([serverCards, myId]);

// function addNewCard(LinkName, linkUrl) {
//   return fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
//     method: "POST",
//     headers: {
//       authorization: `${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: LinkName.value,
//       link: linkUrl.value,
//     }),
//   });
// }

// function deleteCardServer(cardId) {
//   return fetch(`https://nomoreparties.co/v1/${cohort}/cards/${cardId}`, {
//     method: "DELETE",
//     headers: {
//       authorization: `${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log("Карточка успешно удалена");
//         return response.json();
//       } else {
//         throw new Error("Не удалось удалить карточку");
//       }
//     })

//     .catch((error) => {
//       console.error(error);
//     });
// }

// function tuLike(cardId) {
//   return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: {
//       authorization: `${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log("Карточка успешно лайкнута");
//         return response.json();
//       } else {
//         throw new Error("Не удалось лайкнуть карточку");
//       }
//     })

//     .catch((error) => {
//       console.error(error);
//     });
// }

// function deleteLike(cardId) {
//   return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: {
//       authorization: `${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log("лайк успешно удалён");
//         return response.json();
//       } else {
//         throw new Error("Не удалось удалить лайк");
//       }
//     })

//     .catch((error) => {
//       console.error(error);
//     });
// }

// function likeTuCard(evt, item, likeCounter) {
//   if (!evt.target.classList.contains("card__like-button_is-active")) {
//     tuLike(item._id).then((res) => {
//       // res.likes.length = likeCounter++;
//       // likeCounter.textContent = res.likes.length;
//       evt.target.classList.add("card__like-button_is-active");
//     });
//   }
//   if (evt.target.classList.contains("card__like-button_is-active")) {
//     deleteLike(item._id).then((res) => {
//       // res.likes.length = likeCounter--;
//       // likeCounter.textContent = res.likes.length;
//       evt.target.classList.remove("card__like-button_is-active");
//     });
//   }
// }

// export { serverCards, option, addNewCard, deleteCardServer, likeTuCard };
/////////////////////////////////
const token = "ecf74a5a-6c95-4add-8069-fa63833477fe";
const cohort = "wff-cohort-4";

const config = {
  mainUrl: `https://nomoreparties.co/v1/${cohort}`,
  headers: {
    authorization: `${token}`,
    "Content-Type": "application/json",
  },
};

function getAnAnswer(response) {
  if (response.ok) {
    console.log("успешно");
    return response.json();
  } else {
    console.log("что то пошло не так");
    return Promise.reject(`ошибка:${response.status}`);
  }
}

const getUserData = () => {
  return fetch(`${config.mainUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(getAnAnswer);
};

const getCards = () => {
  return fetch(`${config.mainUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(getAnAnswer);
};
const editMyProfile = (inputName, inputDescription) => {
  return fetch(`${config.mainUrl}/users/me`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: inputName,
      about: inputDescription,
    }),
  }).then(getAnAnswer);
};
const createCardNew = (data) => {
  return fetch(`${config.mainUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(getAnAnswer);
};
const clickLikeButton = (id, isLiked) => {
  return fetch(`${config.mainUrl}/cards/likes/${id}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(getAnAnswer);
};
const deleteMyCard = (id) => {
  return fetch(`${config.mainUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getAnAnswer);
};
const updateMyAvatar = (data) => {
  return fetch(`${config.mainUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(getAnAnswer);
};

export {
  getCards,
  getUserData,
  editMyProfile,
  createCardNew,
  clickLikeButton,
  deleteMyCard,
  updateMyAvatar,
};
