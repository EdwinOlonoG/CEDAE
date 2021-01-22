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
        console.log("Entre a la funcion  de obbtener citas por día");
        console.log(JSON.stringify(fecha));
       
        return this.http.get<ICitas[]>(`${this.baseUrl}getCitas.php?Fecha=${JSON.stringify(fecha)}`);
        /*
        return this.http.get<ICitas[]>(this.jasonCitas).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        );*/
      }

      updateCita(cita, cita2){
        console.log("Entre a la funcion update cita");
        console.log(cita, cita2);
        
        let obj_unidos = Object.assign(cita, cita2);
        console.log(obj_unidos);
        return this.http.put(`${this.baseUrl}updateCitas.php?`, obj_unidos).subscribe();
      }

      deleteCita(cita){
        console.log("Entre a la funcion borrar citas");
        console.log(cita);
        var n = cita.idCitas;
        console.log(n);
        return this.http.delete(`${this.baseUrl}deleteCita.php?id=${n}`).subscribe();
      }
      
      updatePago(cita: ICitas){
        console.log("Entre a la funcion update Pago");
        console.log(cita);
        return this.http.put(`${this.baseUrl}updatePago.php?`, cita).subscribe();
      }
      getCitasPaciente(token: string): any{
        return this.http.get<ICitas[]>(`${this.baseUrl}getCitasIdPaciente.php?id=${token}`);
      }

  }