export class Employes {

  constructor(
    public id:string,
    public surname:string,
    public second_surname:string,
    public first_name:string,
    public other_name:string,
    public country:string,
    public type_id:string,
    public nro_id:string,
    public email:string,
    public date_entry:Date,
    public department:string,
    public state:boolean,
    public date_register:Date
  ){}

  get getNames(){
    return `${this.first_name} ${this.other_name} `
  }

  get getSurNames(){
    return `${this.surname} ${this.second_surname} `
  }

  get departaments(){
    return [
      {name:'seleccione',id:null},
      {name:'Administración',id:'ADM'},
      {name:'Financiera',id:'FI'},
      {name:'Compras',id:'CO'},
      {name:'Infraestructura',id:'IF'},
      {name:'Operación',id:'OP'},
      {name:'Talento Humano',id:'TL'},
      {name:'Servicios Varios',id:'SV'}].sort()
  }

  get getDepartament(){
    try{
      const find_department = (element:any) => element.id === this.department
      const index = this.departaments.findIndex(find_department)
      const objName = this.departaments[index].name
      return objName
    }
    catch(error){
      return 'Sin Definir'
    }
  }

  get dateEntry(){
    const date = new Date(this.date_entry)
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }

  get dateRegister(){
    const date = new Date(this.date_register)
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.toLocaleTimeString()}`
  }




}
