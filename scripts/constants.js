// массив карточек
export const initialCards = [
    {
        name: 'Retro Car',
        link: 'https://cdn.pixabay.com/photo/2015/05/28/23/12/auto-788747_960_720.jpg'
    },
    {
        name: 'Телескоп',
        link: 'https://cdn.pixabay.com/photo/2017/03/08/20/12/viewing-machine-2127704_960_720.jpg'
    },
    {
        name: 'Лондон',
        link: 'https://cdn.pixabay.com/photo/2014/11/13/23/34/palace-530055_960_720.jpg'
    },
    {
        name: 'Печеньки',
        link: 'https://cdn.pixabay.com/photo/2019/06/01/21/02/cookie-4245030_960_720.jpg'
    },
    {
        name: 'Рождество',
        link: 'https://cdn.pixabay.com/photo/2015/02/25/07/39/church-648430_960_720.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// возможно лучше вынести в constants.js
export const params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};