/* для попапа редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit'); //возвращаем попап редактирования профиля (popup_type_edit) 
const popupCloseEdit = document.querySelector('.popup__close_edit'); //возвращаем элемент popup__close_edit (кнопка закрытия попапа редактирования)
console.log(popupCloseEdit);
const editButton = document.querySelector('.profile__button_action_edit'); //возвращаем элемент profile__button_action_edit (копка редактирования профиля) из секции profile

const formButton = document.querySelector('.popup__button'); //возвращаем элемент popup__button (кнопка сохраниения) (div popup)
const form = document.querySelector('.popup__form'); //возвращаем элемент popup__form (форма попапа. имя / о себе) (div popup)

const titleProfile = document.querySelector('.profile__title'); //возвращаем элемент profile__title из секции profile (заголовок профиля (имя))
const titleField = document.querySelector('.popup__input_type_title'); //возвращаем элемент popup__input_type_title (div popup)  (заголовок профиля (имя) в попапе)

const discriptionField = document.querySelector('.popup__input_type_discription'); //возвращаем элемент popup__input_type_discription (div popup) (описание профиля (о себе) в попапе)
const discriptionText = document.querySelector('.profile__discription'); //возвращаем элемент profile__discription из секции profile (описание профиля (о себе))

/* для попапа добавления карточек*/
const addCardButton = document.querySelector('profile__button_action_add'); //кнопка добавления карточки(+)
const popupAddCard = document.querySelector('popup_type_card'); // попап добавления карточки
const inputCardName = document.querySelector('popup__input_card_name'); // инпут названия   
const inputCardUrl = document.querySelector('popup__input_card_url'); // инпут ссылки / изображения
const closeCardButton = document.querySelector('popup__close_card'); //кнопка закрытия попапа добавления карточки
const addCardForm = document.querySelector('popup__form_card');
const addCardSaveButton = document.querySelector('popup__button_card_save'); //кнопка создать новую карточку

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
const template = document.querySelector('.template').content; // Берем содержимое темплейта

initialCards.forEach(addAppendCards); // Перебираем массив и при каждой итерации добавляем(рендерим) карточки

function createCards(item) { // Функция создания карточки при загрузке страницы (возможно нужно назвать её что то вроде renderCreateCards)
    const cardsItem = template.querySelector('.cards__item').cloneNode(true);
    cardsItem.querySelector('.cards__caption').textContent = item.name;
    cardsItem.querySelector('.cards__images').src = item.link;
    cardsItem.querySelector('.cards__images').alt = item.name;

    return cardsItem;
}

function addAppendCards(item) { // Функция встраивания карточек при загрузке страницы (встраивается вначало)
    const cardsItem = createCards(item);
    cardsList.append(cardsItem); //встраиваем вначало списка
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
//функция открытия попапа добавления карточки
function openPopupAdd() {
    openPopup(popupAddCard);
}

//функция закрытия попапа редактирования
function closePopupEdit() {
    closePopup(popupEdit);
}


function submitForm(event) {
    event.preventDefault(); // для того что бы страница не перезагружалась

    titleProfile.textContent = titleField.value;
    discriptionText.textContent = discriptionField.value;

    closePopup(popupEdit);
}

editButton.addEventListener('click', openPopupEdit);
popupCloseEdit.addEventListener('click', closePopupEdit);

form.addEventListener('submit', submitForm);
