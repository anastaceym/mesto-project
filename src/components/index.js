import "../pages/index.css";
import {
  cardsContainer,
  popupAddingElement,
  validationConfig,
  nameAddNewCard,
  linkAddNewCard,
  popupEditButton,
  popupAddingButton,
  popupInputName,
  popupInputDescription,
  profileName,
  profileDescription,
  cardSubmit,
  popupAddingSaveButton,
  popupSaveButton,
  profileSubmit,
  popupProfile,
  popupAvatar,
  popupButtonAvatar,
  avatarSaveButon,
  avatarInputLink,
  profileAvatar,
  avatarForm,
  APIconfig,
} from "./constants";
import { openPopup, closePopup } from "./modal";
import { disableButton, formLoading } from "./utils"; //renderCard
import { enableValidation } from "./validate";
import { API } from "./API";
import { Card } from "./Card";
import { Section } from "./Section";


const api = new API(APIconfig);

function createCard(item) {
  const card = new Card({
    item,
    handleAddLike: (instansCard) => {
      api
        .addLike(item._id)
        .then((infoData) => { //infoData
          console.log(instansCard);
          instansCard.classList.toggle("elements__like_active");
          instansCard.nextElementSibling.textContent = infoData.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemoveLike: (instansCard) => {
      api
        .removeLike(item._id)
        .then((infoData) => { //infoData
          console.log(instansCard);
          instansCard.classList.toggle("elements__like_active");
          instansCard.nextElementSibling.textContent = infoData.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteCard: (evt) => {
      console.log(evt)
      api
        .deleteCards(item._id)
        .then(() => {
          evt.target.closest(".elements__group").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, "#card-template");
  return card;
}


let userID = null;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(
    ([userData, cards]) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.src = userData.avatar;
      userID = userData._id;

      const cardList = new Section(
        {
          items: cards,
          renderer: (item) => {
            const card = createCard(item);
            const cardElement = card.makeCard();
            cardList.addItem(cardElement);
          },
        },
        ".elements"
      );
      cardList.renderItems();
    }
  )
  .catch((err) => {
    console.log(err);
  });



// функция создания карточек
function changeCards(evt) {
  const cardObject = { name: nameAddNewCard.value, link: linkAddNewCard.value };
  evt.preventDefault();
  formLoading(popupAddingSaveButton, true);

  api
    .addCards(cardObject)
    .then((inputData) => {
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

  api
    .editProfileInfo({
      name: popupInputName.value,
      about: popupInputDescription.value,
    })
    .then((infoData) => {
      profileName.textContent = infoData.name;
      profileDescription.textContent = infoData.about;

      disableButton(popupSaveButton, validationConfig);
      closePopup(popupProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => formLoading(popupSaveButton, false));
}

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

//попап для контента
popupAddingButton.addEventListener("click", function () {
  openPopup(popupAddingElement);
});

//сохраняем изменения
profileSubmit.addEventListener("submit", changeProfile);

function changeAvatarProfile(evt) {
  evt.preventDefault();
  formLoading(avatarSaveButon, true);

  api
    .changeAvatar({ avatar: avatarInputLink.value })
    .then((editData) => {
      profileAvatar.src = editData.avatar;
      closePopup(popupAvatar);
      avatarForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => formLoading(avatarSaveButon, false));
}

avatarForm.addEventListener("submit", changeAvatarProfile);


enableValidation(validationConfig);
