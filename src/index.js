// @todo: Темплейт карточки
import{createCard,  likeCard} from './card.js';
import './pages/index.css'
import{initialCards} from './cards';
import{popupAdd, deleteCard, popupRemove} from './modul.js';






const editProfile = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector(".profile__add-button")
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const popupTypeImage =document.querySelector('.popup_type_image');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription =document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupCardName = document.querySelector('.popup__input_type_card-name');
const popupCaardUrl = document.querySelector('.popup__input_type_url');
const addForm = document.forms['edit-profile'];
const addPlace = document.forms['new-place'];
inputName.value = profileTitle.textContent;
inputDescription.value = profileDescription.textContent;


// @todo: DOM узлы
const placesList = document.querySelector(".places__list");





initialCards.forEach((iteam) => {
  const cardItem = createCard(iteam, deleteCard, likeCard);
  placesList.append(cardItem);
});


 editProfile.addEventListener('click', () =>{
  popupAdd(popupTypeEdit);
 });

 profileAdd.addEventListener('click', () =>{
  popupAdd(popupTypeCard);
 });
 
document.addEventListener('click', (event) => {
  const closeButton = event.target.closest('.popup__close');
  const popup = event.target.closest('.popup');

  if (closeButton && popup) {
    popup.classList.remove('popup_is-opened');
  }
});

placesList.addEventListener('click', (event)=>{
  const deleteButton = event.target.closest(".card__delete-button");
  const buttonLike = event.target.closest(".card__like-button");
  if(!deleteButton && !buttonLike){
  const popupContent = event.target.closest('.card');
  const cardImage =popupContent.querySelector(".card__image")
  const popapImage = document.querySelector('.popup__image');
  const src = cardImage.src
  popapImage.setAttribute('src', src)
  popupAdd(popupTypeImage);
  }
 })

document.addEventListener('click', (event) => {
  const closeButton = event.target.closest('.popup__close');
  const popup = event.target.closest('.popup');
  const contentPopup = event.target.closest('.popup__content');
  if (closeButton || (popup && !contentPopup)) {
    popup.classList.remove('popup_is-opened');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
      if (popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-opened');
      }
    });
  }
});

function handleFormSubmit(evt){
  evt.preventDefault();
   const nameValue = inputName.value;
   const descriptionValue = inputDescription.value;
   profileTitle.textContent = nameValue;
   profileDescription.textContent = descriptionValue;
   popupRemove(popupTypeEdit);
}
addForm.addEventListener('submit', handleFormSubmit);

function handlePlaceSubmit(evt){
  evt.preventDefault();
  const CardName = popupCardName.value;
  const CardUrl = popupCaardUrl.value;
  const newCard ={
  name: CardName,
  link: CardUrl 
 };  
 const newCardAdd = createCard(newCard, deleteCard);
 placesList.prepend(newCardAdd);
 popupRemove(popupTypeCard)
}
addPlace.addEventListener('submit', handlePlaceSubmit)













// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
