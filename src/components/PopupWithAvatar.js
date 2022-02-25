// класс наследуется от Popup
import {Popup} from './Popup.js';

export class PopupWithAvatar extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupForm = this._popup.querySelector('.popup__form');
	}


	//В методе _setEventListeners при отправке формы вызовем _handleFormSubmit.
	// В качестве аргумента передадим ей объект, который возвращает функция _getInputValues
	setEventListeners() {
		super.setEventListeners();
		this._popupForm.addEventListener('submit', (evt) => {
			evt.preventDefault();
			// добавим вызов функции _handleFormSubmit
			this._handleFormSubmit();
			this.close();
		});
	}
}