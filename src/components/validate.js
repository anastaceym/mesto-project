export function enableValidation (config) {
    const { formSelector } = config; //деструктуризация
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      setEventListener(formElement, config);
    });
  };
  
  function setEventListener (formElement, config){
    const {inputSelector,submitButtonSelector} = config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

  function checkInputValidity (formElement, inputElement, config) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }; 

  function toggleButtonState (inputList, buttonElement, config){
    const {inactiveButtonClass} = config;
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};
  
  function showInputError (formElement, inputElement, errorMessage, config){
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError (formElement, inputElement, config){
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput (inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
