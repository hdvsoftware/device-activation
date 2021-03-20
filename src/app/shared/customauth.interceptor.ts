import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class CustomAuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.isLoggedIn()) {
            // req.headers.
            const token = 'CUSTOMAUTH ' + this.authService.getLoginToken();
            const modifiedRequest = req.clone({
                setHeaders: { Authorization: token }
            });
            return next.handle(modifiedRequest).pipe(
                catchError((error) => {
                    console.log(error)
                    if (error instanceof HttpErrorResponse) {
                        console.log(error.status);
                        if (error.status === 401) {
                            console.log('do logout?')
                            this.authService.logout();
                        }
                    }
                    return throwError(error);
                })
            );
            

        } else {
            return next.handle(req);
        }
    }

}