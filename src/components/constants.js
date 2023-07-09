export const cardPopupOpenZoom = document.querySelector(".popup-zoom");
export const popupImageName = document.querySelector('.popup__caption');
export const popupImageLink = document.querySelector('.popup__image');
export const nameAddNewCard = document.querySelector(".popup__input_theme_name-adding");
export const linkAddNewCard = document.querySelector(".popup__input_theme_description-adding");
export const cardsContainer = document.querySelector(".elements");
export const popupAddingElement = document.querySelector(".popup-adding");
export const popupCloseButtons = document.querySelectorAll(".popup__close-icon");
export const popupAddingSaveButton = document.querySelector(".popup__save-adding");
export const popupSaveButton = document.querySelector(".popup__save");

export const popupProfile = document.querySelector(".popup");
export const popupEditButton = document.querySelector(".profile__edit-button");
export const popupAddingButton = document.querySelector(".profile__renew-content");
export const popupInputName = document.querySelector(".popup__input_theme_name");
export const popupInputDescription = document.querySelector(".popup__input_theme_description");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const cardSubmit = document.querySelector('.popup__panel-cards');
export const profileSubmit = document.querySelector('.popup__panel-profile');

 //для аватара и попапа к нему
export const popupAvatar = document.querySelector(".popup-image-updating");
export const popupButtonAvatar = document.querySelector(".profile__image-button");
export const avatarSaveButon = document.querySelector(".popup__save-image-updating");
export const avatarInputLink = document.querySelector(".popup__input_theme_description-image-updating");
export const profileAvatar = document.querySelector(".profile__image");
export const avatarForm = document.querySelector(".popup__panel_type_profile-image");

export const validationConfig = {
  formSelector: '.popup__panel',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error', //red line
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
  description: '.profile__description',
  avatar: '.profile__image'
}
