export const cardPopupOpenZoom = document.querySelector(".popup-zoom");
export const popupImageName = document.querySelector('.popup__caption');
export const popupImageLink = document.querySelector('.popup__image');

export const cardsContainer = document.querySelector(".elements");

export const popupCloseButtons = document.querySelectorAll(".popup__close-icon");
export const popupEditButton = document.querySelector(".profile__edit-button");
export const popupAddingButton = document.querySelector(".profile__renew-content");
export const popupInputName = document.querySelector(".popup__input_theme_name");
export const popupInputDescription = document.querySelector(".popup__input_theme_description");
export const popupButtonAvatar = document.querySelector(".profile__image-button");

export const validationConfig = {
  formSelector: '.popup__panel',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const APIconfig = {
  baseUrl: 'https:///mesto.nomoreparties.co/v1/plus-cohort-25',
  headers: {
    'content-type': 'application/json',
    authorization: '5dc000c4-85fb-4091-8cec-e004bae4f9b4'
  }
}

export const profileConfig = {
  title: '.profile__name',
  about: '.profile__description',
  avatar: '.profile__image'
}

export const imagePopupConfig = {
  image: '.popup__image',
  caption: '.popup__caption'
}

export const popupConfig = {
  panel: '.popup__panel',
  input: '.popup__input',
  submitBtn: '.popup__btn-submit'
}
