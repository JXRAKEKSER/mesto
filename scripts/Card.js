 export default  class Card{
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._src = data.link;
        this._alt = `Каринка ${data.name}`;
        this._textContent = data.name;
        this._openPopup = data.openPopup;
    }

    _getTemplate(){

        const template = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return template;

    }
    createCard(){
        this._card = this._getTemplate();
        this._setEventListeners();
        const _elementPhoto = this._card.querySelector('.element__photo');
        const _elementText = this._card.querySelector('.element__title');
        _elementPhoto.src = this._src;
        _elementPhoto.alt = this._alt;
        _elementText.textContent = this._textContent;

        return this._card;
    }

    _handleOpenWithPhoto(){

        const _popupPicture = this._card.closest('.page').querySelector('.popup_type_picture');
        _popupPicture.querySelector('.popup__photo').src = this._src;
        _popupPicture.querySelector('.popup__photo-name').textContent = this._textContent;


        this._openPopup(_popupPicture);


    }
    _handleAddLike(){
        this._card.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleRemoveCard(){

        this._card.remove();
        this._card = null;
    }

    _setEventListeners(){
        this._card.querySelector('.element__like').addEventListener('click', () => {this._handleAddLike()});
        this._card.querySelector('.element__trash').addEventListener('click', () => {this._handleRemoveCard()});
        this._card.querySelector('.element__photo').addEventListener('click', () => {this._handleOpenWithPhoto()});
    }

}
