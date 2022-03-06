// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
	//Принимает в конструктор объект с селекторами двух элементов:
	// элемента имени пользователя и элемента информации о себе.
	constructor({profileName, profileDescription, profileAvatar}) {
		this._profileName = profileName;
		this._profileDescription = profileDescription;
		this._profileAvatar = profileAvatar;
	}

	// метод getUserInfo, который возвращает(получает) объект с данными пользователя
	getUserInfo() {
		return {
			name: this._profileName.textContent,
			about: this._profileDescription.textContent
		}
	}

// метод setUserInfo, который принимает !!новые данные пользователя и добавляет их на страницу.
	setUserInfo(item) {
		this._profileName.textContent = item.name;
		this._profileDescription.textContent = item.about;
		this._profileAvatar.src = item.avatar;
	}
}