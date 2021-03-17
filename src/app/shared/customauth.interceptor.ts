import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError, map, tap} from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
import { LoginService } from "./login.service";

@Injectable()
export class CustomAuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.loginService.isLoggedIn()) {
            // req.headers.
            const token = 'CUSTOMAUTH '+this.loginService.getLoginToken();
            const modifiedRequest = req.clone({
                setHeaders: { Authorization: token } 
           });

            return next.handle(modifiedRequest).pipe(
                catchError((error) => {
                    console.log(error)
                    if(error instanceof HttpErrorResponse) {
                        console.log(error.status);
                        if(error.status === 401) {
                            console.log('do logout?')
                            this.loginService.logout();
                        }
                        // error.status
                    }
                    // console.log(error)
                    // console.log(typeof error)
                    return throwError(error);
                })
                // tap(event => {
                //     console.log(event);
                //   if (event.type === HttpEventType.Response) {
                //     console.log('Incoming response');
                //     console.log(event.body);
                //   }
                // })
              );
            // return next.handle(
            //     req.clone({
            //          setHeaders: { Authorization: token } 
            //     }))
            //     .pipe(
            //         map(resp => {
            //             console.log('map');
            //             console.log(resp);
            //             return resp;
            //         })
            //         // .tap((event: HttpEvent<any>) => {
            //         //     console.log(event);
            //         //     if(event instanceof HttpResponse) {
            //         //         console.log(event)
            //         //         console.log(event.status)
            //         //         if(event.status === 401) {
            //         //             this.loginService.logout();
            //         //         }
            //         //     }
            //         //     return event;
            //         // })
            //     );
                
        } else {
            return next.handle(req);
        }


        // throw new Error("Method not implemented.");
    }

}