import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from './expediente.service';
import { IExpediente } from './expediente'

@Component({
  selector: 'pm-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {

  _listFilter: string;
  get listFilter(): string{
    return this._listFilter;
}
set listFilter(value: string){
    this._listFilter = value;
    this.filteredExpedientes = this.listFilter ? this.perfomFilter(this.listFilter) : this.expedientes;
}
filteredExpedientes: IExpediente[];
  constructor(public experdienteService: ExpedienteService) { }

  expedientes : IExpediente[] = [];
  ngOnInit(): void {
    this.experdienteService
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
}
  

