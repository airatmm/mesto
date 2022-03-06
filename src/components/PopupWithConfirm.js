import {Popup} from './Popup.js';

// попап удаления карточки
export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._handleSubmitCallback();
        });
    }

    setSubmitCallback(callback) {
        this._handleSubmitCallback = callback;
    }
}