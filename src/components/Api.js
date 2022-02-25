export class Api {
	constructor({address, token}) {
		this._address = address;
		this._token = token;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error: ${res.status}`);
	}

// метод получения карточек с сервера
	getCards() {
		return fetch(`${this._address}/cards`, {
			method: 'GET',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			}
		})
			.then(this._checkResponse)
	}

	// получение данных профиля с сервера
	getUser() {
		return fetch(`${this._address}/users/me`, {
			method: 'GET',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			}
		}).then(this._checkResponse)
	}

	// редактирование профиля
	editProfile(item) {
		return fetch(`${this._address}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: item.name,
				about: item.description
			})
		}).then(this._checkResponse)
	}

	// добавление карточки
	addNewCard(item) {
		return fetch(`${this._address}/cards`, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: item.name,
				link: item.link
			})
		}).then(this._checkResponse)
	}

}
