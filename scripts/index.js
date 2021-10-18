import  Card  from "./Card.js";
import FormValidator from "./FormValidator.js";
// блок объявления и инициализации элементов редактирования информации профиля
const editProfileButton = document.querySelector('.profile-info__button-edit');
const closeEditProfilePopupButton = document.querySelector('.popup_type_profile .popup__button-close');
const popupEditProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile-info__name');
const profileInfoRole = document.querySelector('.profile-info__role');
const inputItemRole = document.querySelector('.popup_type_profile input[name=aboutYourself]');
const inputItemName = document.querySelector('.popup_type_profile input[name=fio]');
const formProfileInfoContainer = document.querySelector('.popup_type_profile .popup__form');

// блок объявления и инициализации общих элементов(контейнеры, секции и т.п. семантически общие вещи)
const elementsContainer = document.querySelector('.elements');
const formValidationObjList = [];

// блок объявления и инициализации элементов добавления места
const addMestoButton = document.querySelector('.profile__button-add');
const addMestoPopup = document.querySelector('.popup_type_card-add');
const closeAddMestoPopupButton = document.querySelector('.popup_type_card-add .popup__button-close');
const inputMestoName = document.querySelector('input[name=mestoName]');
const inputMestoURL = document.querySelector('input[name=mestoURL]');
const formAddMestoContainer = document.querySelector('.popup_type_card-add .popup__form');
// блок объявления и инициализации элементов просмотра картинки
const mestoPhotoPopup = document.querySelector('.popup_type_picture');
const closeMestoPhotoPopupButton =  document.querySelector('.popup_type_picture .popup__button-close');
// массив данных для загрузки дефолтных карточек
const initialCards  = [
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
]
// функция рендеринга дефолтных карточек


function preloadCards(data) {


    data.forEach((dataItem) => {
        //renderCard инициализируется в блоке общих переменных
        const card = new Card(dataItem, '#card');
        elementsContainer.append(card.createCard());

    });

}

//функция очистки данных внутри попапа
function clearFormInputs(popup) {
    //проверка на наличие формы в попапе, чтобы не возникало ошибки при закрытии попапа просмотра фотографий
    if(popup.querySelector('form')) {
        const form = popup.querySelector('.popup__form');
        form.reset();
    }

}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.querySelector('.page').addEventListener('keydown', closePopupByKeyboard);

};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.querySelector('.page').removeEventListener('keydown', closePopupByKeyboard);


    // внутри функции чистки попапа проверяется имеет ли попап форму и только в этом случае очищает её
    clearFormInputs(popup);

    removeValidation(); // удаляет слушателей для всех объектов формы, у меня не получилось достаточно просто решить вопрос
    // с состоянием кнопки при закрытии попапа, т.к. код, управляющий её состоянием отрабатывал раньше, чем поля ввода очищались
    addValidation();

}

function openProfilePopup() {
    inputItemName.value = profileName.textContent;
    inputItemRole.value = profileInfoRole.textContent;

    openPopup(popupEditProfile);

}

function saveProfileInfo(evt) {
    evt.preventDefault();

    profileName.textContent = inputItemName.value;
    profileInfoRole.textContent = inputItemRole.value;
    closePopup(popupEditProfile);

}

// функция добавления карточки
function addMestoCard(evt) {
    evt.preventDefault();
    const card = new Card({ name: inputMestoName.value, link:inputMestoURL.value}, '#card')
    elementsContainer.prepend(card.createCard());

    clearFormInputs(addMestoPopup);
    closePopup(addMestoPopup);
};

function closePopupByKeyboard(evt){
    if(evt.key === "Escape"){
        closePopup(document.querySelector('.popup_opened'));
    }

}

// блок слушателей кнопок
//profileInfo
editProfileButton.addEventListener('click',() => openProfilePopup());
closeEditProfilePopupButton.addEventListener('click',() => closePopup(popupEditProfile));
formProfileInfoContainer.addEventListener('submit', saveProfileInfo);

//addMesto
addMestoButton.addEventListener('click', () => openPopup(addMestoPopup));
closeAddMestoPopupButton.addEventListener('click', () => closePopup(addMestoPopup));
formAddMestoContainer.addEventListener('submit', addMestoCard);

document.querySelector('.page').addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')){
        closePopup(evt.target);
    }
});

closeMestoPhotoPopupButton.addEventListener('click', () => closePopup(mestoPhotoPopup));
// функции для работы с валидацией на странице
function addValidation(){
    Array.from(document.forms).forEach( form => {

        form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
        });
        const formValidator = new FormValidator({
            inputSelector: 'popup__input',
            submitButtonSelector: 'popup__button-save',
            inactiveButtonClass: 'popup__button-save_inactive',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__input-error-info'
        }, form);

        formValidator.enableValidation();
        formValidationObjList.push(formValidator);
    });
}

function removeValidation(){
    formValidationObjList.forEach( formValidator => {
        formValidator.disableValidation();
    });
}

preloadCards(initialCards);

addValidation();

