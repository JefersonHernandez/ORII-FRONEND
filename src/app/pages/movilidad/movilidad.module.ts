import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovilidadRoutingModule } from './movilidad-routing.module';
import { MovilidadComponent } from './movilidad.component';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [
    MovilidadComponent
  ],
  imports: [
    CommonModule,
    MovilidadRoutingModule, MaterialModule
  ]
})
export class MovilidadModule { }
