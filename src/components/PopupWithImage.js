import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, config) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(config.image);
    this._popupCaption = this._popup.querySelector(config.caption);
  }

  open(data) {
    this._popupCaption.textContent = data.name;
    this._popupImage.src = data.link;
    this._popupImage.alt = `${data.name}`;
    super.open();
  }
}
