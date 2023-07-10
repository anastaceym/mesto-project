export class Card {
  constructor({item, userId, handleZoomImage, handleAddLike, handleRemoveLike, handleDeleteCard}, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._ownerId = item.owner._id;
    this._id = item._id;
    this._userId = userId;
    this._likes = item.likes;
    this._likesCount = item.likes.length;
    this._cardSelector = cardSelector;
    this._handleZoomImage = handleZoomImage;
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

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _toggleLike() {
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

  _setEventListeners() {
    this._like.addEventListener("click", () => this._toggleLike());
    this._cardDeleteButton.addEventListener("click", () => this._handleDeleteCard(this));
    this._cardPicture.addEventListener('click', () => this._handleZoomImage(this));
    // this._cardPicture.addEventListener('click', () => zoomCardImage(cardData.name, cardData.link));
  }

  makeCard() {
    this._getTemplate();

    this._cardPicture = this._card.querySelector(".elements__picture");
    this._cardName = this._card.querySelector(".elements__name");
    this._cardDeleteButton = this._card.querySelector(".elements__card-bin");
    this._like = this._card.querySelector('.elements__like');
    this._likeNumber = this._card.querySelector('.elements__like-number');

    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;

    this._cardName.textContent = this._name;
    this._likeNumber.textContent = this._likesCount;

    this._identifyLike();

    if (this._userId === this._ownerId) {
      this._cardDeleteButton.classList.add('elements__card-bin_type_visible')
    } else {
      this._cardDeleteButton.classList.remove('elements__card-bin_type_visible')
    };

    this._setEventListeners();

    return this._card;
  }
}
