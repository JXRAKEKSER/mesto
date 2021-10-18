export default class FormValidator{
    constructor(settingsObj, form) {
        this._form = form;
        this._inputSelector = settingsObj.inputSelector;
        this._submitButtonSelector = settingsObj.submitButtonSelector;
        this._inactiveButtonClass = settingsObj.inactiveButtonClass;
        this._inputErrorClass = settingsObj.inputErrorClass;
        this._errorClass = settingsObj.errorClass;
        this._inputList = form.querySelectorAll(`.${settingsObj.inputSelector}`);
        this._submitButton = form.querySelector(`.${settingsObj.submitButtonSelector}`);
    }

    _isValid(_input){
        return _input.validity.valid;
    }

    _hasValidationFaild(){
        return Array.from(this._inputList).some( _input =>{
            return !this._isValid(_input);
        });
    }

    _toogleSubmitButton(){

        if(this._hasValidationFaild()){

            this._submitButton.disabled = true;
            this._submitButton.classList.add(this._inactiveButtonClass);
        }else {

            this._submitButton.disabled = false;
            this._submitButton.classList.remove(this._inactiveButtonClass);
        }
    }
    _showErrorMessage(_input){
        const errorSpan = this._form.querySelector(`.${_input.id}-error`);
        _input.classList.add(this._inputErrorClass);
        errorSpan.textContent = _input.validationMessage;
    }

    _hideErrorMessage(_input){
        const errorSpan = this._form.querySelector(`.${_input.id}-error`);
        _input.classList.remove(this._inputErrorClass);
        errorSpan.textContent = '';
    }

    _changeValidateState(_input){
        if(!this._isValid(_input)){
            this._showErrorMessage(_input);

        }else {
            this._hideErrorMessage(_input);
        }
    }

    _setInputListeners(){
        this._toogleSubmitButton();
        Array.from(this._inputList).forEach(_input =>{
           _input.addEventListener('input', (evt) => {
               this._changeValidateState(_input);
               this._toogleSubmitButton();
           });
           _input.addEventListener('change', (evt) => {
               this._changeValidateState(_input);
               this._toogleSubmitButton();
           })
        });
    }

    _removeInputListeners(){
        Array.from(this._inputList).forEach(_input => {
            _input.removeEventListener('input', (evt) => {
                this._changeValidateState(_input);
                this._toogleSubmitButton();
            });

            _input.removeEventListener('change', (evt) => {
                this._changeValidateState(_input);
                this._toogleSubmitButton();
            });
        });
    }

    enableValidation(){
        this._setInputListeners();
    }


    disableValidation(){
        this._removeInputListeners()
    }
}