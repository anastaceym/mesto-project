const popupProfile = document.querySelector(".popup");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-icon");
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
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
popupEditButton.addEventListener("click", function () {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
});

//добавляем функцию закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}


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
function createCard(cardData) {
  const { name, link } = cardData;
  const cardElement = cardTemplate
    .querySelector(".elements__group")
    .cloneNode(true);
  const cardPicture = cardElement.querySelector(".elements__picture");
  const cardName = cardElement.querySelector(".elements__name");
  cardName.textContent = name;
  cardPicture.src = link;
  cardPicture.alt = name;


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

  return cardElement;
}

function renderCard(cardData, container) {
  container.prepend(createCard(cardData));
}

initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});

//функция добавления карточек
function changeCards(evt) {
const cardObj = { name: nameAddNewCard.value, link: linkAddNewCard.value };
const newCard = createCard(cardObj);
  renderCard(cardObj, cardsContainer);
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
 popupImageLink.alt = name;
 }

