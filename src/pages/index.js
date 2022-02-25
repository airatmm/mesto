//import './index.css';

import {
    //initialCards,
    params,
    profileName,
    profileDescription,
    profileAvatar,
    titleField,
    descriptionField,
    addCardButton,
    editButton,
    editProfileForm,
    addProfileForm
} from "../utils/constants.js";

import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";

import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

// профиль пользователя
const userProfile = new UserInfo({profileName, profileDescription, profileAvatar});
// profileName - '.profile__title' - имя
// profileDescription - '.profile__description' - о себе
// profileAvatar = '.profile__avatar' - аватар

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort36',
    token: 'bf2f8230-a13a-4d61-9144-22039310a203'
});

// переменная текущего пользователя
let userId;


Promise.all([
    api.getCards(),
    api.getUser()
]).then(([cards, userData]) => {
    cardsList.renderItems(cards); // Рендерим  карточки пользователей
    userProfile.setUserInfo(userData); // грузим данные пользователя
    userId = userData._id;
}).catch(err => {
    console.log(`Error: ${err}`);
})

// api.getCards()
//     .then(result => {
//         cardsList.renderItems(result)
//     })
//     .catch(error => {
//         console.log('ОШИБКА:', error)
//
//     })
//
// api.getUser()
//     .then(result => {
//         console.log('USER:', result)
//     })
//     .catch(error => {
//         console.log('ОШИБКА:', error)
//     })


const createCard = (item) => {
    const card = new Card(item, '.template',
        {
            handleCardClick: () => {  // Создаем объект с методом открытия и событиями
                openImagePopup.open(item.name, item.link); // Передаем метод открытия popup
            }

        });
    return card.renderCard()

}

const cardsList = new Section({
    //items: data,
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
}, params.cardListSelector);


// новый экземпляр класса PopupWithImage
const openImagePopup = new PopupWithImage(params.popupPhotoSelector);
openImagePopup.setEventListeners(); // Передаём слушатели событий
//
// // функция создания карточки
// const createCard = (item) => {
// 	// создание нового экземпляр класса Card
// 	const card = new Card(item.name, item.link, item.alt, '.template',
// 		{
// 			handleCardClick: () => {  // Создаем объект с методом открытия и событиями
// 				openImagePopup.open(item.name, item.link); // Передаем метод открытия popup
// 			}
// 		});
// 	return card.renderCard(); // метод renderCard - подготовит карточку к публикации (Card.js)
// }
//
// // новый экземпляр класса Section. Изначальный шесть карточек
// const cardsList = new Section({
// 		// items - конструктор Section-a
// 		// initialCards - массив карточек из constants
// 		items: initialCards,
// 		// функция-колбэк (инструкция) с единственным параметром item (можно назвать cardItem)
// 		// в методе renderItems (Section.js) мы передаем ей аргумент — текущий элемент массива — item
// 		// Этот элемент массива и попадёт на место параметра renderer: (item)
// 		renderer: (item) => {
// 			cardsList.addItem(createCard(item)); //метод addItem, который принимает DOM-элемент и добавляет его в контейнер (Section.js)
// 		},
// 	},
// 	params.cardListSelector); // селектор контейнера, в который нужно добавлять созданные элементы (constants.js)
//
// cardsList.renderItems(); // рендерим наши шесть карточек
//
// // новый экземпляр класса UserInfo. Профиль пользователя
//
//
// // попап изменения автара
// const popupAvatarForm = new PopupWithForm({
// 	popupSelector: '.popup_type_avatar',
// 	handleFormSubmit: (item) => {
// 		cardsList.prependItem(createCard(item)); // добавляем в начало - метод prependItem в Section.js
// 	}
// })
// popupAvatarForm.setEventListeners();

// попап добавления новой карточки
const popupAddCardForm = new PopupWithForm({
    popupSelector: '.popup_type_card',
    handleFormSubmit: (item) => {
        api.addNewCard(item)
            .then(result => {
                cardsList.prependItem(createCard(result)); // добавляем в начало - метод prependItem в Section.js
            })
            .catch(err => {
                console.log(err)
            })

    }
})
popupAddCardForm.setEventListeners();

// попап профиля пользователя
const popupProfileForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (item) => {
        //     popupProfileForm.isLoading(true);
        api.editProfile(item)
            .then(result => {
                userProfile.setUserInfo(result);  // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
                popupProfileForm.close();
            })
            .catch(err => {
                console.log(err)
            })
        //console.log(item);
        //     .finally(() => {
        //     popupProfileForm.isLoading(false);
        // })
    }
});
popupProfileForm.setEventListeners();


// валидация форм
const addCardFormValidation = new FormValidator(params, addProfileForm);
const profileFormValidation = new FormValidator(params, editProfileForm);
addCardFormValidation.enableValidation();
profileFormValidation.enableValidation();

// открытие попапа редактирования автара
profileAvatar.addEventListener('click', () => {

})

// открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
    const profile = userProfile.getUserInfo(); // метод getUserInfo, который возвращает(получает) объект с данными пользователя
    titleField.value = profile.name;
    descriptionField.value = profile.about;
    profileFormValidation.resetValidation();
    popupProfileForm.open();
});

// открытие попапа добавления карточки
addCardButton.addEventListener('click', () => {
	addCardFormValidation.resetValidation();
	popupAddCardForm.open();
})