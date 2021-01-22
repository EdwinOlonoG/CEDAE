import { Component, OnInit } from '@angular/core';
import { GenerarCitasService } from './generar-cita.service';
import { ICitas } from '../citas/citas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogInService } from '../log-in/log-in.service';

@Component({
  selector: 'pm-generar-cita',
  templateUrl: './generar-cita.component.html',
  styleUrls: ['./generar-cita.component.css']
})
export class GenerarCitaComponent implements OnInit {

  citaForm: FormGroup;
  cita: ICitas;
  viewDoctor = false;
  viewPaciente = false;
  viewRecepcionista = false;
  viewSesion = false;
  viewFarmacia = false;
  constructor(public fb: FormBuilder, public generarCitasService: GenerarCitasService, public logInService: LogInService) { }

  ngOnInit(): void {
    this.logInService.getUserLogged().subscribe(data => {
      console.log("ando en el component");
      console.log(data);
      console.log("---------------------");
      this.validator(data);
    });
  }
  validator(usuario: object): void{
    console.log("Imprimiendo los datos decodificados ");
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
    this.citaForm = this.fb.group({
      Hora: ["10:00"],
      Fecha:["2021-01-23"],
      Lugar: ["Loma Bonita"],
      NomPac: ["Libertad Garcia"],
      NomDoc:  ["Benjamin"],
      ApellidoDoc:["Dubey"],
      Correo:["libertad@mail.com"],
      Telefono:["13265246"],
    })
  }
  agregarCita(){
    alert("Se agregó la cita");
    var token = this.logInService.getToken();
    console.log(this.citaForm.value);
    this.generarCitasService.addCita(this.citaForm.value, token);
  }
}
