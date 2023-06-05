import { createCard } from "./card";

export function renderCard(cardData, container) {
    container.prepend(createCard(cardData));
  }

  