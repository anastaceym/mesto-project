const popupElement = document.querySelector(".popup");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-icon");
const cardsContainer = document.querySelector(".elements");
const popupAddingButton = document.querySelector(".profile__renew-content");
const popupHeading = document.querySelector(".popup__heading");
const popupAddingSaveButton = document.querySelector(".popup__save-adding");
const popupAddingElement = document.querySelector(".popup-adding");
const popupCloseAddingButton = document.querySelector(".popup__close-icon-adding");
const popupInputName = document.querySelector(".popup__input_theme_name");
const popupInputDescription = document.querySelector(".popup__input_theme_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupSaveButton = document.querySelector(".popup__save");
const cardTemplate = document.querySelector("#card-template").content;
const cardSaveButton = document.querySelector(".popup__save-adding");
const nameAddNewCard = document.querySelector(".popup__input_theme_name-adding");
const linkAddNewCard = document.querySelector(".popup__input_theme_description-adding");
const cardPopupCloseZoom = document.querySelector(".popup__close-icon-zoom");
const cardPopupOpenZoom = document.querySelector(".popup-zoom");
const popupImageName = document.querySelector('.popup__caption');
const popupImageLink = document.querySelector('.popup__image');
const buttonSubmit = document.querySelector('.popup-submit');


//добавляем класс переменной и функцию открытия попапа редактирования профиля и добавления контента

//попап для профиля
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}
popupEditButton.addEventListener("click", function () {
  openPopup(popupElement);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
});

//добавляем функцию закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}
popupCloseButton.addEventListener("click", function () {
  closePopup(popupElement);
});

//попап для контента
popupAddingButton.addEventListener("click", function () {
  openPopup(popupAddingElement);
});

//добавляем функцию закрытия попапа
function closePopup(popupAddingElement) {
  popupAddingElement.classList.remove("popup_opened");
}
popupCloseAddingButton.addEventListener("click", function () {
  closePopup(popupAddingElement);
});

//изменение инфо профиля
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;

  popupInputName.value = "";
  popupInputDescription.value = "";

  closePopup(popupElement);
}

//сохраняем изменения 
buttonSubmit.addEventListener("submit", changeProfile);

//массив
const initialCards = [
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

// функция создания карточек
function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".elements__group")
    .cloneNode(true);
  const cardPicture = cardElement.querySelector(".elements__picture");
  const cardName = cardElement.querySelector(".elements__name");
  cardName.textContent = name;
  cardPicture.src = link;
  cardsContainer.prepend(cardElement);

  //удаление карточек
  const cardDeleteButton = cardElement.querySelector(".elements__card-bin");
  cardDeleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  //лайки
  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_active");
    });

    // стрелочная функция для увеличения карточек
  cardPicture.addEventListener('click', () => zoomCardImage(name, link));

}

initialCards.forEach((card) => {
  createCard(card.name, card.link);
});

//функция добавления карточек
function changeCards(evt) {
  createCard(nameAddNewCard.value, linkAddNewCard.value);
  evt.preventDefault();

  nameAddNewCard.value = "";
  linkAddNewCard.value = "";

  closePopup(popupAddingElement);
}

cardSaveButton.addEventListener("click", changeCards);

//функция открытия попапа для увеличения карточек 
function zoomCardImage(name, link) {
  openPopup(cardPopupOpenZoom);
 popupImageName.textContent = name;
 popupImageLink.src = link;
 }

 cardPopupCloseZoom.addEventListener("click", function () {
  closePopup(cardPopupOpenZoom);
});