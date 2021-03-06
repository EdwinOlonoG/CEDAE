import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICitas } from '../citas/citas';


@Injectable({
  providedIn: 'root'
})
export class GenerarCitasService {
  baseUrl = "http://localhost/Coneccion/";
  jasonCita = "http://localhost/Coneccion/Citas.json";
  //jasonCita = "C:\xampp\htdocs\Coneccion";

  constructor(private http: HttpClient) {}
  addCita(cita: ICitas, token: any){
    console.log("Entre a la funcion de enviar cita a la base");
    console.log(cita);
    console.log(token);
    //return this.http.post(`${this.baseUrl}postCitas.php?id=${token}`, cita).subscribe();
    return this.http.post(`${this.baseUrl}postCitasMultiple.php?id=${token}`, cita).subscribe();
    }
}
