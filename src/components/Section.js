// класс для вставки элементов в разметку
export class Section {
	constructor({items, renderer}, containerSelector) {
		this._items = items; //это массив данных, которые нужно добавить на страницу при инициализации класса
		this._renderer = renderer; //это функция, которая отвечает за создание и отрисовку данных на странице
		this._container = document.querySelector(containerSelector); //CSS-селектор контейнера. В него мы будем вставлять элементы разметки
	}

//Публичный метод, который отвечает за отрисовку всех элементов.
//Отрисовка каждого отдельного элемента осуществляется функцией renderer.
	renderItems() {
		this._items.forEach((item) => {
			this._renderer(item);
		})
	}

//Публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
	addItem(element) {
		this._container.append(element);
	}

	prependItem(element) {
		this._container.prepend(element);
	}
}


//У класса Section нет своей разметки.
// Он получает разметку через функцию-колбэк и вставляет её в контейнер.