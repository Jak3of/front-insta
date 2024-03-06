import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  login(json : any): Observable<User> {
    
    console.log(json);
    return this.http.post(`${environment.apiUrl}api/login`, json)
    .pipe(tap(
        (res: any) =>{
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          console.log(res);
        }
      )
    );
  }

 





  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logout');
  }

  register(json : any): Observable<User> {
    console.log(json);
    return this.http.post<User>(`${environment.apiUrl}register`, json).pipe(
      tap(
        (res: any) =>{
          console.log(res);
        }
      )
    )
  }

  
}
