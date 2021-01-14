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
    addVenta(venta: IVentas){
      console.log("Entre a la funcion de ventas");
      console.log(venta);
    return this.http.post(`${this.baseUrl}postReceta.php?idDoctor=7&idPaciente=10`, venta).subscribe();
    }
}