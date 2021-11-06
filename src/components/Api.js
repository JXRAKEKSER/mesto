export default class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._headers = options.headers;
        this._checkResponse = this._checkResponse.bind(this)
    }

    _checkResponse(response){
        if(response.ok){
            return response.json();
        }
        return Promise.reject(`${response.status} and ${response.url}`);
    }

    getUserInfo() {
        return fetch(`${this._baseURL}users/me`,
            {
                method: 'GET',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-type': 'application/json'
                }
            }).then(this._checkResponse);
    }

    getPreloadsCards(){
        return fetch(`${this._baseURL}cards/`,
            {
                method: 'GET',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-type': 'application/json'
                }
            }).then(this._checkResponse)
    }



    updateUserInfo({fio, aboutYourself}){
        return fetch(`${this._baseURL}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                name:`${fio}`,
                about: `${aboutYourself}`
            })
        }).then(this._checkResponse);
    }

    postCard({name, link}){
        return  fetch(`${this._baseURL}cards`, {
            method: 'POST',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                name:`${name}`,
                link:`${link}`
            })
        }).then(this._checkResponse);
    }
    deleteCard(_id){
        return fetch(`${this._baseURL}cards/${_id}`, {
            method:'DELETE',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    addLike(_id){
        return fetch(`${this._baseURL}cards/likes/${_id}`, {
            method:'PUT',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            }
        }).then(this._checkResponse);
    }
    deleteLike(_id){
        return fetch(`${this._baseURL}cards/likes/${_id}`, {
            method:'DELETE',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            }
        }).then(this._checkResponse);
    }
    updateAvatar({avatar}){
        return fetch(`${this._baseURL}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                    avatar: `${avatar}`
                }
            )
        }).then(this._checkResponse);
    }
}