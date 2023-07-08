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
import { renderCard, disableButton, formLoading } from "./utils";
import { enableValidation } from "./validate";
import { API } from "./API";
import { Section } from "./Section";

const api = new API(APIconfig);

let userID = null;

export const cardsSelector = '.elements';

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
            const cardElement = card.generate();
            cardList.addItem(cardElement);
          },
        },
        cardsSelector
      );
      cardList.renderItems();

      //   cards.reverse().forEach((card) => {
      //     renderCard(card, cardsContainer, userID, toggleLike, deleteCard);
      //   })
      // })

    }
  )
  .catch((err) => console.log(err));

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

function toggleLike(evt, cardID, likeNumber, infoData) {
  likeNumber.textContent = infoData.likes.length;
  if (!evt.target.classList.contains("elements__like_active")) {
    api
      .addLike(cardID)
      .then((infoData) => {
        evt.target.classList.toggle("elements__like_active");
        likeNumber.textContent = infoData.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .removeLike(cardID)
      .then((infoData) => {
        evt.target.classList.toggle("elements__like_active");
        likeNumber.textContent = infoData.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function deleteCard(evt, cardID) {
  api
    .deleteCards(cardID)
    .then(() => {
      evt.target.closest(".elements__group").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

enableValidation(validationConfig);
