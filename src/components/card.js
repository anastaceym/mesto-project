import { cardTemplate } from "./constants";
import { zoomCardImage } from "./modal";



export function createCard(cardData,  userID, toggleLike, deleteCard) {
    // const { name, link } = cardData;
    const cardElement = cardTemplate
      .querySelector(".elements__group")
      .cloneNode(true);
    const cardPicture = cardElement.querySelector(".elements__picture");
    const cardName = cardElement.querySelector(".elements__name");
    cardName.textContent = cardData.name;
    cardPicture.src = cardData.link;
    cardPicture.alt = cardData.name;
  
 //удаление карточек
    const cardDeleteButton = cardElement.querySelector(".elements__card-bin");
    cardDeleteButton.addEventListener("click", function (evt) {
      deleteCard(evt, cardData._id);
    });

   if (cardData.owner._id === userID) {
    cardDeleteButton.classList.add('elements__card-bin_type_visible') 
   } else {
    cardDeleteButton.classList.remove('elements__card-bin_type_visible')
   };
   
   const likeButton = cardElement.querySelector(".elements__like")
   const likeNumber = cardElement.querySelector('.elements__like-number');
   
   likeNumber.textContent = cardData.likes.length;
   const hasLike = cardData.likes.find(user => user._id = userID);
   if (hasLike) {
      likeButton.classList.add('elements__like_active')
   };
    //лайки
    likeButton.addEventListener("click", function (evt) {
        toggleLike(evt, cardData._id, likeNumber, cardData)
      });

      // стрелочная функция для увеличения карточек
    cardPicture.addEventListener('click', () => zoomCardImage(cardData.name, cardData.link));
  
    return cardElement;
  }

  
  