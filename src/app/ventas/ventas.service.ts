import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IVentas } from './ventas';



@Injectable({
  providedIn: 'root'
})
export class VentasService {
    baseUrl = "http://localhost/Coneccion/";
    jasonVentas = "http://localhost/Coneccion/ventas.json";

    constructor(private http: HttpClient) {}

    getVentas(dia: Date){
        console.log("Entre a la funcion de ventas");
    this.http.get(`${this.baseUrl}getRecetas.php?id=${dia}`).subscribe(dia => {
      console.log(dia);
    });
   
    return this.http.get<IVentas[]>(this.jasonVentas).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
    );
    }
}