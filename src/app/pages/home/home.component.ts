import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '@app/services/background.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private backSvc:BackgroundService){}

  ngOnInit(): void {
    this.backSvc.setIsActiveClase();
    console.log("Backgound activo desde dash ", this.backSvc.getIsActiveClase())
  }

}
