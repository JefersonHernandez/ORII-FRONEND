import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

   getPaises():Observable<any>{

    return this.http.get<any>(`${environment.api}/paises`);
         
   }

   getCodigos():Observable<any>{

    return this.http.get<any>(`${environment.api}/paises/codigos`);
         
   }
}
