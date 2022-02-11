class Card {
	constructor(name, link, alt, cardSelector, {handleCardClick}) {
		this._name = name;
		this._link = link;
		this._alt = alt;
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
		//this._photo = this._element.querySelector('.cards__images');
		this._cardImage.src = this._link; // изображение/фото
		this._cardImage.alt = this._alt;
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
		// Находим селектор кнопки лайка
		// Вешаем событие клика
		// Возвращаем метод _likeCard(ниже)
		this._likeButton.addEventListener('click', () => {
			this._likeCard();
		})
		// Открытие попапа карточки
		// Находим селектор карточки
		// Вешаем событие клика
		// Возвращаем метод _openPhoto(ниже)
		// this._cardImage.addEventListener('click', () => {
		// 	this._openPhoto();
		// })
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
		//const likeButton = this._element.querySelector('.cards__like'); // кнопка лайка по слелектору
		this._likeButton.classList.toggle('cards__like_active'); // при каждом нажатии меняется класс
	}

	_openPopupWithImage() {
		this._handleCardClick(
			this._name,
			this._link,
		)
	}

// метод открыти попапа с карточкой

// 	_openPhoto() {
// 		openPopup(popupPhoto); // функция открытия попапа с карточкой
// 		photoUrl.src = this._link; // само фото
// 		photoUrl.alt = this._name; // альт фотки
// 		photoTitle.textContent = this._name; // заголовок
// 	}
}

export {Card};