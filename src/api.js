// const token = "ecf74a5a-6c95-4add-8069-fa63833477fe";
// const cohort = "wff-cohort-4";

import { Promise } from "core-js";

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
    method: "PATCH",
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
