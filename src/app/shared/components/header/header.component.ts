import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import {MatTabsModule} from  '@angular/material/tabs' ;
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;
  isAdmin = false;
  private suscription:Subscription= new Subscription();
  @Output() toggleSidenav = new EventEmitter<void>();
  
  @Input()admin: boolean | undefined;

  constructor(private authSvc:AuthService, private router: Router ) {
    
  }
 

  ngOnInit(): void {
    this.suscription.add(
    this.authSvc.isLogged.subscribe((res)=>{
      this.isLogged=res;

    })
    )
    
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  navigateTo(value: any) {
    
    this.router.navigate(['/', value]);

  }
 
}
