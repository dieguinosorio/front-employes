import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { uploadEmployees } from '../interfaces/uploadEmployees';
import { Employes } from '../models/employes';
import { RegisterForm } from '../interfaces/registerForm';
import { UpdateFormEmploye } from '../interfaces/updateForm';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

export class EmployesService {

  constructor(private http:HttpClient) {}

  get getCriterias(){
    return [
      {name:'Primer Nombre',value:'first_name'},
      {name:'Primer Apellido',value:'surname'},
      {name:'Segundo Apellido',value:'second_surname'},
      {name:'Tipo ID',value:'type_id'},
      {name:'# ID',value:'nro_id'},
      {name:'Pais Empledo',value:'country'},
      {name:'Email',value:'email'},
      {name:'Estado',value:'state'}
    ]
  }

  getEmployes(start:number=0){
    const url = `${base_url}/employes?start=${start}`
    return this.http.get<uploadEmployees>(url).pipe(
      map((res:any)=>{
        const total = res.total
        const employes = res.employes.map((employed:Employes)=>{
          const {
            id,
            surname,
            second_surname,
            first_name,
            other_name,
            country,
            type_id,
            nro_id,
            email,
            date_entry,
            department,
            state,
            date_register} = employed
          return new Employes(id,
            surname,
            second_surname,
            first_name,
            other_name,
            country,
            type_id,
            nro_id,
            email,
            date_entry,
            department,
            state,
            date_register)
        })
        return {
          total,
          employes
        }
      })
    )
  }

  getFilterEmployes(criteria:string,filter:string){
    const url = `${base_url}/employes/search/${criteria}/${filter}`
    return this.http.get<uploadEmployees>(url).pipe(
      map((res:any)=>{
        const total = res.total
        const employes = res.employes.map((employed:Employes)=>{
          const {
            id,
            surname,
            second_surname,
            first_name,
            other_name,
            country,
            type_id,
            nro_id,
            email,
            date_entry,
            department,
            state,
            date_register} = employed
          return new Employes(id,
            surname,
            second_surname,
            first_name,
            other_name,
            country,
            type_id,
            nro_id,
            email,
            date_entry,
            department,
            state,
            date_register)
        })
        return {
          total,
          employes
        }
      })
    )
  }

  createEmploye(employed:RegisterForm){
    const url = `${base_url}/employes`
    return this.http.post(url,employed)
  }

  updateEmploye(employed:UpdateFormEmploye,id:string){
    const url = `${base_url}/employes/${id}`
    return this.http.put(url,employed)
  }

  deleteEmploye(id:string){
    const url = `${base_url}/employes/${id}`
    return this.http.delete(url)
  }


}
