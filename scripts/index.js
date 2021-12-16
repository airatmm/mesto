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

const addCardForm = document.querySelector('.popup__form_card');



// массив карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsList = document.querySelector('.cards__list'); // находим ul-ку
const template = document.querySelector('.template').content; // Берем всё содержимое темплейта


// Перебираем массив и при каждой итерации добавляем(рендерим) карточки
initialCards.forEach(addAppendCards);

// Функция создания карточки при загрузке страницы (возможно нужно назвать её что то вроде renderCreateCards)
function createCards(item) {
    const cardsItem = template.querySelector('.cards__item').cloneNode(true);
    cardsItem.querySelector('.cards__caption').textContent = item.name;
    cardsItem.querySelector('.cards__images').src = item.link;
    cardsItem.querySelector('.cards__images').alt = item.name;

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


    return cardsItem;
}

// Функция встраивания карточек при загрузке страницы (встраивается в конец)
function addAppendCards(item) {
    const cardsItem = createCards(item);
    cardsList.append(cardsItem); //встраиваем в конец списка
}

//функция для открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//функция для закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

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
    cardTitle.value = '';
    cardUrl.value = '';
}

//функция закрытия попапа добавления карточки
function closePopupAdd() {
    closePopup(popupAddCard);
}

/* Отправка формы редактиоования профиля*/
function submitEditForm(event) {
    event.preventDefault(); // для того что бы страница не перезагружалась

    titleProfile.textContent = titleField.value;
    discriptionText.textContent = discriptionField.value;

    closePopup(popupEdit);
}

function CardFormSubmit(event) { //добавление карточки вначало списка, кнопка создать
    event.preventDefault();
    cardsList.prepend(
        createCards({ name: cardTitle.value, link: cardUrl.value })
    );
    closePopupAdd();
}





editButton.addEventListener('click', openPopupEdit); // открытие попапа редактирования по клику
popupCloseEdit.addEventListener('click', closePopupEdit); // закрытие попапа редактирования по клику на крестик

addCardButton.addEventListener('click', openPopupAdd); // открытиее попапа добавления карточки по клику
closeCardButton.addEventListener('click', closePopupAdd); // закрытие попапа добавления карточки по клику

formEdit.addEventListener('submit', submitEditForm); // отправка формы по событию 
addCardForm.addEventListener('submit', CardFormSubmit) // отправка формы создать карточку