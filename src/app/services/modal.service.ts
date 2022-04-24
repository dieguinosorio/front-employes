import { Injectable } from '@angular/core';
import { Employes } from '../models/employes';
import { EmployesService } from './employes.service';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public employe!:Employes

  constructor(){}

  private _modalHide:boolean = true
  private _modalEditHide:boolean = true

  get modalHide(){
    return this._modalHide
  }

  get modaltitle(){
    return 'Nuevo Empleado'
  }

  get modalEditHide(){
    return this._modalEditHide
  }

  get modalEdittitle(){
    return  `Editar ${this.employe.getNames}`
  }

  get departaments(){
    const dep_employes = new Employes('','','','','','','','','',new Date(),'',true,new Date)
    return dep_employes.departaments
  }

  modalShow(){
    return this._modalHide = false
  }

  hideModal(){
    return this._modalHide = true
  }

  modalEditShow(employed:Employes){
    this.employe = employed
    return this._modalEditHide = false
  }

  hideEditModal(){
    return this._modalEditHide = true
  }

}
