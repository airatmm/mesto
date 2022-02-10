import {
	initialCards,
	params,
	profileName,
	profileDescription,
	titleField,
	descriptionField,
	addCardButton,
	editButton
} from "../utils/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";

import {Popup} from '../components/Popup.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';


/* для попапа редактирования профиля*/
//const popupEdit = document.querySelector('.popup_type_edit'); //возвращаем попап редактирования профиля (popup_type_edit)
// const editButton = document.querySelector('.profile__button_action_edit'); //возвращаем элемент profile__button_action_edit (копка редактирования профиля) из секции profile
// const formEdit = document.querySelector('.popup__form_edit'); //возвращаем элемент popup__form_edit (форма попапа. имя / о себе) (div popup)
//
// const titleProfile = document.querySelector('.profile__title'); //возвращаем элемент profile__title из секции profile (заголовок профиля (имя))
// const titleField = document.querySelector('.popup__input_type_title'); //возвращаем элемент popup__input_type_title (div popup)  (заголовок профиля (имя) в попапе)
//
// const descriptionField = document.querySelector('.popup__input_type_description'); //возвращаем элемент popup__input_type_description (div popup) (описание профиля (о себе) в попапе)
// const descriptionText = document.querySelector('.profile__description'); //возвращаем элемент profile__description из секции profile (описание профиля (о себе))
//
// /* для попапа добавления карточек*/
// const popupAddCard = document.querySelector('.popup_type_card'); // попап добавления карточки
// const addCardButton = document.querySelector('.profile__button_action_add'); //кнопка добавления карточки(+)
//
// const cardTitle = document.querySelector('.popup__input_card_name'); // инпут названия
// const cardUrl = document.querySelector('.popup__input_card_url'); // // инпут ссылки / изображения
//
// const addCardForm = document.querySelector('.popup__form_card'); //форма добавления карточки
// //
// export const popupPhoto = document.querySelector('.popup_type_foto'); // попап фотографий
// export const photoUrl = popupPhoto.querySelector('.popup__photo-image'); // ссылка на изображение/фото
// export const photoTitle = popupPhoto.querySelector('.popup__photo-title'); // заголовок карточки при открытии изображения
// // const closePhoto = document.querySelector('.popup__close_photo'); // закртытие попапа изображения/фото

//const editProfileForm = popupEdit.querySelector('.popup__form');
//const addProfileForm = popupAddCard.querySelector('.popup__form');

// // находим ul-ку
// const cardsList = document.querySelector('.cards__list');

// переменная для обработчика который объединяет закрытия по крестику и оверлею
//const popups = document.querySelectorAll('.popup')


////////////////////////////////////////////

const createCard = (item) => {
	const openImagePopup = new PopupWithImage(params.popupPhotoSelector);
	// создание экземпляра класса Card
	const card = new Card(item.name, item.link, item.alt, '.template',
		{
			handleCardClick: () => {  // Создаем объект с методом открытия и событиями
				openImagePopup.open(item.name, item.link); // Передаем метод открытия popup
				openImagePopup.setEventListeners(); // Передаём слушатели событий
			}
		});
	return card.renderCard(); // метод renderCard - подготовит карточку к публикации (Card.js)
}

const cardsList = new Section({
		// items - конструктор Section-a
		// initialCards - массив карточек из constants
		items: initialCards,
		// функция-колбэк (инструкция) с единственным параметром item (можно назвать cardItem)
		// в методе renderItems (Section.js) мы передаем ей аргумент — текущий элемент массива — item
		// Этот элемент массива и попадёт на место параметра renderer: (item)
		renderer: (item) => {
			cardsList.addItem(createCard(item)); //метод addItem, который принимает DOM-элемент и добавляет его в контейнер (Section.js)
		},
	},
	params.cardListSelector); // селектор контейнера, в который нужно добавлять созданные элементы constants

cardsList.renderItems();

const UserProfile = new UserInfo({profileName, profileDescription});

// const UserProfile = new UserInfo({
// 	profileName: '.profile__title',
// 	profileDescription: '.profile__description'
// });

const popupProfileForm = new PopupWithForm({
	popupSelector: '.popup_type_edit',
	handleFormSubmit: (item) => {
		UserProfile.setUserInfo(item);
		console.log(item)
	}
})
popupProfileForm.setEventListeners();


const popupAddCardForm = new PopupWithForm({
	popupSelector: '.popup_type_card',
	handleFormSubmit: (item) => {
		cardsList.prependItem(createCard(item));
		console.log(item)
	}
})
popupAddCardForm.setEventListeners();

editButton.addEventListener('click', () => {
	const profile = UserProfile.getUserInfo();
	titleField.value = profile.name;
	descriptionField.value = profile.description;
	UserProfile.getUserInfo();
	popupProfileForm.open();
	//formProfileValidation.hideFormErrors();
});

addCardButton.addEventListener('click', () => {
	popupAddCardForm.open();
	//formPlaceValidation.hideFormErrors();
})


//const openEditProfileForm = new PopupWithForm({});

//const openAddCardForm = new PopupWithForm({});


////////////////////////////////////////////////////

// // фунцкия создания карточки
// function createCard(item) {
// 	const card = new Card(item.name, item.link, item.alt, '.template');
// 	return card.renderCard();
// }

// // первичная загрузка карточек из constants.js
// initialCards.forEach((item) => {
// 	const cardsItem = createCard(item);
// 	cardsList.append(cardsItem);
//
// })

// //функция для открытия попапов
// export function openPopup(popup) {
// 	popup.classList.add('popup_opened');
// 	document.addEventListener('keydown', closeByEscape); // назначаем слушатель клавиши Esc в попапе
// 	//popup.addEventListener('mousedown', closeByClick);
// }

// //функция для закрытия попапов
// function closePopup(popup) {
// 	popup.classList.remove('popup_opened');
// 	document.removeEventListener('keydown', closeByEscape); //удаляем слушатель клавиши Esc в попапе
// }

// //функция закрытия попапа клавишей Esc
// function closeByEscape(evt) {
// 	if (evt.key === 'Escape') {
// 		const openedPopup = document.querySelector('.popup_opened');
// 		closePopup(openedPopup);
// 	}
// }

// //функция открытия попапа редактирования
// function openPopupEdit() {
// 	openPopup(popupEdit);
// 	titleField.value = titleProfile.textContent;
// 	descriptionField.value = descriptionText.textContent;
// }
//
// //функция открытия попапа добавления карточки
// function openPopupAdd() {
// 	openPopup(popupAddCard);
// }

// /* Отправка формы редактирования профиля*/
// function submitEditForm(event) {
// 	event.preventDefault(); // для того что бы страница не перезагружалась
// 	titleProfile.textContent = titleField.value;
// 	descriptionText.textContent = descriptionField.value;
// 	closePopup(popupEdit);
// }

// //функция добавления карточки в начало списка, кнопка +
// function hanldeCardFormSubmit(event) {
// 	event.preventDefault();
// 	cardsList.prepend(createCard({
// 			name: cardTitle.value,
// 			link: cardUrl.value,
// 			alt: cardTitle.value
// 		})
// 	);
// 	cardTitle.value = '';
// 	cardUrl.value = '';
// 	closePopup(popupAddCard);
// 	formAddPhotoValidator.disableSubmitButton();
// }
//
// // Обработчик который объединяет закрытия по крестику и оверлею
// // используются универсальные классы попапов 'popup_opened' и 'popup__close'
// popups.forEach((popup) => {
// 	popup.addEventListener('click', (evt) => {
// 		if (evt.target.classList.contains('popup_opened')) {
// 			closePopup(popup)
// 		}
// 		if (evt.target.classList.contains('popup__close')) {
// 			closePopup(popup)
// 		}
// 	})
// })
//
// editButton.addEventListener('click', openPopupEdit); // открытие попапа редактирования по клику
// addCardButton.addEventListener('click', openPopupAdd); // открытиее попапа добавления карточки по клику
// formEdit.addEventListener('submit', submitEditForm); // отправка формы по событию
// addCardForm.addEventListener('submit', hanldeCardFormSubmit) // отправка формы создать карточку
//
//
// const formEditProfileValidator = new FormValidator(params, editProfileForm);
// formEditProfileValidator.enableValidation();
// const formAddPhotoValidator = new FormValidator(params, addProfileForm);
// formAddPhotoValidator.enableValidation();

