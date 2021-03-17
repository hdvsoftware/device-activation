import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./api/user.service";
import { LoginRequest } from "./model/loginRequest";
import { LoginResponse } from "./model/loginResponse";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService {
    private loginTokenKey = 'logintoken';
    constructor(
        private userService: UserService) {
            
    }

    isLoggedIn() {
        return localStorage.getItem(this.loginTokenKey) !== null;
    }

    getLoginToken() {
        return localStorage.getItem(this.loginTokenKey);
    }

    login(username: string, password: string): Observable<LoginResponse> {

        const loginRequest: LoginRequest = {
            username: username,
            password: password
        };

        return this.userService.userLoginPost(loginRequest).pipe(
            tap(
            result => {
                if(result.succes === true) {
                    localStorage.setItem(this.loginTokenKey, result.token);
                } else {
                    localStorage.removeItem(this.loginTokenKey);
                }
            })
        )
    }

    logout() {
        localStorage.removeItem(this.loginTokenKey);
        window.location.reload();
    }

}