/* для попапа редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit'); //возвращаем попап редактирования профиля (popup_type_edit) 
const popupCloseEdit = document.querySelector('.popup__close_edit'); //возвращаем элемент popup__close_edit (кнопка закрытия попапа редактирования)
const editButton = document.querySelector('.profile__button_action_edit'); //возвращаем элемент profile__button_action_edit (копка редактирования профиля) из секции profile
const formEditSaveButton = document.querySelector('.popup__button_edit_save'); //возвращаем элемент popup__button_edit_save (кнопка сохраниения)
const formEdit = document.querySelector('.popup__form_edit'); //возвращаем элемент popup__form_edit (форма попапа. имя / о себе) (div popup)

const titleProfile = document.querySelector('.profile__title'); //возвращаем элемент profile__title из секции profile (заголовок профиля (имя))
const titleField = document.querySelector('.popup__input_type_title'); //возвращаем элемент popup__input_type_title (div popup)  (заголовок профиля (имя) в попапе)

const discriptionField = document.querySelector('.popup__input_type_discription'); //возвращаем элемент popup__input_type_discription (div popup) (описание профиля (о себе) в попапе)
const discriptionText = document.querySelector('.profile__discription'); //возвращаем элемент profile__discription из секции profile (описание профиля (о себе))

/* для попапа добавления карточек*/
const popupAddCard = document.querySelector('.popup_type_card'); // попап добавления карточки
const closeCardButton = document.querySelector('.popup__close_card'); //кнопка закрытия попапа добавления карточки
const addCardButton = document.querySelector('.profile__button_action_add'); //кнопка добавления карточки(+)
const addCardSaveButton = document.querySelector('.popup__button_card_save'); //кнопка создать новую карточку

const cardTitle = document.querySelector('.popup__input_card_name'); // инпут названия  
const cardUrl = document.querySelector('.popup__input_card_url'); // // инпут ссылки / изображения

const addCardForm = document.querySelector('.popup__form_card'); //форма добавления карточки

const photoUrl = document.querySelector('.popup__photo-image'); // ссылка на изображение/фото
const photoTitle = document.querySelector('.popup__photo-title'); // заголовок карточки при открытии изображения

const closePhoto = document.querySelector('.popup__close_photo'); // закртытие попапа изображения/фото

// массив карточек
const initialCards = [
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

const cardsList = document.querySelector('.cards__list'); // находим ul-ку
const template = document.querySelector('.template').content; // Берем всё содержимое темплейта

const popupPhoto = document.querySelector('.popup_type_foto'); // попап фотографий 
const closeButtonPhoto = popupPhoto.querySelector('.popup__close_button'); // кнопка закрытия попапа фотографий

// Перебираем массив и при каждой итерации добавляем(рендерим) карточки
initialCards.forEach(appendCards);

// Функция создания карточки при загрузке страницы (возможно нужно назвать её что то вроде renderCreateCards)
function createCards(item) {
    const cardsItem = template.querySelector('.cards__item').cloneNode(true);
    const photo = cardsItem.querySelector('.cards__images'); // изображение/фото
    cardsItem.querySelector('.cards__caption').textContent = item.name;
    photo.src = item.link;
    photo.alt = item.name;

    const likeButton = cardsItem.querySelector('.cards__like'); // кнопка лайка

    const deleteButton = cardsItem.querySelector('.cards__delete'); //кнопка удалить



    // функция лайка
    function likeCards(event) {
        event.target.classList.toggle('cards__like_active');
    };

    // функция удаления карточки
    function deleteCards() {
        deleteButton.closest('.cards__item').remove(); // closest - возвращает ближайший родительский элемент с переданным селектором и remove срабатывает на весь элемент списка
    };

    likeButton.addEventListener('click', likeCards); // лайк по клику
    deleteButton.addEventListener('click', deleteCards); // удаление по клику

    // открываем фотографию, подтягиваем фотографию(урл), заголовок, добавляем класс popup__dark для затемнение оверлея
    function openPhoto() {
        openPopup(popupPhoto);
        photoUrl.src = item.link;
        photoUrl.alt = item.name;
        photoTitle.textContent = item.name;
    }

    photo.addEventListener('click', openPhoto); // открытие попапа фотографий по клику

    return cardsItem;
}



// Функция встраивания карточек при загрузке страницы (встраивается в конец)
function appendCards(item) {
    const cardsItem = createCards(item);
    cardsList.append(cardsItem); //встраиваем в конец списка
}

//функция для открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    closeOverlayByClick(popup);
    closeOverlayByEscape(popup);
}

//функция для закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOverlayByEscape());
}

//функция закрытия попапа по клику на оверлей
function closeOverlayByClick(popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup)
        };
    });
};

//функция закрытия попапа клавишей Esc
function closeOverlayByEscape(popup) {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        };
    });
};

//функция открытия попапа редактирования
function openPopupEdit() {
    openPopup(popupEdit);
    titleField.value = titleProfile.textContent;
    discriptionField.value = discriptionText.textContent;

}
//функция закрытия попапа редактирования
function closePopupEdit() {
    closePopup(popupEdit);
}

//функция открытия попапа добавления карточки
function openPopupAdd() {
    openPopup(popupAddCard);
}

//функция закрытия попапа добавления карточки
function closePopupAdd() {
    closePopup(popupAddCard);
}

/* Отправка формы редактирования профиля*/
function submitEditForm(event) {
    event.preventDefault(); // для того что бы страница не перезагружалась

    titleProfile.textContent = titleField.value;
    discriptionText.textContent = discriptionField.value;

    closePopup(popupEdit);
}

function hanldeCardFormSubmit(event) { //добавление карточки вначало списка, кнопка создать
    event.preventDefault();
    cardsList.prepend(
        createCards({ name: cardTitle.value, link: cardUrl.value })
    );
    cardTitle.value = '';
    cardUrl.value = '';
    closePopupAdd();
}

function closePopupPhoto() {
    closePopup(popupPhoto);
}


editButton.addEventListener('click', openPopupEdit); // открытие попапа редактирования по клику
popupCloseEdit.addEventListener('click', closePopupEdit); // закрытие попапа редактирования по клику на крестик

addCardButton.addEventListener('click', openPopupAdd); // открытиее попапа добавления карточки по клику
closeCardButton.addEventListener('click', closePopupAdd); // закрытие попапа добавления карточки по клику

formEdit.addEventListener('submit', submitEditForm); // отправка формы по событию 
addCardForm.addEventListener('submit', hanldeCardFormSubmit) // отправка формы создать карточку

closeButtonPhoto.addEventListener('click', closePopupPhoto); // закрытие попапа фотографий