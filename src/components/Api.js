export default class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._headers = options.headers;
    }



    getUserInfo() {
        return fetch(`${this._baseURL}users/me`,
            {
                method: 'GET',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-type': 'application/json'
                }
            });
    }

    getPreloadsCards(){
        return fetch(`${this._baseURL}cards/`,
            {
                method: 'GET',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-type': 'application/json'
                }
            });
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
        });
    }

    postCard({name, link}){
        return fetch(`${this._baseURL}cards`, {
            method: 'POST',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                name:`${name}`,
                link:`${link}`
            })
        });
    }
    deleteCard(_id){
        return fetch(`${this._baseURL}cards/${_id}`, {
            method:'DELETE',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            }
        });
    }

    addLike(_id){
        return fetch(`${this._baseURL}cards/likes/${_id}`, {
            method:'PUT',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            }
        });
    }
    deleteLike(_id){
        return fetch(`${this._baseURL}cards/likes/${_id}`, {
            method:'DELETE',
            headers:{
                authorization: this._headers.authorization,
                'Content-type': 'application/json'
            }
        });
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
        });
    }
}