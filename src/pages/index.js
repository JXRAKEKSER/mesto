import "core-js/stable";
import "regenerator-runtime/runtime";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/popup/PopupWithImage.js";
import PopupWithForm from "../components/popup/PopupWithForm.js";
import  Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import {renderResponse} from "../utils/apiFunctions.js";
import {initialCards,
    editProfileButton,
    formProfileInfoContainer,
    addMestoButton,
    formAddMestoContainer,
    configValidation
} from "../utils/data.js";
import './index.css'
import {data} from "autoprefixer";
const inputFio = document.querySelector('input[name=fio]');
const inputAboutYourself = document.querySelector('input[name=aboutYourself]');
//объекты валидации форм
const formProfileValidator = new FormValidator(configValidation, formProfileInfoContainer);
const formAddMestoValidator = new FormValidator(configValidation, formAddMestoContainer);
//установка валидации форм
formAddMestoValidator.enableValidation();
formProfileValidator.enableValidation();
function addValidation(){
    Array.from(document.forms).forEach( form => {

        form.addEventListener('submit', (evt) =>{
            evt.preventDefault();
        });
    });
}

function createCard(data){
    const cardItem = new Card(data, '#card');
    return  cardItem.createCard();
}

// блок слушателей кнопок
//profileInfo
editProfileButton.addEventListener('click',() => {
    const {fio, aboutYourself} = userInfo.getUserInfo();
    inputFio.value = fio;
    inputAboutYourself.value = aboutYourself;
    profileInfoPopup.open()
});

let cardList = null;
//addMesto
addMestoButton.addEventListener('click', () => {
    formAddMestoValidator.toogleSubmitButton();
    addMestoPopup.open();
});
const addMestoPopup = new PopupWithForm('popup_type_card-add', (inputsData) =>{
    inputsData.likes = [];
    inputsData.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
    inputsData.userId = userInfo.userId;
    cardList.addItem(createCard(inputsData));

});
addMestoPopup.setEventListeners()

const userInfo = new UserInfo('profile-info__name', 'profile-info__role', 'profile__avatar');
const popupWithPhoto = new PopupWithImage('popup_type_picture');
popupWithPhoto.setEventListeners();



const profileInfoPopup = new PopupWithForm('popup_type_profile', (profileInfo)=>{
    userInfo.setUserInfo(profileInfo);
    renderResponse(api.updateUserInfo(profileInfo), (dataObj) => {

    });

});
profileInfoPopup.setEventListeners();

addValidation();


const api = new Api({ baseURL : 'https://mesto.nomoreparties.co/v1/cohort-29/', headers:{
        authorization: 'ea8d3eb3-1ee8-45d9-8e72-76d5b1d1c389',
        'Content-Type': 'application/json'
    }});
// рендеринг данных пользователя
renderResponse(api.getUserInfo(), (dataObj) => {
    userInfo.setUserInfo({fio: dataObj.name, aboutYourself: dataObj.about, avatar: dataObj.avatar, userId : dataObj._id});
});
// рендеринг карточек с сервера и установка слушателей
renderResponse(api.getPreloadsCards(), (dataObj) =>{
     cardList = new Section({items:dataObj, renderer: (card) => {
            card.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
            card.userId = userInfo.userId;
            return  createCard(card);
        }},'elements');
    cardList.renderItems();
});



