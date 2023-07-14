export class UserInfo {
  constructor(profileConfig) {
    this.profileConfig = profileConfig;
    this._profileTitle = document.querySelector(profileConfig.title);
    this._profileAbout = document.querySelector(profileConfig.about);
    this._profileAvatar = document.querySelector(profileConfig.avatar);
  }

  getUserInfo() {
    const data = {
      title: this._profileTitle.textContent,
      about: this._profileAbout.textContent,
    };
    return data;
  }

  editProfileInfo(data) {
    this._profileAvatar.alt = `${data.name}`;
    this._profileTitle.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this.id = data._id;
    this.editProfileImage(data);
  }

  editProfileImage(data) {
    this._profileAvatar.src = data.avatar;
  }
}
