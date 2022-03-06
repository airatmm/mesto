import './index.css';

import {
    params,
    profileName,
    profileDescription,
    profileAvatar,
    titleField,
    descriptionField,
    addCardButton,
    editButton,
    editProfileForm,
    addProfileForm,
    editAvatarForm,
    popupAvatarButton
} from "../utils/constants.js";

import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";

import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

// профиль пользователя
const userProfile = new UserInfo({
    profileName,
    profileDescription,
    profileAvatar
});
// profileName - '.profile__title' - имя
// profileDescription - '.profile__description' - о себе
// profileAvatar = '.profile__image' - аватар

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort36',
    token: 'bf2f8230-a13a-4d61-9144-22039310a203'
});

// переменная текущего пользователя
let currentUserId;

Promise.all([
    api.getCards(),
    api.getUser()
]).then(([cards, profile]) => {
    currentUserId = profile._id;
    cardsList.renderItems(cards); // Рендерим  карточки пользователей
    userProfile.setUserInfo(profile); // грузим данные пользователя
}).catch(err => {
    console.log(`Error: ${err}`);
})

const createCard = (item) => {
    const card = new Card(
        item,
        currentUserId,
        '.template',
        {
            handleCardClick: () => {  // Создаем объект с методом открытия и событиями
                openImagePopup.open(item.name, item.link); // Передаем метод открытия popup
            },
            // удаление карточки, открытие попапа, появление кнопки удаления если карточка моя
            handleDeleteCardClick: (card) => {
                popupDeleteCard.open();
                popupDeleteCard.setSubmitCallback(() => {
                    api.deleteCard(card.cardId())
                        .then(() => {
                            card.deleteCard();
                            popupDeleteCard.close();
                        })
                        .catch(err => {
                            console.log(`Ошибка при удалении карточки: ${err}`)
                        })
                });
            },

            // лайк карточки
            handleLikeClick: (card) => {
                if (card.ifLiked()) { // проверям если ли лайк есть, то удаляем
                    api.removeLike(card.cardId())
                        .then((data) => {
                            card.setLikesInfo(data.likes);
                        })
                        .catch(err => {
                            console.log(`Ошибка удаления лайка: ${err}`)
                        });
                } else { // иначе ставим лайк
                    api.addLike(card.cardId())
                        .then((data) => {
                            card.setLikesInfo(data.likes);
                        })
                        .catch(err => {
                            console.log(`Ошибка лайка: ${err}`)
                        });
                }
            }
        });
    return card.renderCard()
}
// вставим карточки в разметку
const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
}, params.cardListSelector);

// попап удаления карточки
const popupDeleteCard = new PopupWithConfirm('.popup_type_delete');
popupDeleteCard.setEventListeners();

// новый экземпляр класса PopupWithImage
const openImagePopup = new PopupWithImage(params.popupPhotoSelector);
openImagePopup.setEventListeners(); // Передаём слушатели событий

// попап добавления новой карточки
const popupAddCardForm = new PopupWithForm({
    popupSelector: '.popup_type_card',
    handleFormSubmit: (item) => {
        popupAddCardForm.isLoading(true);
        api.addNewCard(item)
            .then(result => {
                cardsList.prependItem(createCard(result)); // добавляем в начало - метод prependItem в Section.js
                this.close();
            })
            .catch(err => {
                console.log(`Ошибка добавления карточки: ${err}`)
            })
            .finally(() => {
                popupAddCardForm.isLoading(false);
            })
    }
})
popupAddCardForm.setEventListeners();

// попап профиля пользователя
const popupProfileForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (item) => {
        popupProfileForm.isLoading(true);
        api.editProfile(item)
            .then(result => {
                userProfile.setUserInfo(result);  // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
                popupProfileForm.close();
            })
            .catch(err => {
                console.log(`Ошибка профиля пользователя: ${err}`);
            })

            .finally(() => {
                popupProfileForm.isLoading(false);
            })
    }
});
popupProfileForm.setEventListeners();

// попап аватара пользователя
const popupAvatarForm = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (item) => {
        popupAvatarForm.isLoading(true);
        api.changeUserAvatar(item)
            .then(result => {
                userProfile.setUserInfo(result);
                popupAvatarForm.close();
            })
            .catch(err => {
                console.log(`Ошибка при изменении аватара пользователя: ${err}`)
            })
            .finally(() => {
                popupAvatarForm.isLoading(false);
            })
    }
});
popupAvatarForm.setEventListeners();


// валидация форм
const addCardFormValidation = new FormValidator(params, addProfileForm);
const profileFormValidation = new FormValidator(params, editProfileForm);
const profileAvatarValidation = new FormValidator(params, editAvatarForm);
addCardFormValidation.enableValidation();
profileFormValidation.enableValidation();
profileAvatarValidation.enableValidation();


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

// кнопка сменить аватар
popupAvatarButton.addEventListener('click', () => {
    popupAvatarForm.open();
});

