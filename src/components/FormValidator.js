export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._formInputs = this._formElement.querySelectorAll(config.inputSelector);
    this._formSubmit = this._formElement.querySelector(config.submitButtonSelector);
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
  }

  enableValidation() {
    this._setEventListener(this._formElement);
  };

  _setEventListener() {
    this._inputList = Array.from(this._formElement);
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(evt.target);
        this._toggleButtonState();
      });
    });
  };

  _checkInputValidity(input) {
    this._errorEl = this._formElement.querySelector(`#${input.id}-error`);

    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this._formSubmit.disabled = false;
      this._formSubmit.classList.remove(this._inactiveButtonClass);
    }
  };

  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    this._errorEl.textContent = errorMessage;
    this._errorEl.classList.add(this._errorClass);
  };

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    if(this._errorEl) {
      this._errorEl.classList.remove(this._errorClass);
      this._errorEl.textContent = '';
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableButton() {
    this._formSubmit.classList.add(this._inactiveButtonClass);
    this._formSubmit.disabled = true;
  }
}
