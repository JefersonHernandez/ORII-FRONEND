import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CarouselComponent } from "../../shared/components/carousel/carousel.component";


@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        CarouselComponent
    ]
})
export class AdminModule { }
