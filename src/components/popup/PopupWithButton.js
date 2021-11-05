import Popup from "./Popup.js";
export default class PopupWithButton extends Popup{
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._popupData = null;
        this._cardItem = null
    }

    open(data, cardItem) {
        super.open();
        this._popupData = data;
        this._cardItem = cardItem;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', () =>{
          this._submitHandler(this._popupData, this._cardItem);
        });
    }
}