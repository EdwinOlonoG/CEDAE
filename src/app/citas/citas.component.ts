import { Component, OnInit, ɵgetComponentViewDefinitionFactory } from '@angular/core';
import { ICitas } from './citas';
import { CitasService } from './citas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogInService } from '../log-in/log-in.service';


@Component({
  selector: 'pm-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})

export class CitasComponent implements OnInit {
  viewDoctor = false;
  viewPaciente = false;
  viewRecepcionista = false;
  viewSesion = false;
  viewFarmacia = false;
  citas: ICitas[];
  tableEdit: ICitas[] = [];
  citasPaciente: ICitas[] = [];
  citaEditada;
  citaEditada2: {
    NewHora: string,
    NewDia: Date,
    NewNomDoc: string,
    NewApellidosDoc: string,
  }
  fechaForm: FormGroup;
  EditCitaForm: FormGroup;
  viewCitas = false;
  viewEditar = false;
  constructor(public citasService: CitasService, private fb: FormBuilder, private fb2: FormBuilder, public logInService: LogInService) { }
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
          this.citasService
          .getCitasPaciente(this.logInService.getToken())
          .subscribe({
              next: citasPaciente => {
              this.citasPaciente = citasPaciente;
            }
  })
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
    this.tableEdit.push(cita);
    this.viewEditar = true;
    this.citaEditada = cita;
    console.log(this.citaEditada);
  }
  updateCita(){
    alert("Se guardaron los cambios!");
    this.citaEditada2 = this.EditCitaForm.value;
    console.log(this.citaEditada);
    console.log(this.citaEditada2);
    this.citasService.updateCita(this.citaEditada, this.citaEditada2);
  }
  borrarCita(cita: ICitas){
    alert("Se borro la cita exitosamente!");
    this.citasService.deleteCita(cita);
  }
  updatePago(cita: ICitas){
    this.citasService.updatePago(cita);
  }
}
