// класс наследуется от Popup
import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
	// принимает в конструктор селектор попапа и колбэк сабмита формы
	constructor({popupSelector, handleFormSubmit}) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._popupForm = this._popup.querySelector('.popup__form');
		this._inputList = this._popupForm.querySelectorAll('.popup__input'); // достаём все элементы полей
	}

	// метод который собирает данные всех полей формы
	_getInputValues() {
		// создаём пустой объект
		this._formValues = {};
		// добавляем в этот объект значения всех полей
		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		// возвращаем объект значений
		return this._formValues;
	}

//В методе _setEventListeners при отправке формы вызовем _handleFormSubmit.
// В качестве аргумента передадим ей объект, который возвращает функция _getInputValues
	setEventListeners() {
		super.setEventListeners();
		this._popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			// добавим вызов функции _handleFormSubmit
			// передадим ей объект — результат работы _getInputValues
			this._handleFormSubmit(this._getInputValues());
			this.close();
		});
	}

	// Перезаписываем родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
	close() {
		super.close();
		this._popupForm.reset();
	}
}