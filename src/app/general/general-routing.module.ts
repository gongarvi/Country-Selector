import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadService } from 'src/app/shared/services/preload-service/preload.service';
import { HomeComponent } from 'src/app/general/home/home.component';
import { MapaComponent } from 'src/app/general/mapa/mapa.component';

const routes: Routes = [
  {path:"", resolve: {data:PreloadService}, component: HomeComponent},
  {path: "mapa", resolve: {data:PreloadService}, component: MapaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PreloadService]
})
export class GeneralRoutingModule { }
