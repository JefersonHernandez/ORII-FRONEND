import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthService } from './services/auth.service';
import { BackgroundService } from './services/background.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ori-app';
  isLogged=false;
  
  administrador=false;
 
  
  constructor(private authSvc:AuthService, private backgSvc: BackgroundService) {
  
  }

 

  ngOnInit(): void {
    this.authSvc.isLogged.subscribe((res: boolean)=>{
      this.isLogged=res;
    })
    
    this.authSvc.isAdmin.subscribe((res: boolean)=>{
      this.administrador = res;
    })
  }

  
}
