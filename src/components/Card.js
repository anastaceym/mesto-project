export class Card {
  constructor({item, handleAddLike, handleRemoveLike, handleDeleteCard}, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._ownerId = item.owner._id;
    this._userId = item._id;
    this._likes = item.likes;
    this._likesCount = item.likes.length;
    this._cardSelector = cardSelector;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__group")
      .cloneNode(true);
  }

  _identifyLike() {
    const hasLike = this._likes.find(user => this._userId === user._id);
    if (hasLike) {
      this._like.classList.add('elements__like_active')
    };
  }

  toggleLike() {
    if (!this._like.classList.contains("elements__like_active")) {
      this._handleAddLike(this);
    } else {
      this._handleRemoveLike(this);
    }
  }

  setLike() {
    this._like.classList.toggle("elements__like_active");
  }

  setCountLike(data) {
    this._likes = data.likes;
    this._likeNumber.textContent = data.likes.length;
  }

  setEventListeners() {
    this._like.addEventListener("click", () => this.toggleLike());
    this._cardDeleteButton.addEventListener("click", evt => this._handleDeleteCard());
    // this._cardPicture.addEventListener('click', () => zoomCardImage(cardData.name, cardData.link));
  }

  makeCard() {
    this._getTemplate();

    const cardPicture = this._card.querySelector(".elements__picture");
    // const cardName = cardElement.querySelector(".elements__name");
    // cardName.textContent = cardData.name;
    // cardPicture.src = cardData.link;
    // cardPicture.alt = cardData.name;

    cardPicture.src = this._link;
    cardPicture.alt = this._name;
    // this._elementTitle.textContent = this._name;
    // this._elementLikes.textContent = this._likesCount;

 //удаление карточек

    this._cardDeleteButton = this._card.querySelector(".elements__card-bin");
    this._like = this._card.querySelector('.elements__like');
    this._likeNumber = this._card.querySelector('.elements__like-number');


    this._identifyLike();


    if (this._userId === this._ownerId) {
      this._cardDeleteButton.classList.add('elements__card-bin_type_visible')
    } else {
      this._cardDeleteButton.classList.remove('elements__card-bin_type_visible')
    };


    // this.likeNumber.textContent = this._likesCount;

    this.setEventListeners();

    return this._card;
  }

//import { zoomCardImage } from "./modal";

//   createCard(cardData,  userID, toggleLike, deleteCard) {
//     // const { name, link } = cardData;
//     const cardElement = cardTemplate
//       .querySelector(".elements__group")
//       .cloneNode(true);
//     const cardPicture = cardElement.querySelector(".elements__picture");
//     const cardName = cardElement.querySelector(".elements__name");
//     cardName.textContent = cardData.name;
//     cardPicture.src = cardData.link;
//     cardPicture.alt = cardData.name;

//  //удаление карточек
//     const cardDeleteButton = cardElement.querySelector(".elements__card-bin");
//     cardDeleteButton.addEventListener("click", function (evt) {
//       deleteCard(evt, cardData._id);
//     });

//    if (cardData.owner._id === userID) {
//     cardDeleteButton.classList.add('elements__card-bin_type_visible')
//    } else {
//     cardDeleteButton.classList.remove('elements__card-bin_type_visible')
//    };

//    const likeButton = cardElement.querySelector(".elements__like")
//    const likeNumber = cardElement.querySelector('.elements__like-number');

//    likeNumber.textContent = cardData.likes.length;
//    const hasLike = cardData.likes.find(user => user._id = userID);
//    if (hasLike) {
//       likeButton.classList.add('elements__like_active')
//    };
//     //лайки
//     likeButton.addEventListener("click", function (evt) {
//         toggleLike(evt, cardData._id, likeNumber, cardData)
//       });

//       // стрелочная функция для увеличения карточек
//     cardPicture.addEventListener('click', () => zoomCardImage(cardData.name, cardData.link));

//     return cardElement;
//}

}