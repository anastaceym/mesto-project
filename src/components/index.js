import '../pages/index.css';
import { cardsContainer, popupAddingElement, validationConfig, nameAddNewCard, linkAddNewCard, popupEditButton, popupAddingButton, popupInputName, popupInputDescription, profileName, profileDescription, cardSubmit, popupAddingSaveButton, popupSaveButton, profileSubmit, popupProfile, popupAvatar, popupButtonAvatar, avatarSaveButon, avatarInputLink, profileAvatar, avatarForm } from './constants';
import { openPopup, closePopup } from './modal';
import { renderCard, disableButton, formLoading } from './utils';
import { enableValidation } from './validate';
import { getUser, editProfileInfo, changeAvatar, getInitialCards, addCards, deleteCards, addLike, removeLike } from './api';
import './api'

const config = {
  baseUrl: 'https:///mesto.nomoreparties.co/v1/plus-cohort-25',
  headers: {
    'content-type': 'application/json',
    authorization: '5dc000c4-85fb-4091-8cec-e004bae4f9b4'
  }
}

let userID = null;

//попап для изменения аватарки профиля
popupButtonAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
});

//попап для профиля
popupEditButton.addEventListener("click", function () {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
});


   Promise.all([ getUser(), getInitialCards()]).then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    userID = userData._id;

    cards.reverse().forEach((card) => {
      renderCard(card, cardsContainer, userID, toggleLike, deleteCard);
    })
  })
  .catch((err) => {
    console.log(err)
  })
 
  
// функция создания карточек
 function changeCards(evt) {
  const cardObject = { name: nameAddNewCard.value, link: linkAddNewCard.value };
    evt.preventDefault();
    formLoading(popupAddingSaveButton, true);

    addCards(cardObject).then((inputData) => {
      renderCard(inputData, cardsContainer, userID, toggleLike, deleteCard);
      
        console.log(evt.submitter);
        disableButton(popupAddingSaveButton, validationConfig);
        closePopup(popupAddingElement);
        cardSubmit.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => formLoading(popupAddingSaveButton, false));
  }

cardSubmit.addEventListener("submit", changeCards);

//изменение инфо профиля
function changeProfile(evt) {
  evt.preventDefault();
  formLoading(popupSaveButton, true);

  editProfileInfo({ name: popupInputName.value, about: popupInputDescription.value }).then((infoData) => {
    profileName.textContent = infoData.name;
    profileDescription.textContent = infoData.about;
  
    disableButton(popupSaveButton, validationConfig);
    closePopup(popupProfile);
  })
  .catch((err) => console.log(err))
  .finally(() => formLoading(popupSaveButton, false));
}

//попап для контента
popupAddingButton.addEventListener("click", function () {
  openPopup(popupAddingElement);
});

//сохраняем изменения 
profileSubmit.addEventListener("submit", changeProfile);

function changeAvatarProfile(evt) {
  evt.preventDefault();
  formLoading(avatarSaveButon, true);

  changeAvatar({ avatar: avatarInputLink.value}).then((editData) => {
    profileAvatar.src = editData.avatar;
    closePopup(popupAvatar);
    avatarForm.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => formLoading(avatarSaveButon, false));
}

avatarForm.addEventListener("submit", changeAvatarProfile);

function toggleLike(evt, cardID, likeNumber, infoData) {
  likeNumber.textContent = infoData.likes.length;
  if (!evt.target.classList.contains("elements__like_active")) {
    addLike(cardID).then((infoData) => {
      evt.target.classList.toggle("elements__like_active");
      likeNumber.textContent = infoData.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    removeLike(cardID).then((infoData) => {
      evt.target.classList.toggle("elements__like_active");
        likeNumber.textContent = infoData.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

function deleteCard(evt, cardID) {
  deleteCards(cardID).then(() => {
    evt.target.closest(".elements__group").remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

enableValidation(validationConfig);


