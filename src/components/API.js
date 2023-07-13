export class API {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUser() {
    return this._request(`${this._baseUrl}/users/me`, { headers: this._headers });
  };

  editProfileInfo(editData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(editData),
    });
  }

  changeAvatar(editData) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(editData)
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers });
  }

  addCards(inputData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(inputData)
    });
  }

  deleteCards(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  addLike(cardID) {
    return this._request(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers
    });
  }

  removeLike(cardID) {
    return this._request(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers
    });
  }
}
