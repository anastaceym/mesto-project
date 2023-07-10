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
  profileConfig
} from "./constants";
import { openPopup, closePopup } from "./modal";
import { disableButton, formLoading } from "./utils"; //renderCard
// import { enableValidation } from "./validate";
import { API } from "./API";
import { Card } from "./Card";
import { Section } from "./Section";
import { UserInfo } from "./User-info";
import { FormValidator } from "./FormValidator";


const api = new API(APIconfig);
const popupAddingElementFV = new FormValidator(popupAddingElement, validationConfig);
console.log(popupAddingElementFV)
popupAddingElementFV.enableValidation();
const popupAvatarFV =new FormValidator(popupAvatar, validationConfig);

function createCard(item) {
  const card = new Card({
    item,
    userId: "53e1ff49d53a1efc36625b8b", //это убрать после создания class UserInfo
    handleAddLike: (cardInstans) => {
      api
        .addLike(item._id)
        .then((infoData) => {
          cardInstans.setLike();
          cardInstans.setCountLike(infoData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemoveLike: (cardInstans) => {
      api
        .removeLike(item._id)
        .then((infoData) => {
          cardInstans.setLike();
          cardInstans.setCountLike(infoData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteCard: (cardInstans) => {
      api
        .deleteCards(item._id)
        .then(() => {
          cardInstans.deleteCard();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, "#card-template");
  return card;
}

// let userID = null;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(
    ([userData, cards]) => {
      // userID = userData._id;
      const userInfo = new UserInfo(profileConfig);

      userInfo.editProfileInfo(userData);

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


function changeCards(evt) {
  const cardObject = { name: nameAddNewCard.value, link: linkAddNewCard.value };
  evt.preventDefault();
  formLoading(popupAddingSaveButton, true);

  api
    .addCards(cardObject)
    .then((inputData) => {
      console.log(inputData);

      createCard(inputData);

      // card.makeCard();
      // renderCard(inputData, cardsContainer, userID, toggleLike, deleteCard);

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


// enableValidation(validationConfig);
