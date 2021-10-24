import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(src, textContent) {
        super.open();
        this._popup.querySelector('.popup__photo').src = src;
        this._popup.querySelector('.popup__photo-name').textContent = textContent;
    }
}