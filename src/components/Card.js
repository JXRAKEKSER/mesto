

export default  class Card{
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._src = data.link || data.mestoURL;
        this._alt = `Каринка ${data.name || data.mestoName}`;
        this._textContent = data.name || data.mestoName;
        this._likes = data.likes.length;
        this._likesArray = data.likes;
        if(data.owner){
            this._id = data.owner._id;
        }else{
            this._id = data.userId;
        }
        this._cardId = data._id;
        this._userId = data.userId;
        //callback handlers
        this._openPopup = data.openPopup;
        this._removeCard = data.removeCardCallback;
        this._addLike = data.addLike;
        this._deleteLike = data.deleteLike;
        this._renderResponse = data.renderResponse;
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
        this._likesArray.forEach(likeObj =>{
            if(this._userId === likeObj._id){
                this._card.querySelector('.element__like').classList.add('element__like_active');
            }
        });
        return this._card;
    }

    _handleOpenWithPhoto(){
        this._openPopup(this._src, this._textContent);
    }
    _handleAddLike(){
        this._card.querySelector('.element__like').classList.toggle('element__like_active');
        if(this._card.querySelector('.element__like').classList.contains('element__like_active')){
            this._renderResponse(this._addLike(this._cardId), (updatedCardData) =>{
                this._card.querySelector('.element__like-counter').textContent = updatedCardData.likes.length;
            });

        }else{
            this._renderResponse(this._deleteLike(this._cardId), (updatedCardData) =>{
                this._card.querySelector('.element__like-counter').textContent = updatedCardData.likes.length;
            })

        }

    }

    _handleRemoveCard(){
       this._removeCard(this._cardId, this._card);
    }

    _setEventListeners(){
        if(this._id === this._userId){
            this._card.querySelector('.element__trash').addEventListener('click', () => {
                this._handleRemoveCard();
            });
        }
        this._card.querySelector('.element__like').addEventListener('click', () => {this._handleAddLike()});
        this._card.querySelector('.element__photo').addEventListener('click', () => {this._handleOpenWithPhoto()});
    }

}
