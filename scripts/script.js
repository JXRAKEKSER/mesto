let editButton = document.querySelector('.profile-info__button-edit');
let closePopupButton = document.querySelector('.popup__button-close');
let formProfileInfoContainer = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile-info__name');
let profileInfoRole = document.querySelector('.profile-info__role');
let inputItemRole = document.querySelector('input[name=aboutYourself]');
let inputItemName = document.querySelector('input[name=fio]');

function openPopup() {

    popup.classList.add('popup_opened');

    
    inputItemName.value = profileName.textContent;
    inputItemRole.value = profileInfoRole.textContent;
}

function closePopup() {

    popup.classList.remove('popup_opened');
}

function saveProfileInfo(evt) {
    evt.preventDefault();

    
    

    profileName.textContent = inputItemName.value;
    profileInfoRole.textContent = inputItemRole.value;
    closePopup();

}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formProfileInfoContainer.addEventListener('submit', saveProfileInfo);