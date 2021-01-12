import { Component, OnInit } from '@angular/core';
import { IExpediente } from '../expedientes/expediente';
import { IGeneradorExpediente } from '../generador-expediente/generador-expediente';

@Component({
  selector: 'pm-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
