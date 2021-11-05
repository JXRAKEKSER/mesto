export default class Popup{
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(`.${popupSelector}`)
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }

    open(){

        this._popup.classList.add('popup_opened');
        document.querySelector('.page').addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove('popup_opened');
        document.querySelector('.page').removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
                this.close();
            }
        });
    }
}