class Card {
	constructor(data, currentUserId, cardSelector, {
		handleCardClick,
		handleDeleteCardClick,
		handleAddLike,
		handleRemoveLike
	}) {
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._cardId = data._id; // id карточки
		this._ownerId = data.owner._id; // id владельца юзера добавившего эту карточку
		this._currentUserId = currentUserId;
		//this._alt = data.name;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteCardClick = handleDeleteCardClick;
		this._handleAddLike = handleAddLike;
		this._handleRemoveLike = handleRemoveLike;
		this._element = this._getTemplate();// Запишем разметку в поле _element.
		this._cardImage = this._element.querySelector('.cards__images'); // картинка по селектору
		this._likeButton = this._element.querySelector('.cards__like'); // кнопка лайка по селектору
		this._deleteButton = this._element.querySelector('.cards__delete');
	}

// метод _getTemplate - вернем разметку из template-элемента
	_getTemplate() {
		return document
			.querySelector(this._cardSelector) // забираем разметку из HTML и клонируем элемент
			.content
			.querySelector('.cards__item')
			.cloneNode(true);
	}

// публичный метод renderCard - подготовит карточку к публикации
	renderCard() {
		// Добавим данные
		this._cardImage.src = this._link; // изображение/фото
		//this._cardImage.alt = this._alt;
		this._element.querySelector('.cards__caption').textContent = this._name;
		this._setEventListeners(); // добавляем обработчик
		this._handleCardDeleteVisible(); // кнопка удаления
		this._updateLikes() // количество лайков
		// Вернём элемент наружу
		return this._element;
	}

// метод добавления слушателя (отдельный)
	_setEventListeners() {
		// Удаление карточки
		// Находим селектор кнопки удаления
		// Вешаем событие клика
		// Возвращаем метод _deleteCard(ниже)

		this._deleteButton.addEventListener('click', () => {
			this._handleDeleteCardClick(this);
		})
		// Лайк карточки

		this._likeButton.addEventListener('click', () => {
			if (this._ifLiked()) {
				this._handleRemoveLike(this);
			} else {
				this._handleAddLike(this);
			}
		});
		//this._likeCard();
		// })
		// Открытие попапа карточки

		this._cardImage.addEventListener('click', () => {
			this._openPopupWithImage();
		})
	}

	_ifLiked() {
		return this._likes.some((like) => like._id === this._currentUserId);
	}

	_updateLikes() {
		this._element.querySelector('.cards__like-counter').textContent = this._likes.length;
		if (this._ifLiked()) {
			this._likeButton.classList.add('cards__like_active');
		} else {
			this._likeButton.classList.remove('cards__like_active');
		}
	}

	setLikesInfo(data) {
		this._likes = data.likes;
		this._updateLikes();
	}


	// метод удаления карточки
	// _deleteCard() {
	// 	this._element.remove(); // удаляем элемент из DOM
	// }

// метод лайка карточки
// 	_likeCard() {
// 		this._likeButton.classList.toggle('cards__like_active'); // при каждом нажатии меняется класс
//
// 	}

	_openPopupWithImage() {
		this._handleCardClick(
			this._name,
			this._link,
		)
	}

	_handleCardDeleteVisible() {
		if (this._currentUserId === this._ownerId) {
			this._deleteButton.classList.add('cards__delete_type_visible');
		}
	}

	deleteCard() {
		this._element.remove();
	}

	cardId() {
		return this._cardId;
	}
}

export {Card};