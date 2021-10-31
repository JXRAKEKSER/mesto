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
import {
    initialCards,
    editProfileButton,
    formProfileInfoContainer,
    addMestoButton,
    formAddMestoContainer,
    configValidation,
    editAvatarButton,
    formEditAvatarContainer,
    profilePhoto
} from "../utils/data.js";
import './index.css'

const inputFio = document.querySelector('input[name=fio]');
const inputAboutYourself = document.querySelector('input[name=aboutYourself]');
//объекты валидации форм
const formProfileValidator = new FormValidator(configValidation, formProfileInfoContainer);
const formAddMestoValidator = new FormValidator(configValidation, formAddMestoContainer);
const formEditAvatarValidator = new FormValidator(configValidation, formEditAvatarContainer)

//установка валидации форм
formAddMestoValidator.enableValidation();
formProfileValidator.enableValidation();
formEditAvatarValidator.enableValidation();
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

editAvatarButton.addEventListener('click', () =>{
    formEditAvatarValidator.toogleSubmitButton();
    editAvatarPopup.open();
})

let cardList = null;
//addMesto
addMestoButton.addEventListener('click', () => {
    formAddMestoValidator.toogleSubmitButton();
    addMestoPopup.open();
});
const addMestoPopup = new PopupWithForm('popup_type_card-add', (inputsData, evt) =>{

    const { mestoName: name, mestoURL: link} = inputsData;
    renderResponse(api.postCard({name, link}), (dataObj) =>{

        dataObj.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
        dataObj.userId = userInfo.userId;
        dataObj.removeCardCallback = api.deleteCard.bind(api);
        dataObj.addLike = api.addLike.bind(api);
        dataObj.deleteLike = api.deleteLike.bind(api);
        cardList.addItem(createCard(dataObj));
    }, evt)
    addMestoPopup.close();
});
addMestoPopup.setEventListeners()

const userInfo = new UserInfo('profile-info__name', 'profile-info__role', 'profile__avatar');
const popupWithPhoto = new PopupWithImage('popup_type_picture');
popupWithPhoto.setEventListeners();



const profileInfoPopup = new PopupWithForm('popup_type_profile', (profileInfo,evt)=>{
    userInfo.setUserInfo(profileInfo);
    renderResponse(api.updateUserInfo(profileInfo), (dataObj) => {

    }, evt);
    profileInfoPopup.close();
});
profileInfoPopup.setEventListeners();

addValidation();

const editAvatarPopup = new PopupWithForm('popup_type_edit-avatar', (editAvatarInfo, evt)=>{

    renderResponse(api.updateAvatar(editAvatarInfo), (updateProfileData) =>{
        profilePhoto.src = updateProfileData.avatar;
    }, evt)
    editAvatarPopup.close();
});
editAvatarPopup.setEventListeners();




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
            card.removeCardCallback = api.deleteCard.bind(api);
            card.addLike = api.addLike.bind(api);
            card.deleteLike = api.deleteLike.bind(api);
            return  createCard(card);
        }},'elements');
    cardList.renderItems();
});



