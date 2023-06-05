import '../pages/index.css';
import { initialCards, cardsContainer, popupAddingElement, validationConfig, nameAddNewCard, linkAddNewCard } from './constants';
import { openPopup, closePopup } from './modal';
import { renderCard } from './utils';
import { enableValidation } from './validate';
import { createCard } from './card';

const popupProfile = document.querySelector(".popup");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-icon");
const popupAddingButton = document.querySelector(".profile__renew-content");
const popupHeading = document.querySelector(".popup__heading");
const popupAddingSaveButton = document.querySelector(".popup__save-adding");
const popupCloseAddingButton = document.querySelector(".popup__close-icon-adding");
const popupInputName = document.querySelector(".popup__input_theme_name");
const popupInputDescription = document.querySelector(".popup__input_theme_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupSaveButton = document.querySelector(".popup__save");
const cardSaveButton = document.querySelector(".popup__save-adding");
const cardPopupCloseZoom = document.querySelector(".popup__close-icon-zoom");
const buttonSubmit = document.querySelector('.popup-submit');


//создаем константы для валидации форм 
const form = document.querySelector('.popup__panel');
const formInput = document.querySelector('.popup__input');
const formError = document.querySelector(`.${formInput.id}-error`);


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

// функция закрытия попапа
popupCloseButtons.forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup)); 
}); 

//изменение инфо профиля
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;

  popupInputName.value = "";
  popupInputDescription.value = "";

  closePopup(popupProfile);
}

//сохраняем изменения 
buttonSubmit.addEventListener("submit", changeProfile);


// функция создания карточек
 function changeCards(evt) {
  const cardObj = { name: nameAddNewCard.value, link: linkAddNewCard.value };
  const newCard = createCard(cardObj);
    renderCard(newCard, cardsContainer);
    evt.preventDefault();
  
    nameAddNewCard.value = "";
    linkAddNewCard.value = "";
  
    closePopup(popupAddingElement);
  }

initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});



cardSaveButton.addEventListener("click", changeCards);



enableValidation(validationConfig);





