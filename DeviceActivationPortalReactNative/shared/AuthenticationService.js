import { UserApi } from "../generated/api";

export class AuthenticationService {
    authRulesKey = 'authRules';
    authTokenKey = 'authToken';
    token = '';
    apprules = [];

    constructor() {
        this.readSessionFromLocalstorage();
    }

    isLoggedIn() {
        return this.token !== null;
    }

    getLoginToken() {
        return this.token;
    }

    hasRule(rule) {
        if(this.apprules === null) {
            this.apprules = [];
        }
        return this.apprules.findIndex((r)=> r === rule) >= 0;
    }

    login(username, password, callback) {
        let requestBody = {
            body: {
                username: username,
                password: password
            }
        }

        return new UserApi()
            .userLoginPost(requestBody)
            .then(response => response.json())
            .then(result => {
                if(result.succes) {
                    this.token = result.token;
                    this.apprules = result.rules;
                    localStorage.setItem(this.authTokenKey, this.token);
                    localStorage.setItem(this.authRulesKey, JSON.stringify(this.apprules));
                }
                callback(result);
            });
    }

    logout() {
     this.clearLocalStorage();
     window.location.reload();

    }

    clearLocalStorage() {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.authRulesKey);
    }

    readSessionFromLocalstorage() {
        this.token = localStorage.getItem(this.authTokenKey);
        this.apprules = JSON.parse(localStorage.getItem(this.authRulesKey));
    }
}

AuthenticationService.instance = new AuthenticationService();
