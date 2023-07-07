// Привет Насятя, это товой напарник, решил поработать с гитом для закрепления теории.
// Я создал ветку для разработки mesto-update из main.
// Потом создал ветку для тестирования test из mesto-update.
// Сдела изменения добавиф комментарий и автоматом убрались лишние пробелы.

export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getUser(){
    return fetch(`${baseUrl}/users/me`, {
      headers
    }).then(checkResponse);
  };

  editProfileInfo(editData){
    return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(editData),
    }).then(checkResponse);
  };

  changeAvatar(editData) {
    return fetch(`${baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(editData),
    }).then(checkResponse);
  };

  getInitialCards() {
    return fetch(`${baseUrl}/cards`, {
      headers,
    }).then(checkResponse);
  };

  addCards(inputData) {
    return fetch(`${baseUrl}/cards`, {
      method: "POST",
      headers,
      body: JSON.stringify(inputData),
    }).then(checkResponse);
  };

  deleteCards(cardID) {
    return fetch(`${baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers,
    }).then(checkResponse);
  };

  addLike(cardID) {
    return fetch(`${baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers,
    }).then(checkResponse);
  };

  removeLike (cardID) {
    return fetch(`${baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers,
    }).then(checkResponse);
  };

}


