// блок объявления и инициализации элементов редактирования информации профиля
let editProfileButton = document.querySelector('.profile-info__button-edit');
let closeEditProfilePopupButton = document.querySelector('#editProfile .popup__button-close');
let popupEditProfile = document.querySelector('#editProfile');
let profileName = document.querySelector('.profile-info__name');
let profileInfoRole = document.querySelector('.profile-info__role');
let inputItemRole = document.querySelector('#editProfile input[name=aboutYourself]');
let inputItemName = document.querySelector('#editProfile input[name=fio]');
let formProfileInfoContainer = document.querySelector('#editProfile .popup__form');

// блок объявления и инициализации общих элементов(контейнеры, секции и т.п. семантически общие вещи)
let elementsContainer = document.querySelector('.elements');


// блок объявления и инициализации элементов добавления места
let addMestoButton = document.querySelector('.profile__button-add');
let addMestoPopup = document.querySelector('#addMesto');
let closeAddMestoPopupButton = document.querySelector('#addMesto .popup__button-close');
let inputMestoName = document.querySelector('input[name=mestoName]');
let inputMestoURL = document.querySelector('input[name=mestoURL]');
let formAddMestoContainer = document.querySelector('#addMesto .popup__form');
// блок объявления и инициализации элементов просмотра картинки
let mestoPhotoPopup = document.querySelector('#photoMesto');
let closeMestoPhotoPopupButton =  document.querySelector('#photoMesto .popup__button-close');
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
function preloadCards() {

    initialCards.forEach((dataItem) => {
        //renderCard инициализируется в блоке общих переменных
        const cardTemplate = document.querySelector('#card').content;
        const renderCard = cardTemplate.querySelector('.element').cloneNode(true);
        renderCard.querySelector('.element__photo').src = dataItem.link;
        renderCard.querySelector('.element__photo').alt = `Фото ${dataItem.name}`;
        renderCard.querySelector('.element__title').textContent = dataItem.name;
        elementsContainer.append(renderCard);
    });
};

//функция очистки данных внутри попапа
function clearInput(popup) {
   let inputs = popup.querySelectorAll('.popup__input');
    inputs.forEach( input => {
       input.value = "";
    });
}

 function openPopup(popup) {

    popup.classList.add('popup_opened');


     inputItemName.value = profileName.textContent;
     inputItemRole.value = profileInfoRole.textContent;
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
    clearInput(popup);
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

    const cardTemplate = document.querySelector('#card').content;
    const renderCard = cardTemplate.querySelector('.element').cloneNode(true);
    console.log(inputMestoURL);
    renderCard.querySelector('.element__photo').src = inputMestoURL.value;
    renderCard.querySelector('.element__photo').alt = `Фото ${inputMestoName.value}`;
    renderCard.querySelector('.element__title').textContent = inputMestoName.value;
    elementsContainer.prepend(renderCard);
    let inputs = addMestoPopup.querySelectorAll('.popup__input');
    inputs.forEach((input) => {
       input.value = "";
    });
    closePopup(addMestoPopup);
};

//функция удаления карточки
function removeMestoCard(evt) {
    if(evt.target.className == 'element__trash'){
      const removeElement = event.target.closest('.element');
        removeElement.remove();
    }
}

//функция проставления лайков
function addLike(evt) {
    if(evt.target.classList[0] == 'element__like'){
        evt.target.classList.toggle('element__like_active');
    }
}

function openWithPhoto(evt) {
    if(evt.target.className == 'element__photo'){
        console.log(evt.target.classList[0])
        mestoPhotoPopup.querySelector('.popup__photo').src = evt.target.src;
        mestoPhotoPopup.querySelector('.popup__photo-name').textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
        mestoPhotoPopup.querySelector('.popup__photo').alt = `Фото ${mestoPhotoPopup.querySelector('.popup__photo-name').textContent}`;
        openPopup(mestoPhotoPopup);
    }
}

// вызов функции загрузки дефолтных карт
preloadCards();

//блок функций замыкания
var closureOpenPopup = function (popup) {
    return function openPopup() {

        popup.classList.add('popup_opened');


        inputItemName.value = profileName.textContent;
        inputItemRole.value = profileInfoRole.textContent;
    };
};

var closureClosePopup = function (popup) {
    return function closePopup () {
        popup.classList.remove('popup_opened');
        clearInput(popup);
    }
};
// блок слушателей кнопок
//profileInfo
editProfileButton.addEventListener('click',closureOpenPopup(popupEditProfile));
closeEditProfilePopupButton.addEventListener('click', closureClosePopup(popupEditProfile));
formProfileInfoContainer.addEventListener('submit', saveProfileInfo);

//addMesto
addMestoButton.addEventListener('click', closureOpenPopup(addMestoPopup));
closeAddMestoPopupButton.addEventListener('click', closureClosePopup(addMestoPopup));
formAddMestoContainer.addEventListener('submit', addMestoCard);
//обработчик на контейнер карточек
elementsContainer.onclick = (evt)=>{
   removeMestoCard(evt);
    addLike(evt);
    openWithPhoto(evt);
};

closeMestoPhotoPopupButton.addEventListener('click', closureClosePopup(mestoPhotoPopup));