// класс наследуется от Popup
import {Popup} from '../components/Popup.js';

// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this.popupPhotoImage = this._popup.querySelector('.popup__photo-image');
		this._popupTitle = this._popup.querySelector('.popup__photo-title');
	}

	open(name, link) {
		this.popupPhotoImage.src = link;
		this.popupPhotoImage.alt = name;
		this._popupTitle.textContent = name;
		super.open();
	}
}
