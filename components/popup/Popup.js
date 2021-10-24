export default class Popup{
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(`.${popupSelector}`)
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }

    open(){

        this._popup.classList.add('popup_opened');
    }

    close(){
        this._popup.classList.remove('popup_opened');
    }

    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
                this.close();
            }
        });
        document.querySelector('.page').addEventListener('keydown', (evt) =>{
           this._handleEscClose(evt);
        });
    }
}