import { createCard } from "./card";

export function renderCard(cardData, container) {
    container.prepend(createCard(cardData));
  }

export function disableButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
  }