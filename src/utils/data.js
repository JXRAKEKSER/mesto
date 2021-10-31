export const initialCards  = [
    {
        mestoName: 'Архыз',
        mestoURL: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        mestoName: 'Челябинская область',
        mestoURL: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        mestoName: 'Иваново',
        mestoURL: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        mestoName: 'Камчатка',
        mestoURL: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        mestoName: 'Холмогорский район',
        mestoURL: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        mestoName: 'Байкал',
        mestoURL: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]

export const editProfileButton = document.querySelector('.profile-info__button-edit');
export const formProfileInfoContainer = document.querySelector('.popup_type_profile .popup__form');

// блок объявления и инициализации элементов добавления места
export const addMestoButton = document.querySelector('.profile__button-add');
export const formAddMestoContainer = document.querySelector('.popup_type_card-add .popup__form');

export const configValidation = {
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-info'
}

export const openedPopup = document.querySelector('.popup_opened');
export const editAvatarButton = document.querySelector('.profile__avatar-edit-overlay');
export const profilePhoto = document.querySelector('.profile__avatar');
export  const formEditAvatarContainer = document.querySelector('.popup_type_edit-avatar .popup__form');

