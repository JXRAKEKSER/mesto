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
}