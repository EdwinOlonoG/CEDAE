import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from './expediente.service';

@Component({
  selector: 'pm-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {

  
  constructor(
    public id:number,
    public idPaciente:number,
    public nomPac:string,
    public TelPac:number,
    public EdadPac:number,
    public CorreoPac:string,
    public SexoPac:string,
) { }

  ngOnInit(): void {
  }
}

