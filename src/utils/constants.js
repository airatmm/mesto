export const params = {
    cardListSelector: '.cards__list',
    popupPhotoSelector: '.popup_type_photo',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',

};

export const profileName = document.querySelector('.profile__title'); // Находим блок с именем
export const profileDescription = document.querySelector('.profile__description'); // Находим блок с описанием
export const profileAvatar = document.querySelector('.profile__image') // аватар профиля
export const popupAvatarButton = document.querySelector('.profile__avatar');

export const addCardButton = document.querySelector('.profile__button_action_add'); //кнопка добавления карточки(+)
export const editButton = document.querySelector('.profile__button_action_edit'); //(копка редактирования профиля)

export const titleField = document.querySelector('.popup__input_type_title');
export const descriptionField = document.querySelector('.popup__input_type_description')

const popupEdit = document.querySelector('.popup_type_edit'); //возвращаем попап редактирования профиля (popup_type_edit)
const popupAddCard = document.querySelector('.popup_type_card'); // попап добавления карточки
const popupAvatar = document.querySelector('.popup_type_avatar') // попап аватара

export const editProfileForm = popupEdit.querySelector('.popup__form');
export const addProfileForm = popupAddCard.querySelector('.popup__form');
export const editAvatarForm = popupAvatar.querySelector('.popup__form');






