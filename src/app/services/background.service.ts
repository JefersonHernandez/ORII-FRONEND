import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  conClase= true;
  admin1 = false;
  constructor() { }

    getIsActiveClase(){
      return this.conClase;
    }

    setIsActiveClase(){
      this.conClase = !this.conClase;
    }

    getIsAdmin(){
      return this.admin1;
    }

    setIsAdmin(){
      this.admin1 = !this.admin1;
    }
}
