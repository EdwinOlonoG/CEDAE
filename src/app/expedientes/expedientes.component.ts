import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from './expediente.service';
import { IExpediente } from './expediente'

@Component({
  selector: 'pm-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {

  
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
  
}
  

