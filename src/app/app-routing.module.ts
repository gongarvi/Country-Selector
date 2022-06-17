import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:"",
        loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)
      },
      {
        path:"stadistics",
        loadChildren: () => import('./stadistics/stadistics.module').then(m => m.StadisticsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
