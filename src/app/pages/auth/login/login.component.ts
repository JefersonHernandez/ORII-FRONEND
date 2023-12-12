import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';


import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { environment } from '@env/environment';
import { UserResponse } from '@app/models/user.interface';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { BackgroundService } from '@app/services/background.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isOri = false;
  hide = false;
  private isValidEmail = /\S+@\S+\.\S+/;
  private suscription: Subscription = new Subscription();
  loginForm = this.fb.group({
    email: ['',[Validators.required, Validators.pattern(this.isValidEmail)]],
    password: ['',[Validators.required, Validators.minLength(4)]],
    role: [''],
  })
  @Output() onClickOri = new EventEmitter<void>();

  constructor(private authSvc: AuthService, private fb:FormBuilder, private router:Router, private backSvc:BackgroundService) {}


  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onClick(): void {
    this.onClickOri.emit();
  }

  onLoginFacultad():void{
    if(this.loginForm.invalid){
       const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
             Toast.fire({
              icon: 'error',
              title: 'Formulario invalido',
              text:'Uno o mas campos no son correctos!'
            })

            return;
    }
      const formValue = this.loginForm.value;
      formValue.role="user";
      console.log("di click funciono");
      this.suscription.add(
     
        this.authSvc.login(formValue).subscribe(res=>{
          if(res!=null){
            this.backSvc.setIsActiveClase();
           return this.router.navigateByUrl('/home');
           
          }else{
            console.log("redireccione");
            
            this.router.navigateByUrl("/login");
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            return Toast.fire({
              icon: 'error',
              title: 'Error iniciando su sesión',
              text:'Compruebe si esta accediendo desde el formulario acorde a su Rol, o en su defecto, revise sus credenciales!'
            })
  
             
          }
        })
     );
      
  }

  onLoginOri():void{
    if(this.loginForm.invalid){
      const Toast = Swal.mixin({
             toast: true,
             position: 'top-end',
             showConfirmButton: false,
             timer: 6000,
             timerProgressBar: true,
             didOpen: (toast) => {
               toast.addEventListener('mouseenter', Swal.stopTimer)
               toast.addEventListener('mouseleave', Swal.resumeTimer)
             }
           })
           
            Toast.fire({
             icon: 'error',
             title: 'Formulario invalido',
             text:'Uno o mas campos no son correctos!'
           })

           return;
   }
    const formValue = this.loginForm.value;
    formValue.role="admin";
    this.suscription.add(
      this.authSvc.login(formValue).subscribe(res=>{
        if(res!=null){
          
          this.backSvc.setIsActiveClase();
          
          return this.router.navigateByUrl('/admin');
          
        }else{
          this.router.navigateByUrl("/login");
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          return Toast.fire({
            icon: 'error',
            title: 'Error iniciando su sesión',
            text:'Compruebe si esta accediendo desde el formulario acorde a su Rol, o en su defecto, revise sus credenciales!'
          })

        }
        
       
      })
    )
  }


 getErrorMessage(field:string): string{
  let message='';
   if(this.loginForm.get(field)?.hasError('pattern')){
    message="No es un email valido";
   }else if(this.loginForm.get(field)?.hasError('minlength')){
    message="El campo debe tener al menos 4 caracteres";
   }else if(this.loginForm.get(field)?.errors){
    message="Debes ingresar un valor";
   }

   return message;
 }


 isValidFill(field:string):boolean|undefined{
    return ((this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && !this.loginForm.get(field)?.valid);
 }



}
