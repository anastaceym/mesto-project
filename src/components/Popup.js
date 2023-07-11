export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._removeEventListeners();
    this._popup.classList.remove("popup_opened");
  }

  _openPopup() {
    this.open();
  }

  _closePopup = (evt) => {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-icon")){
        this.close();
    }
  }

  _closePopupOnEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closePopup);
    document.addEventListener('keydown', this._closePopupOnEsc);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._closePopup);
    this._popup.removeEventListener('mousedown', this._closePopupOnOverlay);
    document.removeEventListener('keydown', this._closePopupOnEsc);
  }
}
