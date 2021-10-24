export default class UserInfo{
    constructor(userNameSelector, userAboutSelector){
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
        this._userName = document.querySelector(`.${userNameSelector}`);
        this._userAbout = document.querySelector(`.${userAboutSelector}`);
    }

    getUserInfo(){
        const userInfo = {}
        userInfo.fio = this._userName.textContent;
        userInfo.aboutYourself = this._userAbout.textContent;
        return userInfo;
    }

    setUserInfo(userInfo){

        this._userName.textContent = userInfo.fio;
        this._userAbout.textContent = userInfo.aboutYourself;
    }
}