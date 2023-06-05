import { cardTemplate, nameAddNewCard, linkAddNewCard, cardsContainer, popupAddingElement } from "./constants";
import { zoomCardImage, closePopup } from "./modal";
import { renderCard } from "./utils";


export function createCard(cardData) {
    const { name, link } = cardData;
    const cardElement = cardTemplate
      .querySelector(".elements__group")
      .cloneNode(true);
    const cardPicture = cardElement.querySelector(".elements__picture");
    const cardName = cardElement.querySelector(".elements__name");
    cardName.textContent = name;
    cardPicture.src = link;
    cardPicture.alt = name;
  
  
    //удаление карточек
    const cardDeleteButton = cardElement.querySelector(".elements__card-bin");
    cardDeleteButton.addEventListener("click", function () {
      cardElement.remove();
    });
  
    //лайки
    cardElement
      .querySelector(".elements__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_active");
      });
  
      // стрелочная функция для увеличения карточек
    cardPicture.addEventListener('click', () => zoomCardImage(name, link));
  
    return cardElement;
  }

  //функция добавления карточек
  