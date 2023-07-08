class Card {
  constructor({item, handleAddLike, handleRemoveLike, handleDeleteCard}, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._ownerId = item.owner._id;
    this._cardId = item._id;
    this._userId = item.owner._id;
    this._likes = item.likes;
    this._cardSelector = cardSelector;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteCard = handleDeleteCard;
  }
}