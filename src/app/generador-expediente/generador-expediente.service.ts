import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GeneradorExpedienteComponent } from './generador-expediente.component';
import { Observable } from 'rxjs';
import { IGeneradorExpediente } from './generador-expediente';
import { tap } from 'rxjs/operators';
import { IExpediente } from '../expedientes/expediente';



@Injectable({
  providedIn: 'root'
})
export class GeneradorExpedienteService {
  baseUrl = "http://localhost/Coneccion/";
  jasonPaciente = "http://localhost/Coneccion/pacientesDeMedico.json";
  //jasonPaciente = "C:\xampp\htdocs\Coneccion";
  private productUrl = 'api/products/expedientes.json';

  constructor(private http: HttpClient) {}


  addExpediente(paciente: IGeneradorExpediente) {         //agregar expediente aqui
    return this.http.post(`${this.baseUrl}/post.php`, paciente);
  }
  getExpedienteAll(id:number) {

    this.http.get(`${this.baseUrl}getPacienteDeDoctor.php?idDoctor=6`).subscribe(data => {
      console.log(data);
    });
   
    return this.http.get<IGeneradorExpediente[]>(this.jasonPaciente).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
    );
    }
 
}