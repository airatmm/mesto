// создаем объект params (ключ: значение)
const params = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

/*Функция показа ошибки*/
const showError = (formElement, inputElement, errorMessage) => { // принимает форму, инпут и сообщение об ошибке
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // переменная ошибки по селектору по $id интпута и с -error

    inputElement.classList.add(params.inputErrorClass); // добавляем класс ошибки
    errorElement.textContent = errorMessage; // выводим сообщение об ошибке (встроенные ошибки браузера))
    errorElement.classList.add(params.errorClass); // добавляем класс который делает ошибку видимой
};
/*Функция скрытия ошибки*/
const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // переменная ошибки по селектору по $id интпута и с -error

    inputElement.classList.remove(params.inputErrorClass); // удаляем класс ошибки
    errorElement.classList.remove(params.errorClass); // удаляем класс который делает ошибку видимой
    errorElement.textContent = ''; // текст ошибки пустой
};

// функция проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement) => { // принимает форму и  инпут
    if (!inputElement.validity.valid) {  // проверяем свойство validity.valid - (validity есть у каждого инпута)
        showError(formElement, inputElement, inputElement.validationMessage); // если невалидно (validity.valid = false), то выводим сообщение об ошибке
    } else {
        hideError(formElement, inputElement); // иначе скрываем ошибку
    }
};

// функция-обработчик форм
const setEventListeners = (formElement) => {
    // выбираем все инпуты формы
    const inputList = [...formElement.querySelectorAll(params.inputSelector)]; //Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector); // выбираем кнопку отправки формы

    toggleButtonState(inputList, buttonElement);
    //
    inputList.forEach((inputElement) => { // перебираем массив инпутов
        inputElement.addEventListener('input', function () {  // назначаем обработчик события input (Событие input срабатывает каждый раз при изменении значения.)
            checkInputValidity(formElement, inputElement); // и при каджом изменении значения проверяется валидность поля ввода

            toggleButtonState(inputList, buttonElement);

        });
    });
}

// функция фключения валидации
const enableValidation = () => {
    const formList = [...document.querySelectorAll(params.formSelector)]; // выбираем все формы
    formList.forEach((formElement) => { // перебираем массив форм
        formElement.addEventListener('submit', (evt) => { // назначаем обработчик события submit 
            evt.preventDefault(); // отменяем стандартное поведение браузера при отправке формы
        });

        setEventListeners(formElement); // вызываем функцию-обработчик форм
    });
};

/*Функция проверки все ли поля прошли валидацию*/
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => { // проверяем есть ли массиве хотя бы один невалидный(!) элемент (поле ввода)
        return !inputElement.validity.valid;
    });
};

/*Функция добваления "неактивного класса" к кнопке отправить, если не все поля прошли валидацию*/
const toggleButtonState = (inputList, buttonElement) => { // принимает интпут и кнопку
    if (hasInvalidInput(inputList)) { // если есть невалидный интут
        buttonElement.classList.add(params.inactiveButtonClass); // то добавляем "неактивного класса"
    } else {
        buttonElement.classList.remove(params.inactiveButtonClass); // иначе убираем
    }
};

enableValidation(); // вызываем функцию