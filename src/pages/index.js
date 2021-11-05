import "core-js/stable";
import "regenerator-runtime/runtime";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/popup/PopupWithImage.js";
import PopupWithForm from "../components/popup/PopupWithForm.js";
import PopupWithButton from "../components/popup/PopupWithButton.js";
import  Card  from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import {renderResponse, renderLoading} from "../utils/apiFunctions.js";
import {
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
    data.openPopup = popupWithPhoto.open.bind(popupWithPhoto);
    data.userId = userInfo.userId;
    data.removeCardCallback = confirmPopup.open.bind(confirmPopup);
    data.addLike = api.addLike.bind(api);
    data.deleteLike = api.deleteLike.bind(api);
    data.renderResponse = renderResponse;
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

        cardList.addItem(createCard(dataObj));
    }, evt)
    renderLoading(false);
    addMestoPopup.close();
});
addMestoPopup.setEventListeners()

const userInfo = new UserInfo('profile-info__name', 'profile-info__role', 'profile__avatar');
const popupWithPhoto = new PopupWithImage('popup_type_picture');
popupWithPhoto.setEventListeners();



const profileInfoPopup = new PopupWithForm('popup_type_profile', (profileInfo,evt)=>{

    renderResponse(api.updateUserInfo(profileInfo), (dataObj) => {
        userInfo.setUserInfo(profileInfo);
        renderLoading(false);
        profileInfoPopup.close();
    }, evt);

});
profileInfoPopup.setEventListeners();

addValidation();

const editAvatarPopup = new PopupWithForm('popup_type_edit-avatar', (editAvatarInfo, evt)=>{

    renderResponse(api.updateAvatar(editAvatarInfo), (updateProfileData) =>{
        userInfo.setUserInfo({avatar:updateProfileData.avatar});
        renderLoading(false);
        editAvatarPopup.close();
    }, evt)

});
editAvatarPopup.setEventListeners();

const confirmPopup = new PopupWithButton('popup_type_confirm', (cardId, cardItem) =>{
    renderResponse(api.deleteCard(cardId), (data) =>{
        cardItem.remove();
        cardItem = null;
        renderLoading(false);
        confirmPopup.close();
    })
});

confirmPopup.setEventListeners();



const api = new Api({ baseURL : 'https://mesto.nomoreparties.co/v1/cohort-29/', headers:{
        authorization: 'ea8d3eb3-1ee8-45d9-8e72-76d5b1d1c389',
        'Content-Type': 'application/json'
    }});
// рендеринг данных пользователя
const userInfoPromise = api.getUserInfo();
const preloadsCardsPromise = api.getPreloadsCards();
const preloadPromises = [userInfoPromise, preloadsCardsPromise];

Promise.all(preloadPromises)
    .then((responses) => Promise.all(responses.map( response => {
       if(response.ok) {
          return response.json()
       }else{
           Promise.reject(`${response.status} по url ${response.url}`);
       }
    })))
        .then((dataObjects) => {

            dataObjects.forEach( dataObj =>{
                if(dataObj.length){
                    cardList = new Section({items:dataObj, renderer: (card) => {
                            return  createCard(card);
                        }},'elements');
                    cardList.renderItems();
                }
                else{
                    userInfo.setUserInfo({fio: dataObj.name, aboutYourself: dataObj.about, avatar: dataObj.avatar, userId : dataObj._id});
                }
            });
        })
        .catch((error) => console.log(`Ошибка запроса ${error}`));



