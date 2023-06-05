import { cardPopupOpenZoom, popupImageName, popupImageLink } from './constants';

export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupOnEsc);
    document.addEventListener('click', closePopupOnOverlay);
  }

 export function closePopup(popup) {
    popup.classList.remove("popup_opened");
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
    if (evt.target.classList.contains('popup-overlay')) {
      const overlay = document.querySelector('.popup-overlay');
      closePopup(overlay)
    }
  }
 
