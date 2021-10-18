 export default  class Card{
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._src = data.link;
        this._alt = `Каринка ${data.name}`;
        this._textContent = data.name;
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
        this._card.querySelector('.element__photo').src = this._src;
        this._card.querySelector('.element__photo').alt = this._alt;
        this._card.querySelector('.element__title').textContent = this._textContent;

        return this._card;
    }

    _handleOpenWithPhoto(){
        const _popupPicture = this._card.closest('.page').querySelector('.popup_type_picture');
         _popupPicture.classList.add('popup_opened');
         _popupPicture.querySelector('.popup__photo').src = this._src;
        _popupPicture.querySelector('.popup__photo-name').textContent = this._textContent;
        document.querySelector('.page').addEventListener('keydown', function down(evt) {
            if(evt.key === "Escape"){
                _popupPicture.classList.remove('popup_opened');
            }
            document.querySelector('.page').removeEventListener('keydown', down);
        });

    }
    _handleAddLike(){
        this._card.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleRemoveCard(){
        this._removeEventListeners();
        this._card.remove();
    }

    _setEventListeners(){
        this._card.querySelector('.element__like').addEventListener('click', () => {this._handleAddLike()});
        this._card.querySelector('.element__trash').addEventListener('click', () => {this._handleRemoveCard()});
        this._card.querySelector('.element__photo').addEventListener('click', () => {this._handleOpenWithPhoto()});
    }

    _removeEventListeners(){
        this._card.querySelector('.element__like').removeEventListener('click', () => this._handleAddLike);
        this._card.querySelector('.element__trash').removeEventListener('click', () => this._handleRemoveCard)
        this._card.querySelector('.element__photo').removeEventListener('click', () => this._handleOpenWithPhoto);
    }

}
