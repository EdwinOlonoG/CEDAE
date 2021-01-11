import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RecetaComponent } from './receta.component'
import { tap } from 'rxjs/operators';
import { IReceta } from './Receta';



@Injectable({
  providedIn: 'root'
})
export class RecetaService {
    baseUrl = "http://localhost/Coneccion/";
    jasonPaciente = "http://localhost/Coneccion/paciente.json";
    //jasonPaciente = "C:\xampp\htdocs\Coneccion";
    private productUrl = 'api/products/expedientes.json';
  
    constructor(private http: HttpClient) {}
addReceta(receta: IReceta[]) {
  /*
  this.http.get(`${this.baseUrl}postReceta.php?idDoctor=1&idPaciente=1`, receta).subscribe(data => {
    console.log(data);
  });
  */ 
    console.log("Entre a la funcion de enviar receta a la base");
    console.log(receta);
    return this.http.post(`${this.baseUrl}postReceta.php?idDoctor=1&idPaciente=1`, receta).subscribe();
  }
  /*
  this.http.get(`${this.baseUrl}getPacienteDeDoctor.php?idDoctor=3`).subscribe(data => {
    console.log(data);
  });
 
  return this.http.get<IExpediente[]>(this.jasonPaciente).pipe(
    tap(data => console.log('All: ' + JSON.stringify(data))),
  );
  */
  
}