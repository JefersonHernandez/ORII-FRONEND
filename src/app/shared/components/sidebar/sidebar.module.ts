import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '@app/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MaterialModule, NgbModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
