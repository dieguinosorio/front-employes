import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Employes } from 'src/app/models/employes';
import { ModalService } from 'src/app/services/modal.service';
import { EmployesService } from 'src/app/services/employes.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-employe',
  templateUrl: './new-employe.component.html',
  styles: [
  ]
})

export class NewEmployeComponent implements OnInit {

  public formInvalid:boolean = true
  public errorsBack:any[] = []

  public registerForm = this.fb.group({
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

  @Output('created') outputValue:EventEmitter<boolean>= new EventEmitter();

  constructor(private fb:FormBuilder,public modalService:ModalService,private employesService:EmployesService) {

  }

  get f(){
    return this.registerForm.controls
  }

  ngOnInit(): void {
  }

  modalShow(){
    this.modalService.modalShow()
  }

  closeModal(){
    this.modalService.employe = new Employes('','','','','','','','','',new Date(),'',true,new Date())
    this.modalService.hideModal();
  }

  saveEmploye(){
    if(!this.registerForm.valid ){
      this.formInvalid = false
      return
    }

    this.employesService.createEmploye(this.registerForm.value).subscribe((res)=>{
      this.errorsBack = [];
      this.outputValue.emit(true)
      this.closeModal();
    },({error})=>{
      console.log(error.errors)
      this.errorsBack = error.errors
    })
  }

}
