import { Component, OnInit } from '@angular/core';
import { LogInService } from '../log-in/log-in.service';

@Component({
  selector: 'pm-sidebar-recepcionista',
  templateUrl: './sidebar-recepcionista.component.html',
  styleUrls: ['./sidebar-recepcionista.component.css']
})
export class SidebarRecepcionistaComponent implements OnInit {
    viewDoctor = false;
    viewPaciente = false;
    viewRecepcionista = false;
    viewSesion = false;
    viewFarmacia = false;
  constructor(public logInService: LogInService) { }

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
  }
  Ocultar():void{
    this.viewRecepcionista = !this.viewRecepcionista;
  }
}
