import { Component, OnInit, ɵgetComponentViewDefinitionFactory } from '@angular/core';
import { ICitas } from './citas';
import { CitasService } from './citas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pm-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})

export class CitasComponent implements OnInit {

  citas: ICitas[];
  citaEditada;
  fechaForm: FormGroup;
  EditCitaForm: FormGroup;
  viewCitas = false;
  viewEditar = false;
  constructor(public citasService: CitasService, private fb: FormBuilder, private fb2: FormBuilder) { }
  persons: any = [];

  ngOnInit(): void {
    this.fechaForm = this.fb.group({
      fecha: [""],
    })
    this.EditCitaForm = this.fb2.group({
      NewHora:["", [Validators.required]],
      NewDia:["", [Validators.required]],
      NewNomDoc:["", [Validators.required]],
      NewApellidosDoc:["", [Validators.required]],
    })
  }
  verCitas(){
    this.viewCitas = true;
    this.citasService
    .getCitas(this.fechaForm.value)
    .subscribe({
      next: citas => {
        this.citas = citas;
      }
  })
  console.log(this.citas);
  }
  editar(cita: ICitas){
    this.viewEditar = true;
    this.citaEditada.Hora = cita.Hora;
    this.citaEditada.Fecha = cita.Fecha;
    this.citaEditada.NomDoc = cita.NomDoc;
    this.citaEditada.ApellidoDoc = cita.ApellidoDoc;
    console.log(this.citaEditada);
  }
  updateCita(){
    alert("Se guardaron los cambios!");
    this.citaEditada = this.EditCitaForm.value;
    console.log(this.citaEditada);
  
  }
  borrarCita(cita: ICitas){
    alert("Se borro la cita exitosamente!");
    this.citasService.deleteCita(cita);
  }
}
