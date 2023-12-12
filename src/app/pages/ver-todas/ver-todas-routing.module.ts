import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerTodasComponent } from './ver-todas.component';

const routes: Routes = [{ path: '', component: VerTodasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerTodasRoutingModule { }
