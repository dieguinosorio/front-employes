import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

const routes:Routes =[
  { path:'',redirectTo: '/dashboard', pathMatch:'full' },
  //{ path:'**',component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule,
    PagesRoutingModule,
  ]
})
export class AppRoutingModule { }
