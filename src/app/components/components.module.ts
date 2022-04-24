import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEmployeComponent } from './new-employe/new-employe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmployeComponent } from './edit-employe/edit-employe.component';


@NgModule({
  declarations: [
    NewEmployeComponent,
    EditEmployeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    NewEmployeComponent,
    EditEmployeComponent,
  ]
})
export class ComponentsModule { }
