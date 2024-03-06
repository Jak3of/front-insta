import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../public/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService , private router: Router
    ) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Obten el token del local storage
        let token = localStorage.getItem('token');

        if (token) {
            // Si el token existe, clona la solicitud y agrega el token en el encabezado de autorización
            req = req.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // Envia la solicitud modificada
        return next.handle(req).pipe(
            catchError( ( error: HttpErrorResponse)=> {
                if (error.status === 401) {
                    this.authService.logout();
                    this.router.navigate(['/login']);
                }
                return throwError(error);
                
            })
        );
    }
}
