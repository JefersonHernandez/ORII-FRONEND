import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { BackgroundService } from '@app/services/background.service';
import { EncryptService } from '@app/services/encrypt.service';
import { windowWhen } from 'rxjs';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @Input()admin: boolean | undefined;
  isAdmin = false;
  private suscription:Subscription= new Subscription();
  constructor(private authSvc: AuthService, private router: Router, private backgSvc: BackgroundService, private encSvc:EncryptService) {
    
  }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.suscription.add(
    this.authSvc.isAdmin.subscribe((res)=>{
      this.isAdmin=res;

    })
    )
    
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  
  navigateTo(value: any) {
    
    this.router.navigate(['/', value]);
    console.log("aaaaaaaaaaaaa " + value);
    

  }


}

