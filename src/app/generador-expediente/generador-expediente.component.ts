import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { GeneradorExpedienteService } from './generador-expediente.service';
import { IGeneradorExpediente } from './generador-expediente';

@Component({
  selector: 'pm-generador-expediente',
  templateUrl: './generador-expediente.component.html',
  styleUrls: ['./generador-expediente.component.css']
})
export class GeneradorExpedienteComponent implements OnInit {
  DatosValue = false;
  HistorialValue = false;
  PronosticoValue = false;
  ExpedienteForm: FormGroup;
  Expediente: IGeneradorExpediente;

  constructor( private fb: FormBuilder, public expedienteService: GeneradorExpedienteService){ }

  ngOnInit(): void
  {
    this.ExpedienteForm = this.fb.group({
      Nombre: ["",[Validators.required]],
      NSS:["",[Validators.required,Validators.pattern(/^([0-9])*$/)]],
      Edad:["",[Validators.required,Validators.min(18)]],
      Domicilio:["",[Validators.required,Validators.maxLength(200)]],
      Nacionalidad:["",[Validators.required]],
      Genero:["",[Validators.required]],
      Telefono:["",[Validators.required,Validators.pattern(/^([0-9])*$/)]],
      Correo:["",[Validators.required,Validators.email]],
     });
  }
 Guardar(/* paciente: ExpedientesComponent */): void{
   this.Expediente = this.ExpedienteForm.value;
   this.expedienteService.addExpediente(this.Expediente);/* (paciente) */
 }
 Borrar(): void{
   alert('¿Seguro que quieres borrar el expediente?');
   alert('Se borró el expediente :c');
 }
 save(event: Event): void
 {
   event.preventDefault();
   console.log(this.ExpedienteForm.value);
  }
}
