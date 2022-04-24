import { Component, Output, EventEmitter} from '@angular/core';
import { Employes } from 'src/app/models/employes';
import { ModalService } from 'src/app/services/modal.service';
import { EmployesService } from 'src/app/services/employes.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  providers:[
    DatePipe
  ]
})
export class EditEmployeComponent {

  public title!:string
  public formInvalid:boolean = true
  public errorsBack:any[] = []
  public idemployed!:string
  public dateEntry!:any;

  public editForm = this.fb.group({
    surname:['',[Validators.required,Validators.minLength(3)]],
    second_surname:['',[Validators.required,Validators.minLength(3)]],
    first_name:['',[Validators.required,Validators.minLength(3)]],
    other_name:[''],
    country:['',[Validators.required]],
    type_id:['',[Validators.required,Validators.minLength(2)]],
    nro_id:['',[Validators.required,Validators.minLength(3)]],
    date_entry:['',[Validators.required]],
    department:['',[Validators.required]],
  })

  constructor(private fb:FormBuilder,public modalService:ModalService,private employesService:EmployesService,private datePipe: DatePipe) {

    this.idemployed = this.modalService.employe.id
    const { date_register,id,email,state, ...objEmploye } = this.modalService.employe;
    this.dateEntry = this.datePipe.transform(objEmploye.date_entry, 'yyyy-MM-dd')?.toString()
    this.title = `Editar Empleado : ${objEmploye.first_name}`
    this.editForm.setValue({ ...objEmploye,...{date_entry:this.dateEntry} });

  }

  @Output('closed') outputValue:EventEmitter<boolean>= new EventEmitter();

  get f(){
    return this.editForm.controls
  }

  closeModal(){
    this.idemployed = ''
    this.modalService.employe = new Employes('','','','','','','','','',new Date(),'',true,new Date())
    this.outputValue.emit(true)
    this.modalService.hideEditModal();
  }

  updateEmploye(){

    if(!this.editForm.valid ){
      this.formInvalid = false
      return
    }

    this.employesService.updateEmploye(this.editForm.value,this.idemployed).subscribe(res=>{
      console.log(res)
      this.errorsBack = [];
      this.outputValue.emit(true)
      this.closeModal();
    },({error})=>{
      console.log(error.errors)
      this.errorsBack = error.errors
    })
  }


}
