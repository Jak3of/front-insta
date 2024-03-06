import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(page : any) : Observable<any> {
    page++;
    return this.http.get(`${environment.apiUrl}api/users/${page}`).pipe(
      tap(
        {
          next: (res: any) => {
            console.log(res)
          },
          error: (err: any) => {
            console.log(err)
          }
        }
      )
    )
  }

  getUsers(nickname : any) : Observable<any> {
    return this.http.get(`${environment.apiUrl}api/user/${nickname}`).pipe(
      tap(
        {
          next: (res: any) => {
          },
          error: (err: any) => {
            console.log(err)
          }
        }
      )
    )
  }

  getPostsforUser(id : any) : Observable<any> {
    return this.http.get(`${environment.apiUrl}api/userposts/${id}`).pipe(
      tap(
        {
          next: (res: any) => {
            
          },
          error: (err: any) => {
            console.log(err)
          }
        }
      )
    )
  }

  userExists(nick: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}usersExists/${nick}`).
    pipe(
      tap(
        {
          next: (res: any) => {
            console.log(res)
            return res
          },
          error: (err: any) => {
            console.log(err)
          }
        }
      )
    );
  }
}
