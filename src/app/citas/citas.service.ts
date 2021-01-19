import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ICitas } from './citas';
@Injectable({
    providedIn: 'root'
  })
  export class CitasService {
      baseUrl = "http://localhost/Coneccion/";
      jasonCitas = "http://localhost/Coneccion/citas.json";
    
      constructor(private http: HttpClient) {}

      getCitas(fecha: Date){
        console.log("Entre a la funcion de obbtener citas por día");
        console.log(JSON.stringify(fecha));

        this.http.get(`${this.baseUrl}getCitas.php?Fecha=${JSON.stringify(fecha)}`).subscribe(fecha => {
        console.log(fecha);
        });

        return this.http.get<ICitas[]>(this.jasonCitas).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        );
      }

      updateCita(cita, cita2){
        console.log("Entre a la funcion update cita");
        console.log(cita, cita2);
        return this.http.put(`${this.baseUrl}updateCitas.php?`, cita, cita2).subscribe();
      }

      deleteCita(cita: ICitas){
        console.log("Entre a la funcion borrar citas");
        console.log(cita);
        return this.http.post(`${this.baseUrl}postCita.php?idDoctor=7&idPaciente=10`, cita).subscribe();
      }
      updatePago(cita: ICitas){
        console.log("Entre a la funcion update Pago");
        console.log(cita);
        return this.http.put(`${this.baseUrl}updatePago.php?`, cita).subscribe();
      }
  }