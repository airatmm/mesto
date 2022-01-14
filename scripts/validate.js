/*Функция показа ошибки*/
const showError = (formElement, inputElement, errorMessage, params) => { // принимает форму, инпут и сообщение об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // переменная ошибки по селектору по $id интпута и с -error

    inputElement.classList.add(params.inputErrorClass); // добавляем класс ошибки
    errorElement.classList.add(params.errorClass); // добавляем класс который делает ошибку видимой
    errorElement.textContent = errorMessage; // выводим сообщение об ошибке (встроенные ошибки браузера))
};
/*Функция скрытия ошибки*/
const hideError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // переменная ошибки по селектору по $id интпута и с -error
    inputElement.classList.remove(params.inputErrorClass); // удаляем класс ошибки
    errorElement.classList.remove(params.errorClass); // удаляем класс который делает ошибку видимой
    errorElement.textContent = ''; // текст ошибки пустой
};

// функция проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement, params) => { // принимает форму и  инпут
    if (!inputElement.validity.valid) {  // проверяем свойство validity.valid - (validity есть у каждого инпута)
        showError(formElement, inputElement, inputElement.validationMessage, params); // если невалидно (validity.valid = false), то выводим сообщение об ошибке
    } else {
        hideError(formElement, inputElement, params); // иначе скрываем ошибку
    }
};

// функция-обработчик форм
const setEventListeners = (formElement, params) => {
    // выбираем все инпуты формы
    const inputList = [...formElement.querySelectorAll(params.inputSelector)]; //Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector); // выбираем кнопку отправки формы

    toggleButtonState(inputList, buttonElement, params);


    inputList.forEach((inputElement) => { // перебираем массив инпутов
        inputElement.addEventListener('input', function () {  // назначаем обработчик события input (Событие input срабатывает каждый раз при изменении значения.)
            checkInputValidity(formElement, inputElement, params); // и при каджом изменении значения проверяется валидность поля ввода
            toggleButtonState(inputList, buttonElement, params);

        });
    });
}

// функция фключения валидации
const enableValidation = (params) => {
    const formList = [...document.querySelectorAll(params.formSelector)]; // выбираем все формы
    formList.forEach((formElement) => { // перебираем массив форм
        formElement.addEventListener('submit', (evt) => { // назначаем обработчик события submit 
            evt.preventDefault(); // отменяем стандартное поведение браузера при отправке формы
        });

        setEventListeners(formElement, params); // вызываем функцию-обработчик форм
    });
};

//Функция проверки все ли поля прошли валидацию
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => { // проверяем есть ли массиве хотя бы один невалидный(!) элемент (поле ввода)
        return !inputElement.validity.valid;
    });
};

const disableSubmitButton = (buttonElement, params) => {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
}
//Функция дактивирует кнопку отправить, если не все поля прошли валидацию
const toggleButtonState = (inputList, buttonElement, params) => {

    if (hasInvalidInput(inputList)) { // если есть невалидный интут
        disableSubmitButton(buttonElement, params);
        // то дективируем кнопку
    } else {
        buttonElement.classList.remove(params.inactiveButtonClass);
        buttonElement.disabled = false; // иначе убираем
    }
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); // вызываем функцию