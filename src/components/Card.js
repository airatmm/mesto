class Card {
	constructor(data, cardSelector, {handleCardClick}) {
		this._name = data.name;
		this._link = data.link;
		//this._alt = data.name;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._element = this._getTemplate();// Запишем разметку в поле _element.
		this._cardImage = this._element.querySelector('.cards__images'); // картинка по селектору
		this._likeButton = this._element.querySelector('.cards__like'); // кнопка лайка по селектору
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

		// Вернём элемент наружу
		return this._element;
	}

// метод добавления слушателя (отдельный)
	_setEventListeners() {
		// Удаление карточки
		// Находим селектор кнопки удаления
		// Вешаем событие клика
		// Возвращаем метод _deleteCard(ниже)
		this._element.querySelector('.cards__delete').addEventListener('click', () => {
			this._deleteCard();
		})
		// Лайк карточки

		this._likeButton.addEventListener('click', () => {
			this._likeCard();
		})
		// Открытие попапа карточки

		this._cardImage.addEventListener('click', () => {
			this._openPopupWithImage();
		})
	}

	// метод удаления карточки
	_deleteCard() {
		this._element.remove(); // удаляем элемент из DOM
	}

// метод лайка карточки
	_likeCard() {
		this._likeButton.classList.toggle('cards__like_active'); // при каждом нажатии меняется класс
	}

	_openPopupWithImage() {
		this._handleCardClick(
			this._name,
			this._link,
		)
	}
}

export {Card};