import { Component } from '@angular/core';
import { LogInService } from './log-in/log-in.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular: Getting Started';
  public datos: any;
    usuario: {
    TipoUsuario: string;
    id: number;
    Existe: number;
    }
    viewDoctor = false;
    viewPaciente = false;
    viewRecepcionista = false;
    viewSesion = false;
    constructor(public logInService: LogInService) { }
    ngOnInit(){
      /*
      this.logInService.getUserLogged().subscribe({
        next: usuario => {
          this.usuario = usuario;}
        })
        */

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
              //this.viewFarmacia = true;
            }
          }
          i++;
        }
        /*
        console.log(usuario.Existe);
        console.log(usuario.TipoUsuario);
        console.log(usuario.id);
       
        if(usuario.Existe == 1){
          this.viewSesion = true;
          //this.viewSesion = this.usuario.Existe;    
          if(usuario.TipoUsuario == "Doctor")
          {
            this.viewDoctor = true;
          }
          if(usuario.TipoUsuario == "Paciente")
          {
            this.viewPaciente = true;
          }
          if(usuario.TipoUsuario == "Recepcionista")
          {
            this.viewRecepcionista = true;
          }
        }else{
          this.viewSesion = false;
        }
        */
      }
}
