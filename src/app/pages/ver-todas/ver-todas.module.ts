import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerTodasRoutingModule } from './ver-todas-routing.module';
import { VerTodasComponent } from './ver-todas.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    VerTodasComponent
  ],
  imports: [
    CommonModule,
    VerTodasRoutingModule,
    MaterialModule
  ]
})
export class VerTodasModule { }
