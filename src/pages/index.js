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
  imagePopupConfig,
  popupConfig,
} from "../utils/constants";
import { API } from "../components/Api";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";

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
      const cardElement = card.makeCard(); //это нужно переместить в функцию createCard
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
  submit: (item) => {
    popupWithFormAdd.renderLoading(true);
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
        popupWithFormAdd.renderLoading(false);
      });
  }
}, popupConfig, '.popup-adding');

const popupWithFormEdit = new PopupWithForm({
  submit: (item) => {
    popupWithFormEdit.renderLoading(true);
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
        popupWithFormEdit.renderLoading(false);
      });
  }
}, popupConfig, '.popup-profile');

const popupWithFormAvatar = new PopupWithForm({
  submit: (item) => {
    popupWithFormAvatar.renderLoading(true);
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
        popupWithFormAvatar.renderLoading(false);
      });
  }
}, popupConfig, '.popup-image-updating');

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
  popupWithFormAdd.open();
});
