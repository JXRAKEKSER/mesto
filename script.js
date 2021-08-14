let editButton = document.querySelector('.button-edit');
let closePopupitem = document.querySelector('.popup__close-icon');
let saveButton = document.querySelector('.button-save');
let formProfileInfoContainer = document.querySelector('.popup__container');
let profileInfoContainer = document.querySelector('.profile-info__container');

function openPopup() {
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');
    let inputItems = document.querySelectorAll('input');
    let profileName = document.querySelector('.profile-info__name');
    let profileInfoRole = document.querySelector('.profile-info__role');
    inputItems[0].value = profileName.textContent;
    inputItems[1].value = profileInfoRole.textContent;
}

function closePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

function saveProfileInfo(evt) {
    evt.preventDefault();
    let inputItems = document.querySelectorAll('input');
    let profileName = document.querySelector('.profile-info__name');
    let profileInfoRole = document.querySelector('.profile-info__role');

    profileName.textContent = inputItems[0].value;
    profileInfoRole.textContent = inputItems[1].value;
    closePopup();

}




profileInfoContainer.onclick = function(event) {
    if (event.target.className == editButton.className) {
        openPopup();
    }
};
formProfileInfoContainer.onclick = function(event) {
    if (event.target.className == closePopupitem.className) {
        closePopup();
    }
};

/* formProfileInfoContainer.submit = function(event) {
    if (event.target.className == saveButton.className) {
        saveProfileInfo(event);
    } 
    Есть вопрос, могу ли я для события submit сдлелать один обработчик?
    Я не нашел информации об это, и код выше не работает, хотя событие submit есть, в принципе событие submit и onclick
    вызываются параллельно, насколько мне известно, и можно обойтись без обработчика на submit, использовав самый первый обработчик 
    одного нажатия на форме
}; */



formProfileInfoContainer.addEventListener('submit', saveProfileInfo);