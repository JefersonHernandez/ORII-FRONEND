import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovilidadComponent } from './movilidad.component';

const routes: Routes = [{ path: ':id', component: MovilidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovilidadRoutingModule { }
