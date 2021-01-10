import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from '../expedientes/expediente.service';
import { ExpedientesComponent } from "../expedientes/expedientes.component"


@Component({
  selector: 'pm-generador-expediente',
  templateUrl: './generador-expediente.component.html',
  styleUrls: ['./generador-expediente.component.css']
})
export class GeneradorExpedienteComponent implements OnInit {
  DatosValue = false;
  HistorialValue = false;
  PronosticoValue = false;

  constructor(public experdienteService: ExpedienteService) { }

  ngOnInit(): void {
  }
 Guardar(/* paciente: ExpedientesComponent */): void{
   this.experdienteService.addExpediente/* (paciente) */
 }
 Borrar(): void{
   alert('¿Seguro que quieres borrar el expediente?');
   alert('Se borró el expediente :c');
 }
}
