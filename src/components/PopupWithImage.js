import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, config) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(config.image);
    this._popupCaption = this._popup.querySelector(config.caption);
  }

  open(name, link) {
    this._popupCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }
}
