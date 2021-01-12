import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from './expediente.service';
import { IExpediente } from './expediente'
import { IGeneradorExpediente } from '../generador-expediente/generador-expediente';
import { RecetaService } from '../receta/receta.service';
import { IReceta } from '../receta/Receta';
import { GeneradorExpedienteService } from '..//generador-expediente/generador-expediente.service';

@Component({
  selector: 'pm-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {
  ViewValue = true;
  
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
    public generadorExpedienteService: GeneradorExpedienteService) { }

  expedientes : IExpediente[] = [];
  ngOnInit(): void {
    this.expedienteService
      .getExpedienteAll()
      .subscribe({
        next: expedientes => {
          this.expedientes = expedientes;
        }
    })
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
    this.recetaService
      .getRecetaAll(idPaciente)
      .subscribe({
        next: TablaReceta => {
          TablaReceta = TablaReceta;}
        })
    this.generadorExpedienteService
          .getExpedienteAll(idPaciente)
          .subscribe({
            next: TablaExpediente => {
              TablaExpediente = TablaExpediente;}
            })
  }
}
