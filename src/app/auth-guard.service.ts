import { Injectable, inject } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private http: HttpClient ) { }

  // userExists(nick: any): boolean {
  //   let pipe = false;
  //   console.log(nick)
  //   console.log(`${environment.apiUrl}usersExists/${nick}`)

  //   this.http.get(`${environment.apiUrl}usersExists/${nick}`).pipe(
  //     tap(
  //       (res: any) => {
  //         console.log(res)
  //         pipe = res
  //       }
  //     )
  //   );
  //   return pipe
   
  // }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Comprueba si el token existe
    console.log('el token is authenticated', !!token);
    return !!token;
  }

  

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  

}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(AuthGuardService);

  if (tokenService.isAuthenticated()) {
    return true;
  } else {
    // No estás autenticado, redirige al componente de inicio de sesión
    inject(Router).navigate(['/login']);
    console.log('authGuard: no autenticado');
    return false;
  }
};

export const authLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(AuthGuardService);
  if (!tokenService.isAuthenticated()) {
    console.log('authLoginGuard: no autenticado');
    return true;
  } else {
    // No estás autenticado, redirige al componente de inicio de sesión
    inject(Router).navigate(['/posts']);
    console.log('authLoginGuard: autenticado');
    return false;
  }
};


// export const UserExistsGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const tokenService = inject(AuthGuardService);
//   const nick = route.params['nick'];
//   console.log(nick)
//   if (tokenService.userExists( nick )) {

//     return true;
//   } else {
//     return inject(Router).navigate(['/errorprofile']);
//   }
// };


export const logoutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tokenService = inject(AuthGuardService);
  if (tokenService.isAuthenticated()) {
    tokenService.logout();
    return inject(Router).navigate(['/login']);
  }
  return true;
};
