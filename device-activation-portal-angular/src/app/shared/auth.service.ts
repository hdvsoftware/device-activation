import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { UserService } from "./api/user.service";
import { LoginRequest } from "./model/loginRequest";
import { LoginResponse } from "./model/loginResponse";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private authRulesKey = 'authRules';
    private authTokenKey = 'authToken';
    private token: string;
    private apprules: string[] = [];

    loggedInSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private userService: UserService) {
            this.readSessionFromLocalstorage();
    }

    isLoggedIn() {
        return localStorage.getItem(this.authTokenKey) !== null;
    }

    getLoginToken() {
        return this.token;
    }

    hasRules(rules: string) {
        // if(rules instanceof Array) {
        //     console.log('check array')
        //     return true;
        // } else {
        // }
        if(this.apprules === null) {
            this.apprules = [];
        }
        return this.apprules.findIndex((r) => r == rules) >= 0;
        
        // return true;
    }

    login(username: string, password: string): Observable<LoginResponse> {

        const loginRequest: LoginRequest = {
            username: username,
            password: password
        };

        return this.userService.userLoginPost(loginRequest).pipe(
            tap(
            (result: LoginResponse) => {
                if(result.succes === true) {
                    this.token = result.token;
                    this.apprules = result.rules || [];
                    this.storeSessionInLocalstorage(result.token, result.rules);
                    this.loggedInSubject.next(true);
                } else {
                    this.clearLocalStorage();
                }
            })
        )
    }

    logout() {
        this.clearLocalStorage();
        window.location.reload();
    }

    private clearLocalStorage() {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.authRulesKey);
    }

    private storeSessionInLocalstorage(token: string, rules: string[]) {
        localStorage.setItem(this.authTokenKey, token);

        const rulesAsJSON = JSON.stringify(rules);
        localStorage.setItem(this.authRulesKey, rulesAsJSON);
    }
    private readSessionFromLocalstorage() {
        this.token = localStorage.getItem(this.authTokenKey);
        this.apprules = JSON.parse(localStorage.getItem(this.authRulesKey)) as string[];
        // if(this.token) {
        this.loggedInSubject.next(this.token !== null);
        // }
    }

}