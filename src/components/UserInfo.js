// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
	//Принимает в конструктор объект с селекторами двух элементов:
	// элемента имени пользователя и элемента информации о себе.
	constructor({profileName, profileDescription}) {
		this._profileName = profileName;
		this._profileDescription = profileDescription;
	}

	// метод getUserInfo, который возвращает объект с данными пользователя
	getUserInfo() {
		return {
			name: this._profileName.textContent,
			description: this._profileDescription.textContent
		}
	}

// метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
	setUserInfo({name, description}) {
		this._profileName.textContent = name;
		this._profileDescription.textContent = description;
	}
}