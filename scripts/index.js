const popup = document.querySelector('.popup'); //возвращаем элемент popup (div popup)
const popupClose = document.querySelector('.popup__close'); //возвращаем элемент popup__close (кнопка закрытия попапа) (div popup)
const editButton = document.querySelector('.profile__button_action_edit'); //возвращаем элемент profile__button_action_edit (копка редактирования профиля) из секции profile

const formButton = document.querySelector('.popup__button'); //возвращаем элемент popup__button (кнопка сохраниения) (div popup)
const form = document.querySelector('.popup__form'); //возвращаем элемент popup__form (форма попапа. имя / о себе) (div popup)

const titleProfile = document.querySelector('.profile__title'); //возвращаем элемент profile__title из секции profile (заголовок профиля (имя))
const titleField = document.querySelector('.popup__input_type_title'); //возвращаем элемент popup__input_type_title (div popup)  (заголовок профиля (имя) в попапе)

const discriptionField = document.querySelector('.popup__input_type_discription'); //возвращаем элемент popup__input_type_discription (div popup) (описание профиля (о себе) в попапе)
const discriptionText = document.querySelector('.profile__discription'); //возвращаем элемент profile__discription из секции profile (описание профиля (о себе))

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

initialCards.forEach(addappendCards); // Перебираем массив и при каждой итерации добавляем(рендерим) карточки

function createCards(item) { // Функция создания карточки при загрузке страницы (возможно нужно назвать её что то вроде renderCreateCards)
    const cardsItem = template.querySelector('.cards__item').cloneNode(true);
    cardsItem.querySelector('.cards__caption').textContent = item.name;
    cardsItem.querySelector('.cards__images').src = item.link;
    cardsItem.querySelector('.cards__images').alt = item.name;

    return cardsItem;
}

function addappendCards(item) { // Функция встраивания карточек при загрузке страницы (встраивается вначало)
    const cardsItem = createCards(item);
    cardsList.append(cardsItem); //встраиваем вначало списка
}



//функция открытия попапа
function openPopup() {
    popup.classList.add('popup_opened');
    titleField.value = titleProfile.textContent;
    discriptionField.value = discriptionText.textContent;
}

//функция закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}


function submitForm(event) {
    event.preventDefault(); // для того что бы страница не перезагружалась

    titleProfile.textContent = titleField.value;
    discriptionText.textContent = discriptionField.value;

    closePopup();
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

form.addEventListener('submit', submitForm);
