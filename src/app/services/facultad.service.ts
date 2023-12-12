import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacultadResponse } from '@app/models/facultad.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  constructor(private http: HttpClient) { }

  getProgramasByFacultadId(id:number):Observable<any>{

    return this.http.get<FacultadResponse>(`${environment.api}/facultad/${id}`);
         
   }
}
