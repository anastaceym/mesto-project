import '../pages/index.css';
import { initialCards, cardsContainer, popupAddingElement, validationConfig, nameAddNewCard, linkAddNewCard, popupAddingSaveButton, popupSaveButton } from './constants';
import { openPopup, closePopup } from './modal';
import { renderCard, disableButton } from './utils';
import { enableValidation } from './validate';
// import { createCard } from './card';

const popupProfile = document.querySelector(".popup");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupAddingButton = document.querySelector(".profile__renew-content");
const popupHeading = document.querySelector(".popup__heading");
const popupCloseAddingButton = document.querySelector(".popup__close-icon-adding");
const popupInputName = document.querySelector(".popup__input_theme_name");
const popupInputDescription = document.querySelector(".popup__input_theme_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardSaveButton = document.querySelector(".popup__save-adding");
const cardPopupCloseZoom = document.querySelector(".popup__close-icon-zoom");
const buttonSubmit = document.querySelector('.popup-submit');

//для аватара и попапа к нему
const popupAvatar = document.querySelector(".popup-image-updating");
const popupButtonAvatar = document.querySelector(".profile__image-button");
const avatarSaveButon = document.querySelector(".popup__save-image-updating");
const avatarInputLink = document.querySelector(".popup__input_theme_description-image-updating");
const profileAvatar = document.querySelector(".profile__image");

//попап для изменения аватарки профиля
popupButtonAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
});

function changeAvatarProfile(evt) {
  evt.preventDefault();
  avatarInputLink.scr = profileAvatar.value;
  profileAvatar.value = "";
}

avatarSaveButon.addEventListener("submit", changeAvatarProfile);

//попап для профиля
popupEditButton.addEventListener("click", function () {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
});



//попап для контента
popupAddingButton.addEventListener("click", function () {
  openPopup(popupAddingElement);
});


//изменение инфо профиля
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;

  disableButton(popupSaveButton, validationConfig);
  closePopup(popupProfile);
}

//сохраняем изменения 
buttonSubmit.addEventListener("submit", changeProfile);


// функция создания карточек
 function changeCards(evt) {
  const cardObj = { name: nameAddNewCard.value, link: linkAddNewCard.value };
    renderCard(cardObj, cardsContainer);
    evt.preventDefault();
  
    nameAddNewCard.value = "";
    linkAddNewCard.value = "";
  
    console.log(evt.submitter);
    disableButton(popupAddingSaveButton, validationConfig);
    closePopup(popupAddingElement);
  }


initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});



cardSaveButton.addEventListener("click", changeCards);



enableValidation(validationConfig);


//  Запрос к серверу
// return fetch('https:///mesto.nomoreparties.co/v1/plus-cohort-25/cards', {
//   headers: {
//     authorization: '5dc000c4-85fb-4091-8cec-e004bae4f9b4'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// Загрузка информации о пользователе с сервера
// GET https:///mesto.nomoreparties.co/v1/plus-cohort-25/users/me

// Загрузка карточек с сервера
// GET https:///mesto.nomoreparties.co/v1/plus-cohort-25/cards

// Редактирование профиля
// PATCH https:///mesto.nomoreparties.co/v1/plus-cohort-25/users/me

// fetch('https://mesto.nomoreparties.co/v1/plus-cohort-25/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: '5dc000c4-85fb-4091-8cec-e004bae4f9b4',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Anastasia M',
//     about: 'Fan of travelling'
//   })
// });

// Добавление новой карточки
// POST https:///mesto.nomoreparties.co/v1/plus-cohort-25/cards