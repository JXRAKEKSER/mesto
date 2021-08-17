let editButton = document.querySelector('.profile-info__button-edit');
let closePopupButton = document.querySelector('.popup__button-close');
let formProfileInfoContainer = document.querySelector('.popup__container');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile-info__name');
let profileInfoRole = document.querySelector('.profile-info__role');

function openPopup() {

    popup.classList.add('popup_opened');
    let inputItems = document.querySelectorAll('input');
    let inputItemName = inputItems[0];
    let inputItemRole = inputItems[1];
    inputItemName.value = profileName.textContent;
    inputItemRole.value = profileInfoRole.textContent;
}

function closePopup() {

    popup.classList.remove('popup_opened');
}

function saveProfileInfo(evt) {
    evt.preventDefault();
    let inputItems = document.querySelectorAll('input');
    let inputItemName = inputItems[0];
    let inputItemRole = inputItems[1];

    profileName.textContent = inputItemName.value;
    profileInfoRole.textContent = inputItemRole.value;
    closePopup();

}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formProfileInfoContainer.addEventListener('submit', saveProfileInfo);