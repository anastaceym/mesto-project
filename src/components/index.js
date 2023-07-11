import "../pages/index.css";
import {
  popupAddingElement,
  validationConfig,
  popupEditButton,
  popupAddingButton,
  popupInputName,
  popupInputDescription,
  popupProfile,
  popupAvatar,
  popupButtonAvatar,
  APIconfig,
  profileConfig,
  imagePopupConfig
} from "./constants";
import { API } from "./API";
import { Card } from "./Card";
import { Section } from "./Section";
import { UserInfo } from "./UserInfo";
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

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.makeCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

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
      cardList.renderItems(cards);
    }
  )
  .catch((err) => {
    console.log(err);
  });

const popupWithFormAdd = new PopupWithForm({
  submit: (item)=> {
    popupWithFormAdd.formLoading(true);
    api
      .addCards(item)
      .then((data) => {
        const card = createCard(data);
        const cardElement = card.makeCard();
        cardList.addItem(cardElement);
        popupWithFormAdd.close();
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
