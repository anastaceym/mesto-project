import { cardPopupOpenZoom, popupImageName, popupImageLink, popupCloseButtons } from './constants';

export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupOnEsc);
  }

 export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupOnEsc);
  }

 export function zoomCardImage(name, link) {
    openPopup(cardPopupOpenZoom);
   popupImageName.textContent = name;
   popupImageLink.src = link;
   popupImageLink.alt = name;
   }

  function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup)
    };
  }

  function closePopupOnOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  }
 
// функция закрытия попапа
popupCloseButtons.forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup)); 
  buttonsPopup.addEventListener('click', closePopupOnOverlay);
}); 

