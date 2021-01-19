import { Component, OnInit } from '@angular/core';
import { GenerarCitasService } from './generar-cita.service';
import { ICitas } from '../citas/citas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pm-generar-cita',
  templateUrl: './generar-cita.component.html',
  styleUrls: ['./generar-cita.component.css']
})
export class GenerarCitaComponent implements OnInit {

  citaForm: FormGroup;
  cita: ICitas;
  constructor(public fb: FormBuilder, public generarCitasService: GenerarCitasService) { }

  ngOnInit(): void {
    this.citaForm = this.fb.group({
      Hora: [""],
      Fecha:[""],
      Lugar: [""],
      NomPac: [""],
      NomDoc:  [""],
    })
  }
  agregarCita(){
    alert("Se agregó la cita");
    console.log(this.citaForm.value);
    this.generarCitasService.addCita(this.citaForm.value);
  }
}
