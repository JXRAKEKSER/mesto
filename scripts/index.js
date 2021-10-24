import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/popup/PopupWithImage.js";
import PopupWithForm from "../components/popup/PopupWithForm.js";
import  Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {initialCards} from "../utils/data.js";
// блок объявления и инициализации элементов редактирования информации профиля
const editProfileButton = document.querySelector('.profile-info__button-edit');
const closeEditProfilePopupButton = document.querySelector('.popup_type_profile .popup__button-close');
const popupEditProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile-info__name');
const profileInfoRole = document.querySelector('.profile-info__role');
const inputItemRole = document.querySelector('.popup_type_profile input[name=aboutYourself]');
const inputItemName = document.querySelector('.popup_type_profile input[name=fio]');
const formProfileInfoContainer = document.querySelector('.popup_type_profile .popup__form');

// блок объявления и инициализации элементов добавления места
const addMestoButton = document.querySelector('.profile__button-add');
//const addMestoPopup = document.querySelector('.popup_type_card-add');
const closeAddMestoPopupButton = document.querySelector('.popup_type_card-add .popup__button-close');
const inputMestoName = document.querySelector('input[name=mestoName]');
const inputMestoURL = document.querySelector('input[name=mestoURL]');
const formAddMestoContainer = document.querySelector('.popup_type_card-add .popup__form');
// блок объявления и инициализации элементов просмотра картинки
const mestoPhotoPopup = document.querySelector('.popup_type_picture');
const closeMestoPhotoPopupButton =  document.querySelector('.popup_type_picture .popup__button-close');

// блок объявления и инициализации общих элементов(контейнеры, секции и т.п. семантически общие вещи)
const elementsContainer = document.querySelector('.elements');
const configValidation = {
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-info'
}

const formProfileValidator = new FormValidator(configValidation, formProfileInfoContainer);
const formAddMestoValidator = new FormValidator(configValidation, formAddMestoContainer);
//установка валидации форм
formAddMestoValidator.enableValidation();
formProfileValidator.enableValidation();

//функция очистки данных внутри попапа
function clearFormInputs(popup) {
    //проверка на наличие формы в попапе, чтобы не возникало ошибки при закрытии попапа просмотра фотографий
    if(popup.querySelector('form')) {
        const form = popup.querySelector('.popup__form');
        form.reset();
    }

}

/*function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.querySelector('.page').addEventListener('keydown', closePopupByKeyboard);

};*/

/*function preloadCards(data) {


    data.forEach((dataItem) => {
        //renderCard инициализируется в блоке общих переменных
        dataItem.openPopup = openPopup;
        const card = new Card(dataItem,'#card');
        elementsContainer.append(card.createCard());

    });

}*/

/*function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.querySelector('.page').removeEventListener('keydown', closePopupByKeyboard);


    // внутри функции чистки попапа проверяется имеет ли попап форму и только в этом случае очищает её
    clearFormInputs(popup);


}*/

/*function closePopupByOverlay(evt){
    if(evt.target.classList.contains('popup')){
        closePopup(evt.target);
    }
}*/

function openProfilePopup() {
    inputItemName.value = profileName.textContent;
    inputItemRole.value = profileInfoRole.textContent;

  //  openPopup(popupEditProfile);

}

function saveProfileInfo(evt) {
    evt.preventDefault();

    profileName.textContent = inputItemName.value;
    profileInfoRole.textContent = inputItemRole.value;
  //  closePopup(popupEditProfile);

}

// функция добавления карточки
/*function addMestoCard(evt) {
    evt.preventDefault();
    const card = new Card({ name: inputMestoName.value, link:inputMestoURL.value, openPopup: openPopup}, '#card')
    elementsContainer.prepend(card.createCard());

    clearFormInputs(addMestoPopup);
   // closePopup(addMestoPopup);
};*/

/*function closePopupByKeyboard(evt){
    if(evt.key === "Escape"){
        closePopup(document.querySelector('.popup_opened'));
    }

}*/

// блок слушателей кнопок
//profileInfo
editProfileButton.addEventListener('click',() => {
    const {fio, aboutYourself} = userInfo.getUserInfo();
    document.querySelector('input[name=fio]').value = fio;
    document.querySelector('input[name=aboutYourself]').value = aboutYourself;
    profileInfoPopup.open()
});
//closeEditProfilePopupButton.addEventListener('click',() => closePopup(popupEditProfile));
/*formProfileInfoContainer.addEventListener('submit', saveProfileInfo);*/

//addMesto
addMestoButton.addEventListener('click', () => {
    addMestoPopup.open();
   // openPopup(addMestoPopup);

});
closeAddMestoPopupButton.addEventListener('click', () => {
   // closePopup(addMestoPopup);
});
formAddMestoContainer.addEventListener('submit', (evt) => {
   // addMestoCard(evt);
});

/*popupEditProfile.addEventListener('click', closePopupByOverlay);
addMestoPopup.addEventListener('click', closePopupByOverlay);
mestoPhotoPopup.addEventListener('click', closePopupByOverlay);*/


/*closeMestoPhotoPopupButton.addEventListener('click', () => closePopup(mestoPhotoPopup));*/
// функции для работы с валидацией на странице
function addValidation(){
    Array.from(document.forms).forEach( form => {

        form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
        });
    });
}

const userInfo = new UserInfo('profile-info__name', 'profile-info__role');
const popupWithPhoto = new PopupWithImage('popup_type_picture');
popupWithPhoto.setEventListeners();
const addMestoPopup = new PopupWithForm('popup_type_card-add', (inputsData) =>{
    inputsData.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
    const cardItem = new Card(inputsData, '#card');
    cardList.addItem(cardItem.createCard());
});
addMestoPopup.setEventListeners();

const profileInfoPopup = new PopupWithForm('popup_type_profile', (profileInfo)=>{
    userInfo.setUserInfo(profileInfo);
});
profileInfoPopup.setEventListeners();


const cardList = new Section({items:initialCards, renderer: (card) => {
        card.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
        const cardItem = new Card(card, '#card');
        return cardItem.createCard();
    }},'elements');



cardList.renderItems();

addValidation();

