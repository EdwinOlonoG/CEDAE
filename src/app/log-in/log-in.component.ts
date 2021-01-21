import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogInService } from './log-in.service';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'pm-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  LogInForm: FormGroup;
  usuario: {
  TipoUsuario: string;
  id: number;
  Existe: boolean;
  }
  constructor(private fb: FormBuilder, public logInService: LogInService) { }

  ngOnInit(): void {
    this.LogInForm   = this.fb.group({
      User: ["", [Validators.required, Validators.email]],
      Pass: ["", [Validators.required]],
    });
  }
  save(): void{
    alert("Iniciando sesión");
    console.log(this.LogInForm.value);
    console.log("Fuera de la funcion");
    this.logInService.iniciarSesión(this.LogInForm.value).subscribe(data => {
      console.log("ando en el component");
      this.logInService.setToken(data.token);
      console.log(data.token);
    });
    this.logInService.getUserLogged().subscribe({
      next: usuario => {
        this.usuario = usuario;}
      })
      console.log(this.usuario);
  }
  buttondisplay(): void{
    alert('Hola buton');
  }
}
