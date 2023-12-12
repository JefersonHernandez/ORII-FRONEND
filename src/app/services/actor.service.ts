import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(private http:HttpClient) { }

  registrar(data:any): Observable<any> {
    return this.http.post<any>(`${environment.api}/actor`, data)
    .pipe(
      map((res:any) => {
        console.log("map res",res);
        if(res.error){return null}else{
          return "ok";
        }
      }),
      catchError((err) => this.handleError(err))
    );
  }

  getActorById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.api}/actor/${id}`);
   }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Un error ha ocurrido';
    console.log("error estudiante", error);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Ups! Codigo en uso',
      text:'El codigo ya esta siendo utilizado por un estudiante!'
    })

    if (error) {
      errorMessage = `{Error: ${error.error.message}}`;
    }
    return throwError(errorMessage);
  }

}

