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
  jasonPaciente = "http://localhost/Coneccion/expedientePaciente.json";
  //jasonPaciente = "C:\xampp\htdocs\Coneccion";
  private productUrl = 'api/products/expedientes.json';

  constructor(private http: HttpClient) {}


  addExpediente(paciente: IGeneradorExpediente) {         //agregar expediente aqui quedo no mover porfavor :D
    console.log("Entre a la funcion de enviar receta a la base");
    console.log(paciente);
    return this.http.post(`${this.baseUrl}postExpediente.php?idDoctor=6&idPaciente=1&idExpediente=1`, paciente).subscribe();
  }
  getExpedienteAll(id:number) {    //aqui tomar la expedientes del id
    console.log("Entre a la funcion");
    console.log(id);
    this.http.get(`${this.baseUrl}getExpedientes`).subscribe(data => {
      console.log(data);
    });
   
    return this.http.get<IGeneradorExpediente[]>(this.jasonPaciente).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
    );
    }
 
}