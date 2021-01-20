import { Component, OnInit } from '@angular/core';
import { LogInService } from '../log-in/log-in.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pm-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  constructor(public logInService: LogInService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      Correo: [""],
      Contrasena: [""],
      NomPac: [""],
      TelPac: [""],
      EdadPac: [""],
      SexoPac: [""],
    })
  }
  registrar(){
    this.logInService.registrarUsuario(this.usuarioForm.value).subscribe(data => {
      console.log(data);
    });
  }
}
