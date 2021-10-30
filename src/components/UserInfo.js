export default class UserInfo{
    constructor(userNameSelector, userAboutSelector, avatarSelector){
        this._userNameSelector = userNameSelector;
        this._userAboutSelector = userAboutSelector;
        this._avatarSelector = avatarSelector;
        this._userName = document.querySelector(`.${userNameSelector}`);
        this._userAbout = document.querySelector(`.${userAboutSelector}`);
        this._avatar = document.querySelector(`.${avatarSelector}`);
        this.userId = null;
    }

    getUserInfo(){
        const userInfo = {}
        userInfo.fio = this._userName.textContent;
        userInfo.aboutYourself = this._userAbout.textContent;
        return userInfo;
    }

    setUserInfo(userInfo){
        const {
            fio = this._userName.textContent,
            aboutYourself = this._userAbout.textContent,
            avatar = this._avatar.src,
            userId = this.userId
        } = userInfo
        this._userName.textContent = fio;
        this._userAbout.textContent = aboutYourself;
        this._avatar.src = avatar;
        this.userId = userId;

    }


}