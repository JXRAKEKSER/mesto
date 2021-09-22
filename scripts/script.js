//import data from './data';
/*Я изначально хотел разделить данные и функции - создать отдельный файл для них, но столкнулся с ошибкой экспортирования
 SyntaxError: Cannot use import statement outside a module, поискал информацию и нашел, что это какая-то замутка с бабелем, толком не вник и сейчас нет времени на это
  надеюсь, Вы не вернете работу на доработку из-за этого, мне всё равно нужно разобраться с этим, чтобы дальнейшие работы сдавать
  Не стал удалять код для варинта использования даных из файла*/

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
function  createCard(cardData) {
    const cardTemplate = document.querySelector('#card').content;
    const newCard = cardTemplate.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__photo').src = cardData.link;
    newCard.querySelector('.element__photo').alt = `Фото ${cardData.name}`;
    newCard.querySelector('.element__title').textContent = cardData.name;
    return newCard;
}

function preloadCards(data) {

   /* data.indexPage.preloadData.initialCards.forEach((dataItem) => {
        //renderCard инициализируется в блоке общих переменных
        elementsContainer.append(createCard(dataItem));
    });*/
    data.forEach((dataItem) => {
        //renderCard инициализируется в блоке общих переменных
        elementsContainer.append(createCard(dataItem));
        setCardEventListenets(elementsContainer.lastElementChild);
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
    // внутри функции чистки попапа проверяется имеет ли попап форму и только в этом случае очищает её,
    // или это чисто концептуальный вопрос в том, чтобы вызывать очистку только на попапах с формой?
    clearFormInputs(popup);
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

function setCardEventListenets(card) {
    const likeBtn = card.querySelector('.element__like');
    likeBtn.addEventListener('click', addLike);
    const removeBtn = card.querySelector('.element__trash');
    removeBtn.addEventListener('click', removeMestoCard);
    const photoOpener = card.querySelector('.element__photo');
    photoOpener.addEventListener('click', openWithPhoto);
}


// функция добавления карточки

function addMestoCard(evt) {
    evt.preventDefault();

    elementsContainer.prepend(createCard({ name: inputMestoName.value, link:inputMestoURL.value}));
    setCardEventListenets(elementsContainer.firstElementChild);
    clearFormInputs(addMestoPopup);
    const inputsList = Array.from(evt.target.closest('.popup__form').querySelectorAll('.popup__input'));
    toogleSubmitButton(inputsList, evt.target.closest('.popup__form').querySelector('.popup__button-save'), 'popup__button-save_inactive');
    closePopup(addMestoPopup);
};

//функция удаления карточки
function removeMestoCard(evt) {
    if(evt.target.classList.contains('element__trash')) {
        const removeElement = evt.target.closest('.element');
        removeElement.querySelector('.element__like').removeEventListener('click', addLike);
        removeElement.querySelector('.element__trash').removeEventListener('click', removeMestoCard);
        removeElement.querySelector('.element__photo').removeEventListener('click', openWithPhoto);

        removeElement.remove();
    }

}

//функция проставления лайков
function addLike(evt) {
    if(evt.target.classList.contains('element__like')){
        evt.target.classList.toggle('element__like_active');
    }
}

function openWithPhoto(evt) {
        if(evt.target.classList.contains('element__photo')){
            mestoPhotoPopup.querySelector('.popup__photo').src = evt.target.src;
            mestoPhotoPopup.querySelector('.popup__photo-name').textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
            mestoPhotoPopup.querySelector('.popup__photo').alt = `Фото ${mestoPhotoPopup.querySelector('.popup__photo-name').textContent}`;
            openPopup(mestoPhotoPopup);
        }


}

// вызов функции загрузки дефолтных карт
preloadCards(initialCards);


// блок слушателей кнопок
//profileInfo
editProfileButton.addEventListener('click',() => openProfilePopup());
closeEditProfilePopupButton.addEventListener('click',() => closePopup(popupEditProfile));
formProfileInfoContainer.addEventListener('submit', saveProfileInfo);

//addMesto
addMestoButton.addEventListener('click', () => openPopup(addMestoPopup));
closeAddMestoPopupButton.addEventListener('click', () => closePopup(addMestoPopup));
formAddMestoContainer.addEventListener('submit', addMestoCard);
//обработчик на контейнер карточек
/*elementsContainer.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('element__trash')) {
        removeMestoCard(evt);
    }
    if(evt.target.classList.contains('element__like')){
        addLike(evt);
    }
    if(evt.target.classList.contains('element__photo')) {
        openWithPhoto(evt);
    }
});*/

document.querySelector('.page').addEventListener('click', (evt) => {
   if(evt.target.classList.contains('popup')){
       closePopup(evt.target);
   }
});

function closePopupByKeyboard(evt){
    if(evt.key === "Escape"){
        closePopup(document.querySelector('.popup_opened'));
    }

}



closeMestoPhotoPopupButton.addEventListener('click', () => closePopup(mestoPhotoPopup));
function isValid(input) {
    return input.validity.valid;
}

function hasValidationFail(inputsList) {
    return inputsList.some(input => {
       return !input.validity.valid;
    });
}

function toogleSubmitButton(inputsList, button, inactiveButtonClass) {
    if(hasValidationFail(inputsList)){
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    }else{
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    }
}

function showErrorMsg(form, input, errorstrMsg, inputErrorClass) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorSpan.textContent = errorstrMsg;
}

function hideErrorMsg(form, input, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    form.querySelector(`.${input.id}-error`).textContent = '';
}

function changeValidateState(form, input, inputErrorClass){
    if(!isValid(input)) {
        showErrorMsg(form, input, input.validationMessage, inputErrorClass);
    }else{
        hideErrorMsg(form, input, inputErrorClass);
    }
}

function setInputListeners(form, validSelectors) {
    const inputsList = Array.from(form.querySelectorAll(`.${validSelectors.inputSelector}`));
    const submitButton = form.querySelector(`.${validSelectors.submitButtonSelector}`);
    toogleSubmitButton(inputsList, submitButton, validSelectors.inactiveButtonClass);
    inputsList.forEach(input =>{
       input.addEventListener('input', (evt) => {
           changeValidateState(form, input, validSelectors.inputErrorClass);
           toogleSubmitButton(inputsList, submitButton, validSelectors.inactiveButtonClass);
       });
        input.addEventListener('change', (evt) =>{
            changeValidateState(form, input, validSelectors.inputErrorClass);
            toogleSubmitButton(inputsList, submitButton, validSelectors.inactiveButtonClass);
        });
    });
}

function enableValidation(validSelectors) {
    Array.from(document.forms).forEach(form =>{
       form.addEventListener('submit', (evt)=>{
           evt.preventDefault();
       });
        setInputListeners(form, validSelectors);
    });
}
// вызовы функций

enableValidation({
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-info'
});