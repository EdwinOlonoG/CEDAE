import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from './expediente.service';
import { IExpediente } from './expediente'
import { IGeneradorExpediente } from '../generador-expediente/generador-expediente';
import { RecetaService } from '../receta/receta.service';
import { IReceta } from '../receta/Receta';
import { GeneradorExpedienteService } from '..//generador-expediente/generador-expediente.service';
import { LogInService } from '../log-in/log-in.service';

@Component({
  selector: 'pm-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {
  ViewValue = true;
  viewDoctor = false;
  viewPaciente = false;
  viewRecepcionista = false;
  viewSesion = false;
  viewFarmacia = false;
  TablaExpediente: IGeneradorExpediente [] = [];
  TablaReceta: IReceta [] = [];

  _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
}
set listFilter(value: string){
    this._listFilter = value;
    this.filteredExpedientes = this.listFilter ? this.perfomFilter(this.listFilter) : this.expedientes;
}
filteredExpedientes: IExpediente[];
  constructor(public expedienteService: ExpedienteService, public recetaService: RecetaService, 
    public generadorExpedienteService: GeneradorExpedienteService, public logInService: LogInService) { }

  expedientes : IExpediente[] = [];
  ngOnInit(): void {
    this.logInService.getUserLogged().subscribe(data => {
      console.log("ando en el component");
      console.log(data);
      console.log("---------------------");
      this.validator(data);
    });
  }
  validator(usuario: object): void{
    console.log("Imprimiendo los datos decodificados  ");
    console.log(usuario);
    var i=0;
    for (const property in usuario) {
      console.log(`${property}: ${usuario[property]}`);
      if(i==0){
        if(usuario[property]== 1){
          this.viewSesion = true;
        }else{
          this.viewSesion = false;
          break;
        }
      }
      if(i==2){
        if(usuario[property] == "Doctor")
        {
          this.viewDoctor = true;
        }
        if(usuario[property] == "Paciente")
        {
          this.viewPaciente = true;
          this.expedienteService.getExpedientePaciente(this.logInService.getToken()).subscribe({
            next: TablaExpediente => {
              this.TablaExpediente = TablaExpediente;
            }
        });
          this.expedienteService.getRecetaPaciente(this.logInService.getToken()).subscribe({
            next: TablaReceta => {
              this.TablaReceta = TablaReceta;
            }
        });
        }
        if(usuario[property] == "Recepcionista")
        {
          this.viewRecepcionista = true;
        }
        if(usuario[property] == "Farmacia")
        {
          this.viewFarmacia = true;
        }
      }
      i++;
    }
  
    this.expedienteService
      .getExpedienteAll()
      .subscribe({
        next: expedientes => {
          this.expedientes = expedientes;
        }
    })
    console.log(this.expedientes);
  }
  perfomFilter(filterBy: string): IExpediente[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.expedientes.filter((expediente: IExpediente) =>
        expediente.nomPac.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
  toggleValue(): void{
    this.ViewValue = !this.ViewValue;
  }
  Mostrar(idPaciente: number): void{
    console.log(idPaciente);
    this.ViewValue = !this.ViewValue;
    this.recetaService
      .getRecetaAll(idPaciente)
      .subscribe({
        next: TablaReceta => {
          this.TablaReceta = TablaReceta;}
        })
    this.generadorExpedienteService
          .getExpedienteAll(idPaciente)
          .subscribe({
            next: TablaExpediente => {
              this.TablaExpediente = TablaExpediente;}
            })
  }
}
