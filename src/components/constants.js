export const initialCards = [
    {
      name: "Новая Зеландия",
      link: "https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    },
    {
      name: "Греция",
      link: "https://images.unsplash.com/photo-1571406252262-61dbac780447?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Индонезия",
      link: "https://images.unsplash.com/photo-1682321296984-42170361c920?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Германия",
      link: "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      name: "Китай",
      link: "https://images.unsplash.com/photo-1556880003-4fcd06418af3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "Сингапур",
      link: "https://images.unsplash.com/photo-1605425183435-25b7e99104a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80",
    },
  ];
  
 export const cardPopupOpenZoom = document.querySelector(".popup-zoom");
 export const popupImageName = document.querySelector('.popup__caption');
 export const popupImageLink = document.querySelector('.popup__image');
 export const cardTemplate = document.querySelector("#card-template").content;
 export const nameAddNewCard = document.querySelector(".popup__input_theme_name-adding");
 export const linkAddNewCard = document.querySelector(".popup__input_theme_description-adding");
 export const cardsContainer = document.querySelector(".elements");
 export const popupAddingElement = document.querySelector(".popup-adding");
 export const popupCloseButtons = document.querySelectorAll(".popup__close-icon");
 export const popupAddingSaveButton = document.querySelector(".popup__save-adding");
 export const popupSaveButton = document.querySelector(".popup__save");
 

 export const validationConfig = {
  formSelector: '.popup__panel',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error', //red line
  errorClass: 'popup__error_visible'
};
