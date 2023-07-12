import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submit }, config, popupSelector) {
    super(popupSelector);
    this._inputs = Array.from(this._popup.querySelectorAll(config.input));
    this._button = this._popup.querySelector(config.submitBtn);
    this._form = this._popup.querySelector(config.panel);
    this._submit = submit;
  }

  renderLoading(hasLoading) {
    if(hasLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  }

  _getInputValues() {
    const data = {};
    this._inputs.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  _submitHandler = (evt) => {
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
    super.close();
  }
}
