import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ExpedientesComponent } from './expedientes.component';
import { Observable } from 'rxjs';
import { IExpediente } from './expediente';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  baseUrl = "http://localhost/Coneccion/";
  jasonPaciente = "http://localhost/Coneccion/pacientesDeMedico.json";
  //jasonPaciente = "C:\xampp\htdocs\Coneccion";
  private productUrl = 'api/products/expedientes.json';

  constructor(private http: HttpClient) {}

  getExpedienteAll() {
    /*
    this.http.get(`${this.baseUrl}sesion.php`).subscribe(data => {
      console.log(data);
    });
    */
   //return this.http.get<IGeneradorExpediente[]>(`${this.baseUrl}getExpedientes.php?id=${id}`);
    return this.http.get<IExpediente[]>(`${this.baseUrl}getPacienteDeDoctor.php?idDoctor=1`);
    
  }


  

  getExpediente(id: number) {
    return this.http.get(`${this.baseUrl}/get.php?Paciente_idPaciente=${id}`);
  }

  addExpediente(paciente: ExpedientesComponent) {
    return this.http.post(`${this.baseUrl}/post.php`, paciente);
  }

  /* deleteExpediente(paciente: ExpedientesComponent) {
    return this.http.delete(`${this.baseUrl}/delete.php?Paciente_idPaciente=${Paciente.id}`);
  } */

  updateExpediente(paciente: ExpedientesComponent) {
    return this.http.put(`${this.baseUrl}/update.php`, paciente);
  }

  getExpedientePaciente(token: string) {
    return this.http.get(`${this.baseUrl}/get.php?Paciente_idPaciente=${token}`);
  }
}