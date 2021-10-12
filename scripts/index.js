const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__button_action_edit');

const formButton = document.querySelector('.popup__button');
const form = document.querySelector('.popup__form');

const titleProfile = document.querySelector('.profile__title');
const titleField = document.querySelector('.popup__input_type_title');

const discriptionField = document.querySelector('.popup__input_type_discription');
const discriptionText = document.querySelector('.profile__discription');

//обработчик открытия попапа
function openPopup() {
    popup.classList.add('popup_opened');
    titleField.value = titleProfile.textContent;
    discriptionField.value = discriptionText.textContent;
}

//обработчик закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}

function submitForm(event) {
    event.preventDefault();

    titleProfile.textContent = titleField.value;
    discriptionText.textContent = discriptionField.value;

    closePopup();
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

form.addEventListener('submit', submitForm);
