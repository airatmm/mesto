export class FormValidator {
	constructor(params, formElement) {
		this._formElement = formElement;
		this._inputSelector = params.inputSelector;
		this._submitButtonSelector = params.submitButtonSelector;
		this._inactiveButtonClass = params.inactiveButtonClass;
		this._inputErrorClass = params.inputErrorClass;
		this._errorClass = params.errorClass;
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

	}

// Метод показа ошибок
	_showError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // переменная ошибки по селектору по $id интпута и с -error

		inputElement.classList.add(this._inputErrorClass); // добавляем класс ошибки
		errorElement.classList.add(this._errorClass); // добавляем класс который делает ошибку видимой
		errorElement.textContent = inputElement.validationMessage;// выводим сообщение об ошибке (встроенные ошибки браузера))

	}

// Метод скрытия ошибок
	_hideError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // переменная ошибки по селектору по $id интпута и с -error
		inputElement.classList.remove(this._inputErrorClass); // удаляем класс ошибки
		errorElement.classList.remove(this._errorClass); // удаляем класс который делает ошибку видимой
		errorElement.textContent = ''; // текст ошибки пустой
	}

// проверка все ли поля прошли валидацию
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	}

// проверка валидности поля ввода
	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {  // проверяем свойство validity.valid - (validity есть у каждого инпута)
			this._showError(inputElement); // если невалидно (validity.valid = false), то выводим сообщение об ошибке
		} else {
			this._hideError(inputElement); // иначе скрываем ошибку
		}
	}

//обработчик форм
	_setEventListeners() {
		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	};

	// Деактивации кнопки сохранить (публичный, используется еще и в index.js)
	disableSubmitButton() {
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		this._buttonElement.disabled = true;
		this._buttonElement.classList.add(this._inactiveButtonClass);
	}

// активация кнопки сохранить при успешном прохождении валидации
	_enableSubmitButton() {
		this._buttonElement.disabled = false;
		this._buttonElement.classList.remove(this._inactiveButtonClass);
	}

// Метод дактивирует кнопку отправить, если не все поля прошли валидацию
	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this.disableSubmitButton();
		} else {
			this._enableSubmitButton();
		}
	}

	//
	enableValidation() {
		this._formElement.addEventListener('submit', evt => {
			evt.preventDefault();
		});
		this._setEventListeners();
	}
}