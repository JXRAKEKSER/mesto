import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/popup/PopupWithImage.js";
import PopupWithForm from "../components/popup/PopupWithForm.js";
import  Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {initialCards,
    editProfileButton,
    formProfileInfoContainer,
    addMestoButton,
    formAddMestoContainer,
    configValidation
} from "../utils/data.js";
import './index.css'
const inputFio = document.querySelector('input[name=fio]');
const inputAboutYourself = document.querySelector('input[name=aboutYourself]');
//объекты валидации форм
const formProfileValidator = new FormValidator(configValidation, formProfileInfoContainer);
const formAddMestoValidator = new FormValidator(configValidation, formAddMestoContainer);
//установка валидации форм
formAddMestoValidator.enableValidation();
formProfileValidator.enableValidation();

// блок слушателей кнопок
//profileInfo
editProfileButton.addEventListener('click',() => {
    const {fio, aboutYourself} = userInfo.getUserInfo();
    inputFio.value = fio;
    inputAboutYourself.value = aboutYourself;
    profileInfoPopup.open()
});


//addMesto
addMestoButton.addEventListener('click', () => {
    formAddMestoValidator.toogleSubmitButton();
    addMestoPopup.open();
});


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

const userInfo = new UserInfo('profile-info__name', 'profile-info__role');
const popupWithPhoto = new PopupWithImage('popup_type_picture');
popupWithPhoto.setEventListeners();
const addMestoPopup = new PopupWithForm('popup_type_card-add', (inputsData) =>{
    inputsData.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
    cardList.addItem(createCard(inputsData));

});
addMestoPopup.setEventListeners();

const profileInfoPopup = new PopupWithForm('popup_type_profile', (profileInfo)=>{
    userInfo.setUserInfo(profileInfo);
});
profileInfoPopup.setEventListeners();


const cardList = new Section({items:initialCards, renderer: (card) => {
        card.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
        return  createCard(card);
    }},'elements');



cardList.renderItems();

addValidation();

