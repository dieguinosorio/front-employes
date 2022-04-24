import { Component, OnInit,  } from '@angular/core';
import { Employes } from 'src/app/models/employes';
import { EmployesService } from 'src/app/services/employes.service';
import { ModalService } from 'src/app/services/modal.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public employes:Employes[] = []
  public employedEdit:boolean = false
  public totalEmployes:number = 0
  public employesTemp:Employes[] = []
  public loadData:boolean = false;
  public startPage:number=0
  public criteriaFilter:string = 'first_name'
  constructor(private employesService:EmployesService,private modalService:ModalService) { }

  ngOnInit(): void {
    this.getEmployes()
  }

  get getCriterias(){
    return this.employesService.getCriterias
  }

  getEmployes(){
    this.loadData = true;
    this.employesService.getEmployes(this.startPage).subscribe(({total,employes})=>{
      this.employes = employes
      this.totalEmployes = total
      this.employesTemp = employes
      this.loadData = false;
    })
  }

  editEmploye(employe:Employes){
    this.employedEdit = true
    this.modalService.modalEditShow(employe);
  }

  finishCreated(){
    swal.fire({
      icon:'success',
      text:'El empleado se ha creado correctamente.'
    })
    this.employedEdit = false
    this.getEmployes()
  }

  finishEdit(){
    swal.fire({
      icon:'success',
      text:'El empleado se ha editado correctamente.'
    })
    this.employedEdit = false
    this.getEmployes()
  }

  deleteEmployed(id:string,name:string){
    swal.fire({
      title: `Estas seguro de eliminar a ${name}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employesService.deleteEmploye(id).subscribe(res=>{
          this.getEmployes()
          swal.fire('Eliminado', '', 'success')
        },(error)=>{
          console.log(error)
          swal.fire({icon:'error',text:'Ocurrio un error '})
        })

      } else if (result.isDenied) {
        swal.fire('Cancelado', '', 'info')
      }
    })

  }

  changePage(value:number){
    this.startPage += value;

    if(this.startPage<0){
      this.startPage =0;
    }
    else if(this.startPage > this.totalEmployes){
      this.startPage -= value;
    }
    this.getEmployes()
  }

  searchEmploye(value:string){
    if(value){
      this.employesService.getFilterEmployes(this.criteriaFilter,value).subscribe(res=>{
        this.employes = res.employes
      })
    }
    else{
      this.employes = this.employesTemp
    }
  }

}
