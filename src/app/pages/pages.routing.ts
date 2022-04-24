import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent ,
    children:[
      { path:'',component: DashboardComponent ,data:{title:'Home'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
