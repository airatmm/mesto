(()=>{"use strict";var e={cardListSelector:".cards__list",popupPhotoSelector:".popup_type_photo",formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},t=document.querySelector(".profile__title"),n=document.querySelector(".profile__description"),o=document.querySelector(".profile__image"),r=document.querySelector(".profile__avatar"),i=document.querySelector(".profile__button_action_add"),a=document.querySelector(".profile__button_action_edit"),c=document.querySelector(".popup__input_type_title"),u=document.querySelector(".popup__input_type_description"),s=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_card"),p=document.querySelector(".popup_type_avatar"),f=s.querySelector(".popup__form"),h=l.querySelector(".popup__form"),d=p.querySelector(".popup__form");function _(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var y=function(){function e(t,n,o,r){var i,a=r.handleCardClick,c=r.handleDeleteCardClick,u=r.handleLikeClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._likes=null!==(i=t.likes)&&void 0!==i?i:[],this._cardId=t._id,this._ownerId=t.owner._id,this._currentUserId=n,this._alt=t.name,this._cardSelector=o,this._handleCardClick=a,this._handleDeleteCardClick=c,this._handleLikeClick=u,this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".cards__images"),this._likeButton=this._element.querySelector(".cards__like"),this._deleteButton=this._element.querySelector(".cards__delete"),this._likeCounter=this._element.querySelector(".cards__like-counter")}var t,n;return t=e,n=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".cards__item").cloneNode(!0)}},{key:"renderCard",value:function(){return this._cardImage.src=this._link,this._cardImage.alt=this._alt,this._element.querySelector(".cards__caption").textContent=this._name,this._setEventListeners(),this._handleCardDeleteVisible(),this.updateLikes(),this._element}},{key:"_setEventListeners",value:function(){var e=this;this._deleteButton.addEventListener("click",(function(){e._handleDeleteCardClick(e)})),this._likeButton.addEventListener("click",(function(){e._handleLikeClick(e)})),this._cardImage.addEventListener("click",(function(){e._openPopupWithImage()}))}},{key:"ifLiked",value:function(){var e=this;return this._likes.some((function(t){return t._id===e._currentUserId}))}},{key:"updateLikes",value:function(){this._likeCounter.textContent=this._likes.length,this.ifLiked()?this._likeButton.classList.add("cards__like_active"):this._likeButton.classList.remove("cards__like_active")}},{key:"setLikesInfo",value:function(e){this._likes=e,this.updateLikes()}},{key:"_openPopupWithImage",value:function(){this._handleCardClick(this._name,this._link)}},{key:"_handleCardDeleteVisible",value:function(){this._ownerId===this._currentUserId?this._deleteButton.classList.add("cards__delete_type_visible"):this._deleteButton.classList.remove("cards__delete_type_visible")}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"cardId",value:function(){return this._cardId}}],n&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var m=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}var t,n;return t=e,n=[{key:"_showError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),t.classList.add(this._errorClass),t.textContent=e.validationMessage}},{key:"_hideError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideError(e):this._showError(e)}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"disableSubmitButton",value:function(){this._buttonElement.disabled=!0,this._buttonElement.classList.add(this._inactiveButtonClass)}},{key:"_enableSubmitButton",value:function(){this._buttonElement.disabled=!1,this._buttonElement.classList.remove(this._inactiveButtonClass)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitButton():this._enableSubmitButton()}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideError(t)}))}}],n&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var k=function(){function e(t,n){var o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._container=document.querySelector(n),this._renderer=o}var t,n;return t=e,n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.append(e)}},{key:"prependItem",value:function(e){this._container.prepend(e)}}],n&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function g(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var S=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this.close=this.close.bind(this),this._handleEscClose=this._handleEscClose.bind(this),this._closeByClick=this._closeByClick.bind(this),this._popupSaveButton=this._popup.querySelector(".popup__button")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),this._popup.addEventListener("mousedown",this._closeByClick),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),this._popup.removeEventListener("mousedown",this._closeByClick),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._popup.querySelector(".popup__close").addEventListener("click",this.close)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_closeByClick",value:function(e){e.currentTarget===e.target&&this.close()}},{key:"isLoading",value:function(e){e?this._popupSaveButton.textContent="Сохранение...":".popup_type_card"===this._popupSelector?this._popupSave.textContent="Создать":this._popupSaveButton.textContent="Сохранить"}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function w(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=L(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},E.apply(this,arguments)}function L(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}function O(e,t){return O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},O(e,t)}function j(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(a,e);var t,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(o);if(r){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return j(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupPhotoImage=t._popup.querySelector(".popup__photo-image"),t._popupTitle=t._popup.querySelector(".popup__photo-title"),t}return t=a,(n=[{key:"open",value:function(e,t){this._popupPhotoImage.src=t,this._popupPhotoImage.alt=e,this._popupTitle.textContent=e,E(P(a.prototype),"open",this).call(this)}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(S);function B(e){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B(e)}function T(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function R(){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=q(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},R.apply(this,arguments)}function q(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=A(e)););return e}function D(e,t){return D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},D(e,t)}function x(e,t){if(t&&("object"===B(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function A(e){return A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},A(e)}var V=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&D(e,t)}(a,e);var t,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=A(o);if(r){var n=A(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return x(this,e)});function a(e){var t,n=e.popupSelector,o=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._handleFormSubmit=o,t._popupForm=t._popup.querySelector(".popup__form"),t._inputList=t._popupForm.querySelectorAll(".popup__input"),t}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;R(A(a.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}},{key:"close",value:function(){R(A(a.prototype),"close",this).call(this),this._popupForm.reset()}}])&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(S);function U(e){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U(e)}function N(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function F(){return F="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=z(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},F.apply(this,arguments)}function z(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=H(e)););return e}function J(e,t){return J=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},J(e,t)}function G(e,t){if(t&&("object"===U(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function H(e){return H=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},H(e)}var M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&J(e,t)}(a,e);var t,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=H(o);if(r){var n=H(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return G(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._button=t._popup.querySelector(".popup__button"),t}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;F(H(a.prototype),"setEventListeners",this).call(this),this._button.addEventListener("click",(function(){e._handleSubmitCallback()}))}},{key:"setSubmitCallback",value:function(e){this._handleSubmitCallback=e}}])&&N(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(S);function W(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var $=function(){function e(t){var n=t.profileName,o=t.profileDescription,r=t.profileAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=n,this._profileDescription=o,this._profileAvatar=r}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,about:this._profileDescription.textContent}}},{key:"setUserInfo",value:function(e){this._profileName.textContent=e.name,this._profileDescription.textContent=e.about,this._profileAvatar.src=e.avatar}}])&&W(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function K(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var Q=function(){function e(t){var n=t.address,o=t.token;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._address=n,this._token=o}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}},{key:"getCards",value:function(){return fetch("".concat(this._address,"/cards"),{method:"GET",headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"getUser",value:function(){return fetch("".concat(this._address,"/users/me"),{method:"GET",headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"editProfile",value:function(e){return fetch("".concat(this._address,"/users/me"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,about:e.description})}).then(this._checkResponse)}},{key:"addNewCard",value:function(e){return fetch("".concat(this._address,"/cards"),{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,link:e.link})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._address,"/cards/").concat(e),{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"addLike",value:function(e){return fetch("".concat(this._address,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"removeLike",value:function(e){return fetch("".concat(this._address,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then(this._checkResponse)}},{key:"changeUserAvatar",value:function(e){return fetch("".concat(this._address,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:e.avatar})}).then(this._checkResponse)}}])&&K(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var Y,Z=new $({profileName:t,profileDescription:n,profileAvatar:o}),ee=new Q({address:"https://mesto.nomoreparties.co/v1/cohort36",token:"bf2f8230-a13a-4d61-9144-22039310a203"});Promise.all([ee.getCards(),ee.getUser()]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(o=n.next()).done)&&(i.push(o.value),!t||i.length!==t);a=!0);}catch(e){c=!0,r=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return X(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?X(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],i=o[1];Y=i._id,ne.renderItems(r),Z.setUserInfo(i)})).catch((function(e){console.log("Error: ".concat(e))}));var te=function(e){return new y(e,Y,".template",{handleCardClick:function(){re.open(e.name,e.link)},handleDeleteCardClick:function(e){oe.open(),oe.setSubmitCallback((function(){ee.deleteCard(e.cardId()).then((function(){e.deleteCard(),oe.close()})).catch((function(e){console.log("Ошибка при удалении карточки: ".concat(e))}))}))},handleLikeClick:function(e){e.ifLiked()?ee.removeLike(e.cardId()).then((function(t){e.setLikesInfo(t.likes)})).catch((function(e){console.log("Ошибка удаления лайка: ".concat(e))})):ee.addLike(e.cardId()).then((function(t){e.setLikesInfo(t.likes)})).catch((function(e){console.log("Ошибка лайка: ".concat(e))}))}}).renderCard()},ne=new k({renderer:function(e){ne.addItem(te(e))}},e.cardListSelector),oe=new M(".popup_type_delete");oe.setEventListeners();var re=new I(e.popupPhotoSelector);re.setEventListeners();var ie=new V({popupSelector:".popup_type_card",handleFormSubmit:function(e){ie.isLoading(!0),ee.addNewCard(e).then((function(e){ne.prependItem(te(e)),undefined.close()})).catch((function(e){console.log("Ошибка добавления карточки: ".concat(e))})).finally((function(){ie.isLoading(!1)}))}});ie.setEventListeners();var ae=new V({popupSelector:".popup_type_edit",handleFormSubmit:function(e){ae.isLoading(!0),ee.editProfile(e).then((function(e){Z.setUserInfo(e),ae.close()})).catch((function(e){console.log("Ошибка профиля пользователя: ".concat(e))})).finally((function(){ae.isLoading(!1)}))}});ae.setEventListeners();var ce=new V({popupSelector:".popup_type_avatar",handleFormSubmit:function(e){ce.isLoading(!0),ee.changeUserAvatar(e).then((function(e){Z.setUserInfo(e),ce.close()})).catch((function(e){console.log("Ошибка при изменении аватара пользователя: ".concat(e))})).finally((function(){ce.isLoading(!1)}))}});ce.setEventListeners();var ue=new m(e,h),se=new m(e,f),le=new m(e,d);ue.enableValidation(),se.enableValidation(),le.enableValidation(),a.addEventListener("click",(function(){var e=Z.getUserInfo();c.value=e.name,u.value=e.about,se.resetValidation(),ae.open()})),i.addEventListener("click",(function(){ue.resetValidation(),ie.open()})),r.addEventListener("click",(function(){ce.open()}))})();