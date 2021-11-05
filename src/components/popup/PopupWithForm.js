import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValue(){
        const formData = {};

        Array.from(this._popup.querySelectorAll(`.popup__input`)).forEach(_input =>{

           formData[_input.name] = _input.value;
        });

        return formData;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            this._submitHandler(this._getInputValue(), evt);

        });
    }
    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }


}