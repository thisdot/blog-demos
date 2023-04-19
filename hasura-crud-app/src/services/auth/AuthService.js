import auth0 from "auth0-js";
import auth0Config from "./auth0-variables";

const auth0Client = new auth0.WebAuth({
  domain: auth0Config.domain,
  clientID: auth0Config.clientId,
  redirectUri: auth0Config.callbackUrl,
  responseType: auth0Config.responseType,
  scope: auth0Config.scope
});

const getUser = function() {
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  return userInfo && new Date().getTime() < userInfo.expiresAt
    ? userInfo
    : null;
};

export const authService = {
  login,
  logout,
  handleAuthentication,
  getUserId,
  getAccessToken,
  setReturnUrl,
  getReturnUrl
};

function login() {
  auth0Client.authorize();
}

function logout() {
  // Clear access token and ID token from local storage
  localStorage.removeItem("user_info");
  localStorage.removeItem("returnUrl");
}

function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult).then(userInfo => {
          resolve(userInfo.sub);
        });
      } else if (err) {
        logout();
        reject(err);
      }
    });
  });
}

function setSession(authResult) {
  return new Promise((resolve, reject) => {
    const userInfo = {
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt: authResult.expiresIn * 1000 + new Date().getTime(),
      sub: authResult.idTokenPayload.sub
    };
    localStorage.setItem("user_info", JSON.stringify(userInfo));

    resolve(userInfo);
  });
}

function getUserId() {
  const userInfo = getUser();
  return userInfo ? userInfo.sub : null;
}

function getAccessToken() {
  const userInfo = getUser();
  return userInfo ? userInfo.accessToken : null;
}

function setReturnUrl(value) {
  localStorage.setItem("returnUrl", value);
}

function getReturnUrl() {
  return localStorage.getItem("returnUrl") || "/";
}
