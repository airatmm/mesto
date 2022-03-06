class Card {
	constructor(data, currentUserId, cardSelector, {handleCardClick, handleDeleteCardClick, handleLikeClick}) {
		this._name = data.name; // название/тайтл карточки
		this._link = data.link; // сыылка на изображение
		this._likes = data.likes ?? []; // лайки карточек, если их нет при загрузке применять правую часть, пустой массив
		this._cardId = data._id; // id карточки
		this._ownerId = data.owner._id; // id владельца юзера добавившего эту карточку
		this._currentUserId = currentUserId; // текущий пользватель
		this._alt = data.name; // альт карточки
		this._cardSelector = cardSelector; // селектор карточки
		this._handleCardClick = handleCardClick; // открыть карточку, попап
		this._handleDeleteCardClick = handleDeleteCardClick; // удаление карточки
		this._handleLikeClick = handleLikeClick; // лайк карточки
		this._element = this._getTemplate();// Запишем разметку в поле _element.
		this._cardImage = this._element.querySelector('.cards__images'); // картинка по селектору
		this._likeButton = this._element.querySelector('.cards__like'); // кнопка лайка по селектору
		this._deleteButton = this._element.querySelector('.cards__delete'); // кнопка удаления карточки
		this._likeCounter = this._element.querySelector('.cards__like-counter'); // счетчик лайков
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
		this._cardImage.alt = this._alt;
		this._element.querySelector('.cards__caption').textContent = this._name;
		this._setEventListeners(); // добавляем обработчик
		this._handleCardDeleteVisible(); // кнопка удаления
		this.updateLikes() // количество лайков
		return this._element; // Вернём элемент наружу
	}

	// метод добавления слушателя (отдельный)
	_setEventListeners() {
		// Удаление карточки
		this._deleteButton.addEventListener('click', () => {
			this._handleDeleteCardClick(this);
		})
		// Лайк карточки
		this._likeButton.addEventListener('click', () => {
			this._handleLikeClick(this);
		});
		// попап открытия карточки
		this._cardImage.addEventListener('click', () => {
			this._openPopupWithImage();
		})
	}

	// проверяем есть ли лайки
	ifLiked() {
		return this._likes.some((like) => like._id === this._currentUserId);
	}

	// обновляем лайки карточек
	updateLikes() {
		this._likeCounter.textContent = this._likes.length;
		if (this.ifLiked()) {
			this._likeButton.classList.add('cards__like_active');
		} else {
			this._likeButton.classList.remove('cards__like_active');
		}
	}

	// метод установки лайков
	setLikesInfo(likes) {
		this._likes = likes;
		this.updateLikes();
	}

	// открытие попапа с карточкой
	_openPopupWithImage() {
		this._handleCardClick(
			this._name,
			this._link,
		)
	}

	// проверям моя ли карточка и если да то показываем кнопку удаления
	_handleCardDeleteVisible() {
		if (this._ownerId === this._currentUserId) {
			this._deleteButton.classList.add('cards__delete_type_visible');
		} else {
			this._deleteButton.classList.remove('cards__delete_type_visible');
		}
	}

	// метод удаления карточки
	deleteCard() {
		this._element.remove();
	}

	// id карточки
	cardId() {
		return this._cardId;
	}
}

export {Card};