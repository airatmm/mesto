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
    addProfileForm,
    popupAvatar
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
const userProfile = new UserInfo({profileName, profileDescription, profileAvatar});
// profileName - '.profile__title' - имя
// profileDescription - '.profile__description' - о себе
// profileAvatar = '.profile__avatar' - аватар

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort36',
    token: 'bf2f8230-a13a-4d61-9144-22039310a203'
});

// переменная текущего пользователя
let currentUserId;

Promise.all([
    api.getCards(),
    api.getUser()
]).then(([cards, userData]) => {
    cardsList.renderItems(cards); // Рендерим  карточки пользователей
    userProfile.setUserInfo(userData); // грузим данные пользователя
    currentUserId = userData._id;
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
    const card = new Card(item, currentUserId, '.template',
        {
            handleCardClick: () => {  // Создаем объект с методом открытия и событиями
                openImagePopup.open(item.name, item.link); // Передаем метод открытия popup
            },
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
            handleAddLike: (card) => {
                api.addLike(card.cardId())
                    .then(() => {
                        card.setLikesInfo();
                    })
                    .catch(err => {
                        console.log(`Ошибка лайка: ${err}`)
                    });
            },
            handleRemoveLike: (card) => {
                api.removeLike(card.cardId())
                    .then(() => {
                        card.setLikesInfo();
                    })
                    .catch(err => {
                        console.log(`Ошибка удаления лайка: ${err}`)
                    });
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

const popupDeleteCard = new PopupWithConfirm('.popup_type_delete');
popupDeleteCard.setEventListeners();

// новый экземпляр класса PopupWithImage
const openImagePopup = new PopupWithImage(params.popupPhotoSelector);
openImagePopup.setEventListeners(); // Передаём слушатели событий

// попап добавления новой карточки
const popupAddCardForm = new PopupWithForm({
    popupSelector: '.popup_type_card',
    handleFormSubmit: (item) => {
        api.addNewCard(item)
            .then(result => {
                cardsList.prependItem(createCard(result)); // добавляем в начало - метод prependItem в Section.js
            })
            .catch(err => {
                console.log(`Ошибка добавления карточки: ${err}`)
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
//

// const popupAvatarForm = new PopupWithForm({
//     popupSelector: '.popup_type_avatar',
//     handleFormSubmit: (item) => {
//         //popupAvatarForm.renderLoading(true);
//         api.changeUserAvatar({
//             avatar: item.userAvatar,
//         })
//             .then((info) => {
//                 user.setUserAvatar({
//                     userAvatar: info.avatar,
//                 });
//                 popupAvatarForm.close();
//             })
//             .catch(err => console.log(`Ошибка при изменении аватара пользователя: ${err}`))
//             .finally(() => popupAvatarForm.renderLoading(false));
//     }
// });
// popupAvatarForm.setEventListeners();


// валидация форм
const addCardFormValidation = new FormValidator(params, addProfileForm);
const profileFormValidation = new FormValidator(params, editProfileForm);
addCardFormValidation.enableValidation();
profileFormValidation.enableValidation();

// открытие попапа редактирования автара
// profileAvatar.addEventListener('click', () => {
//
// })

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

// popupAvatar.addEventListener('click', () => {
//     popupAvatarForm.open();
//     // formAvatarValidation.activityStatusButton();
//     // formAvatarValidation.hideFormErrors();
// });

