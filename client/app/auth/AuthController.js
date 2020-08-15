import { AuthService } from "./AuthConfig.js";
import store from '../store.js'

function drawUser() {
  let user = store.State.user
  let userAvatar = avatarTemplate(user);
  let button = authButton(user);

  let template = /*html*/ `
    <div class="d-flex align-items-center justify-content-between p-2">
      ${userAvatar}
        <h1>Magic & Mythos</h1>
      ${button}
    </div>
  `;
  document.getElementById("authbar").innerHTML = template;
}

export class AuthController {
  constructor() {
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async () => {
    })
    drawUser();
  }

  async login() {
    try {
      console.log(AuthService)
      await AuthService.loginWithPopUp();

    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
    } catch (e) {
      console.error(e);
    }
  }
}

function authButton(user) {
  return user.sub
    ? /*html*/ `
    <button class="btn btn-danger" onclick="app.authController.logout()">logout</button>
  `
    : /*html*/ `
    <button class="btn btn-info" onclick="app.authController.login()">login</button>
  `;
}

function avatarTemplate(user) {
  return user.sub
    ? /*html*/ `
    <div>
      <img class="rounded-circle" src="${user.picture}" alt="${user.name}" height="45"/>
      <span class="ml-2">${user.name}</span>
    </div>`
    : /*html*/ `
    <div></div>
    `;
}
