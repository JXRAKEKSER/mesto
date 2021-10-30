 export default  class Card{
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._src = data.link || data.mestoURL;
        this._alt = `Каринка ${data.name || data.mestoName}`;
        this._textContent = data.name || data.mestoName;
        this._likes = data.likes.length;
        if(data.owner){
            this._id = data.owner._id;
        }else{
            this._id = data.userId;
        }
        this._userId = data.userId;
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
        if(this._id != this._userId && this._id){
            this._card.querySelector('.element__trash').classList.add('element__trash_hide');
        }
        const _elementLikeCounter = this._card.querySelector('.element__like-counter');
        const _elementPhoto = this._card.querySelector('.element__photo');
        const _elementText = this._card.querySelector('.element__title');
        _elementPhoto.src = this._src;
        _elementPhoto.alt = this._alt;
        _elementText.textContent = this._textContent;
        _elementLikeCounter.textContent = this._likes;
        return this._card;
    }

    _handleOpenWithPhoto(){
        this._openPopup(this._src, this._textContent);
    }
    _handleAddLike(){
        this._card.querySelector('.element__like').classList.toggle('element__like_active');
        if(this._card.querySelector('.element__like').classList.contains('element__like_active')){
            this._card.querySelector('.element__like-counter').textContent = this._likes + 1;

        }else{
            this._card.querySelector('.element__like-counter').textContent = this._likes;
        }

    }

    _handleRemoveCard(){

        this._card.remove();
        this._card = null;
    }

    _setEventListeners(){
        if(this._id === this._userId){
            this._card.querySelector('.element__trash').addEventListener('click', () => {this._handleRemoveCard()});
        }
        this._card.querySelector('.element__like').addEventListener('click', () => {this._handleAddLike()});
        this._card.querySelector('.element__photo').addEventListener('click', () => {this._handleOpenWithPhoto()});
    }

}
