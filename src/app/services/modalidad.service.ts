import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  constructor(private http:HttpClient) { }
  registrar(data:any): Observable<any> {
    return this.http.post<any>(`${environment.api}/movilidad_actor`, data)
    .pipe(
      map((res:any) => {
          return res;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  getRecentMovilidad():Observable<any>{

    return this.http.get<any>(`${environment.api}/movilidad_actor/recent`);
         
   }

   getAllMovilidad():Observable<any>{

    return this.http.get<any>(`${environment.api}/movilidad_actor`);
         
   }

   getMovilidadById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.api}/movilidad_actor/id/${id}`);
   }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Un error ha ocurrido';
console.log("error movilidad", error);
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
      title: 'Error de movilidad',
      text:'No se pudo guardar la movilidad, intente nuevamente!'
    })

    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
