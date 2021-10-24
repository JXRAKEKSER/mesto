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
    document.querySelector('input[name=fio]').value = fio;
    document.querySelector('input[name=aboutYourself]').value = aboutYourself;
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

