import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submit }, popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__btn-submit');
    this._form = this._popup.querySelector('.popup__panel');
    this._submit = submit;
  }

  formLoading(hasLoading) {
    if(hasLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  }

  _getInputValues() {
    const data = {};
    this._inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitHandler);
    super.setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener('submit', this._submitHandler);
    super._removeEventListeners();
  }

  close() {
    this._form.reset();
    this._removeEventListeners();
    super.close();
  }
}
