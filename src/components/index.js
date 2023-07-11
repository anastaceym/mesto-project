import "../pages/index.css";
import {
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
  profileConfig,
  imagePopupConfig
} from "./constants";
import { openPopup, closePopup } from "./modal";
import { formLoading } from "./utils"; //renderCard
import { API } from "./API";
import { Card } from "./Card";
import { Section } from "./Section";
import { UserInfo } from "./User-info";
import { FormValidator } from "./FormValidator";
import { PopupWithImage } from "./PopupWithImage";
import { PopupWithForm } from "./PopupWithForm";

const api = new API(APIconfig);
const popupWithImage = new PopupWithImage('.popup-zoom', imagePopupConfig);
const userInfo = new UserInfo(profileConfig);

const popupAddingElementFV = new FormValidator(popupAddingElement, validationConfig);
popupAddingElementFV.enableValidation();

const popupAvatarFV =new FormValidator(popupAvatar, validationConfig);
popupAvatarFV.enableValidation();

const popupProfileFV =new FormValidator(popupProfile, validationConfig);
popupProfileFV.enableValidation();


function createCard(item) {
  const card = new Card({
    item,
    userId: userInfo.id,
    handleZoomImage: (cardInstans) => {
      popupWithImage.open(cardInstans._name, cardInstans._link);
    },
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

Promise.all([api.getUser(), api.getInitialCards()])
  .then(
    ([userData, cards]) => {
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


  const popupWithFormAdd = new PopupWithForm({
    submit: (item)=> {
      console.log(item)
      popupWithFormAdd.formLoading(true);
      api
        .addCards(item)
        .then((data) => {
          console.log('тут')
          const card = createCard(data);
          const cardElement = card.makeCard();
          cardList.addItem(cardElement);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAdd.formLoading(false);
        });
    }
  }, '.popup-adding');


  const popupWithFormEdit = new PopupWithForm({
    submit: (item)=> {
      console.log(item)
      popupWithFormEdit.formLoading(true);
      api
        .editProfileInfo(item)
        .then((data) => {
          userInfo.editProfileInfo(data);
          popupWithFormEdit.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormEdit.formLoading(false);
        });
    }
  }, '.popup-profile');


  const popupWithFormAvatar = new PopupWithForm({
    submit: (item)=> {
      popupWithFormAvatar.formLoading(true);
      api
        .changeAvatar(item)
        .then((data) => {
          userInfo.editProfileImage(data);
          popupWithFormAvatar.close();

        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAvatar.formLoading(false);
        });
    }
  }, '.popup-image-updating');


// function changeCards(evt) {
//   const cardObject = { name: nameAddNewCard.value, link: linkAddNewCard.value };
//   evt.preventDefault();
//   formLoading(popupAddingSaveButton, true);

//   api
//     .addCards(cardObject)
//     .then((inputData) => {
//       console.log(inputData);

//       createCard(inputData);

//       // card.makeCard();
//       popupAddingElementFV.disableButton();
//       closePopup(popupAddingElement);
//       cardSubmit.reset();
//     })
//     .catch((err) => console.log(err))
//     .finally(() => formLoading(popupAddingSaveButton, false));
// }

//попап для изменения аватарки профиля
popupButtonAvatar.addEventListener("click", function () {
  popupAvatarFV.disableButton();
  popupWithFormAvatar.open();
});

//попап для профиля
popupEditButton.addEventListener("click", function () {
  const user = userInfo.getUserInfo();
  popupInputName.value = user.title;
  popupInputDescription.value = user.about;
  popupWithFormEdit.open();
});

//попап для контента
popupAddingButton.addEventListener("click", function () {
  popupAddingElementFV.disableButton();
  popupWithFormAdd.open()
});
