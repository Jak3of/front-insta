import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts() : Observable<any> {
    return this.http.get(`${environment.apiUrl}api/getposts/`)
    .pipe(
      tap(
        (res: any) => {
          console.log(res);
        }
      )
    )
  }

  getPost(id : any) : Observable<any> {
    return this.http.get(`${environment.apiUrl}api/getpost/${id}`)
    .pipe(
      tap(
        (res: any) => {
          console.log(res);
        }
      )
    )
  }

  like(id : any) {
    return this.http.get(`${environment.apiUrl}api/like/${id}`).pipe(
      tap(
        (res: any) => {
          console.log(res);
        }
      )
    )
  }

  dislike(id : any) {
    return this.http.get(`${environment.apiUrl}api/dislike/${id}`).pipe(
      tap(
        (res: any) => {
          console.log(res);
        }
      )
    )
  }

  commentPost(id : any, content : any) {
    return this.http.post(`${environment.apiUrl}api/comment/${id}`, {comment : content}).pipe(
      tap(
        {
          next: (res: any) => {
            console.log(res);
          },
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    )
  }

  uploadImage(file: any, description: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    return this.http.post(`${environment.apiUrl}api/upload`, formData).pipe(
      tap(
        {
          next: (res: any) => {
            console.log(res);
          },
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    );
  }



  formatDate(date: any) {
    
    const fechaHora = date; // Tu fecha y hora en formato ISO

    // Parseamos la fecha y hora
    const fecha = new Date(fechaHora);
    const ahora = new Date();

    // Calculamos la diferencia en milisegundos
    const diferencia = ahora.getTime() - fecha.getTime();

    // Convertimos la diferencia a segundos
    const segundos = Math.floor(diferencia / 1000);

    // Formateamos la diferencia según tus requerimientos
    let formatoDiferencia = '';
    if (segundos >= 604800) {
      formatoDiferencia = `${Math.floor(segundos / 604800)} w`;
    }
    else if (segundos >= 86400) {
      formatoDiferencia = `${Math.floor(segundos / 86400)} d`;
    }
    else if (segundos >= 3600) {
      formatoDiferencia = `${Math.floor(segundos / 3600)} h`;
    } else if (segundos >= 60) {
      formatoDiferencia = `${Math.floor(segundos / 60)} m`;
    } else {
      formatoDiferencia = `${segundos} s`;
    }
    return formatoDiferencia;
  }

}
