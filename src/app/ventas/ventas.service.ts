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

    getVentas(dia: Date){   //obtengo las ventas del dia
        console.log("Entre a la funcion de ventas");
    this.http.get(`${this.baseUrl}getVentas.php?Fecha=${dia}`).subscribe(dia => {
      console.log(dia);
    });
   
    return this.http.get<IVentas[]>(this.jasonVentas).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
    );
    }
    addVenta(venta: IVentas[]){   //aplico la venta
      console.log("Entre a la funcion de hacer la venta");
      console.log(venta);
      this.http.post(`${this.baseUrl}postVentas.php?idSucursal=1`, venta).subscribe();
    this.http.get(`${this.baseUrl}updateProductos.php?idSucursal=1`).subscribe(venta => {
      console.log(venta);
    });
    }
}