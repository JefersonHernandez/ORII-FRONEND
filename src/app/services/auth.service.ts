import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '@app/models/user.interface';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EncryptService } from '@app/services/encrypt.service';
import { BackgroundService } from './background.service';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private isAdminVar = new BehaviorSubject<boolean>(false);
  

  constructor(private http: HttpClient, private router:Router, private encSVC: EncryptService, private backSvc:BackgroundService) {
    this.checkTokenAndRole();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get isAdmin():Observable<boolean>{
    return this.isAdminVar.asObservable();
  }


  login(authData:any): Observable<any> {
    return this.http
      .post<UserResponse>(`${environment.api}/auth/login`, authData)
      .pipe(
        map((res:any) => {
          if(res.role!=authData.role){return null}
          else{
            this.saveToken(res.token);
            localStorage.setItem("UR",this.encSVC.encrypt(res.role))
            localStorage.setItem("UN",this.encSVC.encrypt(res.username))
            this.loggedIn.next(true);
            if(res.role=="admin"){
              console.log("entre y cambie valor con next true a admin")
              this.isAdminVar.next(true);
            }
            
           
            return res;
          }
          
        }),
        catchError((err) => this.handleError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('UR');
    localStorage.removeItem('UN');
    this.loggedIn.next(false);
    this.isAdminVar.next(false);
    this.router.navigate(['/login']);
  }

  private checkTokenAndRole(): void {

    const userToken = localStorage.getItem("token");
    let UR;
    try {
      UR = localStorage.getItem("UR");
      UR = this.encSVC.decrypt(UR);
    } catch (error) {
      UR="user";
    }
    
    const isExpired = helper.isTokenExpired(userToken);
    // console.log("is Expired", isExpired);

    if(isExpired){
      this.logout();
    }else{
      if(UR=="admin"){
        // console.log("is Admin", true);
        this.isAdminVar.next(true);
      }
      this.loggedIn.next(true);
      
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Un error ha ocurrido mientras se recibian los datos';

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
      title: 'Error iniciando su sesión',
      text:'Usuario o Contraseña Incorrectos'
    })

    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
