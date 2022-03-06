// Класс отвечает за открытие и закрытие попапа.
export class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this.close = this.close.bind(this);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._closeByClick = this._closeByClick.bind(this);
		this._popupSaveButton = this._popup.querySelector('.popup__button');
	}

	// открытие popup
	open() {
		this._popup.classList.add('popup_opened');
		this._popup.addEventListener('mousedown', this._closeByClick);
		document.addEventListener('keydown', this._handleEscClose);
	}

	// закрытие popup
	close() {
		this._popup.classList.remove('popup_opened');
		this._popup.removeEventListener('mousedown', this._closeByClick);
		document.removeEventListener('keydown', this._handleEscClose);
	}

	// добавляет слушатель клика иконке закрытия попапа
	setEventListeners() {
		this._popup
			.querySelector('.popup__close')
			.addEventListener('click', this.close);
	}

	//  содержит логику закрытия попапа клавишей Esc
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

// закрытие по оверлею
	_closeByClick(evt) {
		if (evt.currentTarget === evt.target) {
			this.close();
		}
	}

	// метод загрузки  'Сохранение...'
	isLoading(isLoading) {
		if (isLoading) {
			this._popupSaveButton.textContent = 'Сохранение...'
		} else if (this._popupSelector === '.popup_type_card') {
			this._popupSave.textContent = 'Создать'
		} else {
			this._popupSaveButton.textContent = 'Сохранить'
		}
	}
}