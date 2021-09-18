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
    });

};

//функция очистки данных внутри попапа
function clearFormInputs(popup) {
    //проверка на наличие формы в попапе, чтобы не возникало ошибки при закрытии попапа просмотра фотографий
    if(popup.querySelector('form')) {
        let form = popup.querySelector('.popup__form');
        form.reset();
    }

}

 function openPopup(popup) {
    popup.classList.add('popup_opened');

};

function closePopup (popup) {
    popup.classList.remove('popup_opened');

    //если я не оставлю здесь вызов функции очистки формы, то при закрытии попапа на крестик данные в ней останутся, мне какжется это не очень удобно
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


// функция добавления карточки
function addMestoCard(evt) {
    evt.preventDefault();

    elementsContainer.prepend(createCard({ name: inputMestoName.value, link:inputMestoURL.value}));
    clearFormInputs(addMestoPopup);
    closePopup(addMestoPopup);
};

//функция удаления карточки
function removeMestoCard(evt) {

      const removeElement = evt.target.closest('.element');
        removeElement.remove();

}

//функция проставления лайков
function addLike(evt) {
        evt.target.classList.toggle('element__like_active');
}

function openWithPhoto(evt) {

        mestoPhotoPopup.querySelector('.popup__photo').src = evt.target.src;
        mestoPhotoPopup.querySelector('.popup__photo-name').textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
        mestoPhotoPopup.querySelector('.popup__photo').alt = `Фото ${mestoPhotoPopup.querySelector('.popup__photo-name').textContent}`;
        openPopup(mestoPhotoPopup);

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
elementsContainer.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('element__trash')) {
        removeMestoCard(evt);
    }
    if(evt.target.classList.contains('element__like')){
        addLike(evt);
    }
    if(evt.target.classList.contains('element__photo')) {
        openWithPhoto(evt);
    }
});

closeMestoPhotoPopupButton.addEventListener('click', () => closePopup(mestoPhotoPopup));