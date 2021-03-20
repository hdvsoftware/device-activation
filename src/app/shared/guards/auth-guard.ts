import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if(this.authService.isLoggedIn()) {
            if(route.data.requiredRule) {
                return this.authService.hasRules(route.data.requiredRule)
            } else {
                return true;
            }
            // console.log('yes navigate')
            // return true;
        } else {
            this.router.navigate(['login']);
        }


    }

}