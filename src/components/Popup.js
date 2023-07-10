export class Popup {
  constructor(popupSelector) {
    // this._popupSelector = popupSelector;
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

  _closePopup(evt) {
    if (evt.target.classList.contains("popup_opened")){
        this.close();
    }
  }


  _closePopupOnEsc(evt) {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector(".popup_opened");
      this._closePopup(activePopup);
    }
  }

  _closePopupOnOverlay(evt) {
    if (evt.target.classList.contains("popup_opened")) {
        this.close();
    }
  }

  // функция закрытия попапа
//   setEventListeners() {
//     popupCloseButtons.forEach((button) => {
//       const buttonsPopup = button.closest(".popup");
//       button.addEventListener("click", () => closePopup(buttonsPopup));
//       buttonsPopup.addEventListener("click", closePopupOnOverlay);
//     });
//   }
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closePopup);
    this._popup.addEventListener('mousedown', this._closePopupOnOverlay);
    document.addEventListener('keydown', this._closePopupOnEsc);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._closePopup);
    this._popup.removeEventListener('mousedown', this._closePopupOnOverlay);
    document.removeEventListener('keydown', this._closePopupOnEsc);
  }
}
