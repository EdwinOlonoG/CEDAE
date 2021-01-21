import { Component } from '@angular/core';
import { LogInService } from './log-in/log-in.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular: Getting Started';
  usuario: {
    TipoUsuario: string;
    id: number;
    Existe: boolean;
    }
    viewDoctor = false;
    viewPaciente = false;
    viewRecepcionista = false;
    viewSesion = false;
    constructor(public logInService: LogInService) { }
    ngOnInit(){
      this.logInService.getUserLogged().subscribe({
        next: usuario => {
          this.usuario = usuario;}
        })
        console.log(this.usuario);
        this.viewSesion = this.usuario.Existe;    
        if( this.usuario.TipoUsuario == "Doctor")
        {
          this.viewDoctor = true;
        }
        else if( this.usuario.TipoUsuario == "Paciente")
        {
          this.viewPaciente = true;
        }
        else if(this.usuario.TipoUsuario == "Recepcionista")
        {
          this.viewRecepcionista = true;
        }
      }
    
}
