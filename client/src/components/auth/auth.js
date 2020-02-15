import auth0 from 'auth0-js';
import { authConfig } from '../config';
import { decode } from 'jsonwebtoken'

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: authConfig.domain,
    clientID: authConfig.clientId,
    redirectUri: authConfig.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor(history) {
    this.history = history

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.removeLocalStorage = this.removeLocalStorage.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('Access token: ', authResult.accessToken)
        console.log('id token: ', authResult.idToken)
        this.setSession(authResult);
      } else if (err) {
        this.history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return localStorage.getItem('idToken')
  }

  setLocalStorage (authResult){
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('accessToken', authResult.accessToken);
    
  }

  removeLocalStorage(authResult){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('accessToken');

  }

  setSession(authResult) {
   
    this.setLocalStorage(authResult);
    this.history.replace('/library');
  }

  logout() {
    this.removeLocalStorage();
    this.auth0.logout({
      return_to: window.location.origin
    });

    this.history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = localStorage.getItem('expiresAt');
    if(!expiresAt) return false;
    if(new Date().getTime() < expiresAt){
      return localStorage.getItem("isLoggedIn");  
    }else{
      this.removeLocalStorage();
      return false;
    }
    
  }

  getUserId(){
    const token = this.getIdToken();
    const decoded = decode(token)
    return decoded.sub;
  }
}
