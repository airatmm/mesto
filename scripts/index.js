import {initialCards} from "./config.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

/* для попапа редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit'); //возвращаем попап редактирования профиля (popup_type_edit)
const editButton = document.querySelector('.profile__button_action_edit'); //возвращаем элемент profile__button_action_edit (копка редактирования профиля) из секции profile
const formEdit = document.querySelector('.popup__form_edit'); //возвращаем элемент popup__form_edit (форма попапа. имя / о себе) (div popup)

const titleProfile = document.querySelector('.profile__title'); //возвращаем элемент profile__title из секции profile (заголовок профиля (имя))
const titleField = document.querySelector('.popup__input_type_title'); //возвращаем элемент popup__input_type_title (div popup)  (заголовок профиля (имя) в попапе)

const discriptionField = document.querySelector('.popup__input_type_discription'); //возвращаем элемент popup__input_type_discription (div popup) (описание профиля (о себе) в попапе)
const discriptionText = document.querySelector('.profile__discription'); //возвращаем элемент profile__discription из секции profile (описание профиля (о себе))

/* для попапа добавления карточек*/
const popupAddCard = document.querySelector('.popup_type_card'); // попап добавления карточки
const addCardButton = document.querySelector('.profile__button_action_add'); //кнопка добавления карточки(+)

const cardTitle = document.querySelector('.popup__input_card_name'); // инпут названия
const cardUrl = document.querySelector('.popup__input_card_url'); // // инпут ссылки / изображения

const addCardForm = document.querySelector('.popup__form_card'); //форма добавления карточки
//
export const popupPhoto = document.querySelector('.popup_type_foto'); // попап фотографий
export const photoUrl = popupPhoto.querySelector('.popup__photo-image'); // ссылка на изображение/фото
export const photoTitle = popupPhoto.querySelector('.popup__photo-title'); // заголовок карточки при открытии изображения
// const closePhoto = document.querySelector('.popup__close_photo'); // закртытие попапа изображения/фото

const editProfileForm = popupEdit.querySelector('.popup__form');
const addProfileForm = popupAddCard.querySelector('.popup__form');

// находим ul-ку
const cardsList = document.querySelector('.cards__list');

// переменная для обработчика который объединяет закрытия по крестику и оверлею
const popups = document.querySelectorAll('.popup')

// возможно лучше вынести в config.js
const params = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

// фунцкия создания карточки
function createCard(item) {
	const card = new Card(item.name, item.link, item.alt, '.template');
	return card.renderCard();
}

// первичная загрузка карточек из config.js
initialCards.forEach((item) => {
	const cardsItem = createCard(item);
	cardsList.append(cardsItem);

})

//функция для открытия попапов
export function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEscape); // назначаем слушатель клавиши Esc в попапе
	//popup.addEventListener('mousedown', closeByClick);
}

//функция для закрытия попапов
function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEscape); //удаляем слушатель клавиши Esc в попапе
}

//функция закрытия попапа клавишей Esc
function closeByEscape(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup);
	}
}

//функция открытия попапа редактирования
function openPopupEdit() {
	openPopup(popupEdit);
	titleField.value = titleProfile.textContent;
	discriptionField.value = discriptionText.textContent;
}

//функция открытия попапа добавления карточки
function openPopupAdd() {
	openPopup(popupAddCard);
}

/* Отправка формы редактирования профиля*/
function submitEditForm(event) {
	event.preventDefault(); // для того что бы страница не перезагружалась
	titleProfile.textContent = titleField.value;
	discriptionText.textContent = discriptionField.value;
	closePopup(popupEdit);
}

//функция добавления карточки в начало списка, кнопка +
function hanldeCardFormSubmit(event) {
	event.preventDefault();
	cardsList.prepend(createCard({
			name: cardTitle.value,
			link: cardUrl.value,
			alt: cardTitle.value
		})
	);
	cardTitle.value = '';
	cardUrl.value = '';
	closePopup(popupAddCard);
	formAddPhotoValidator.disableSubmitButton();
}

// Обработчик который объединяет закрытия по крестику и оверлею
// используются универсальные классы попапов 'popup_opened' и 'popup__close'
popups.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup_opened')) {
			closePopup(popup)
		}
		if (evt.target.classList.contains('popup__close')) {
			closePopup(popup)
		}
	})
})

editButton.addEventListener('click', openPopupEdit); // открытие попапа редактирования по клику
addCardButton.addEventListener('click', openPopupAdd); // открытиее попапа добавления карточки по клику
formEdit.addEventListener('submit', submitEditForm); // отправка формы по событию
addCardForm.addEventListener('submit', hanldeCardFormSubmit) // отправка формы создать карточку


const formEditProfileValidator = new FormValidator(params, editProfileForm);
formEditProfileValidator.enableValidation();
const formAddPhotoValidator = new FormValidator(params, addProfileForm);
formAddPhotoValidator.enableValidation();
