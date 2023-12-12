import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { EncryptService } from '@app/services/encrypt.service';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements OnInit{
  user:any;
  role:any;
 
  constructor(private authSvc:AuthService, private encSvc: EncryptService) {
    
   
    
  }
  ngOnInit(): void {
    let temp:any = localStorage.getItem("UN");
    this.user = this.encSvc.decrypt(temp);
    let tempRol:any = localStorage.getItem("UR");
    this.role = this.encSvc.decrypt(tempRol);
  }

  

  onLogout():void{
    this.authSvc.logout();
  }
}
