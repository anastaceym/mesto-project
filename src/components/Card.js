export class Card {
  constructor({item, handleAddLike, handleRemoveLike, handleDeleteCard}, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._ownerId = item.owner._id;
    // this._cardId = item._id;
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

  toggleLike() {
    if (!this.likes.classList.contains("elements__like_active")) {
      this._handleAddLike();
    } else {
      this._handleRemoveLike();
    }
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
    const cardDeleteButton = this._card.querySelector(".elements__card-bin");
    cardDeleteButton.addEventListener("click", evt => this._handleDeleteCard());


    if (this._userId === this._ownerId) {
      cardDeleteButton.classList.add('elements__card-bin_type_visible')
    } else {
      cardDeleteButton.classList.remove('elements__card-bin_type_visible')
    };


    const likeButton = this._card.querySelector(".elements__like")
    const likeNumber = this._card.querySelector('.elements__like-number');
    likeNumber.textContent = this._likesCount;


    const hasLike = this._likes.find(user => user._id = this._userId);
    if (hasLike) {
      likeButton.classList.add('elements__like_active')
    };


    //лайки
    likeButton.addEventListener("click", () => this.toggleLike);

    // стрелочная функция для увеличения карточек
    // this._cardPicture.addEventListener('click', () => zoomCardImage(cardData.name, cardData.link));

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