// Привет Насятя, это товой напарник, решил поработать с гитом для закрепления теории.
// Я создал ветку для разработки mesto-update из main.
// Потом создал ветку для тестирования test из mesto-update.
// Сдела изменения добавиф комментарий и автоматом убрались лишние пробелы.

export class Api {
  #checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  getUser(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.#checkResponse);
  };

  editProfileInfo(editData){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(editData),
    }).then(this.#checkResponse);
  };

  changeAvatar(editData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(editData),
    }).then(this.#checkResponse);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.#checkResponse);
  };

  addCards(inputData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(inputData),
    }).then(this.#checkResponse);
  };

  deleteCards(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.#checkResponse);
  };

  addLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.#checkResponse);
  };

  removeLike (cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.#checkResponse);
  };

}


