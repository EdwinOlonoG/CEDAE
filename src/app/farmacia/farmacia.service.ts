import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Ifarmacia } from './farmacia';



@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {
    baseUrl = "http://localhost/Coneccion/";
    jasonfarmacia = "http://localhost/Coneccion/jasonfarmacia.json"
    constructor(private http: HttpClient) {}

    getfarmaciaAll(){
        this.http.get(`${this.baseUrl}getPacienteDeDoctor.php?idDoctor=7`).subscribe(data => {
            console.log(data);
          });
         
          return this.http.get<Ifarmacia[]>(this.jasonfarmacia).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
          );
    }

    addFarmacia(farmacia: Ifarmacia){
        console.log("Entre a la funcion de enviar farmacia a la base");
    console.log(farmacia);
    return this.http.post(`${this.baseUrl}postReceta.php?idDoctor=7&idPaciente=10`, farmacia).subscribe();
    }
}