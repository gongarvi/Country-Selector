import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';


@NgModule({
  declarations: [
    HomeComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule
  ]
})
export class GeneralModule { }
