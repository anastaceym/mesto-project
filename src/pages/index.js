import "../pages/index.css";
import {
  validationConfig,
  popupEditButton,
  popupAddingButton,
  popupInputName,
  popupInputDescription,
  popupButtonAvatar,
  APIconfig,
  profileConfig,
  imagePopupConfig,
  popupConfig
} from "../utils/constants";
import { API } from "../components/API";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";

const api = new API(APIconfig);
const popupWithImage = new PopupWithImage('.popup-zoom', imagePopupConfig);
const userInfo = new UserInfo(profileConfig);

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation(validationConfig);
  });
};

enableValidation(validationConfig);

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
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

  return card.makeCard();
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
        const cardElement = createCard(data);
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
  formValidators['avatar'].disableButton();
  formValidators['avatar'].resetValidation();
  popupWithFormAvatar.open();
});

//попап для профиля
popupEditButton.addEventListener("click", function () {
  const user = userInfo.getUserInfo();
  popupInputName.value = user.title;
  popupInputDescription.value = user.about;
  formValidators['profile'].resetValidation();
  popupWithFormEdit.open();
});

//попап для контента
popupAddingButton.addEventListener("click", function () {
  formValidators['addCard'].disableButton();
  formValidators['addCard'].resetValidation();
  popupWithFormAdd.open();
});
