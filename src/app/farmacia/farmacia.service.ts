import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Ifarmacia } from './farmacia';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { IVentas } from '../ventas/ventas';


@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {
    baseUrl = "http://localhost/Coneccion/";
    jasonfarmacia = "http://localhost/Coneccion/productos.json";
    jasonCaducados = "http://localhost/Coneccion/caducar.json";
    jasonVentas = "http://localhost/Coneccion/ventas.json";
    constructor(private http: HttpClient) {}

    getfarmaciaAll(){
        console.log("Entre para guardar los productos");
        this.http.get(`${this.baseUrl}getProductos.php?Farmacia_idFarmacia=1`).subscribe(data => {
            console.log(data);
          });
          console.log("Obtengo jsn de Productos");
          return this.http.get<Ifarmacia[]>(this.jasonfarmacia).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
          );
    }

    addFarmacia(farmacia: Ifarmacia){
        console.log("Entre a la funcion de enviar farmacia a la base");
    console.log(farmacia);
    return this.http.post(`${this.baseUrl}postProductos.php?Farmacia_idFarmacia=1`, farmacia).subscribe();
    }

    getfarmaciaCad(){
      console.log("Entre para consultar caducidad");
      this.http.get(`${this.baseUrl}caducidad.php`).subscribe(data => {
          console.log(data);
        });
        console.log("Obtengo jsn de Productos caducados");
        return this.http.get<Ifarmacia[]>(this.jasonCaducados).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
        );
  }
  getVentas(dia){   //obtengo las ventas del dia
    console.log("Entre a la funcion de ventas");
this.http.get(`${this.baseUrl}getVentas.php?Fecha=${dia}`).subscribe(dia => {
  console.log(dia);
});

return this.http.get<IVentas[]>(this.jasonVentas).pipe(
  tap(data => console.log('All: ' + JSON.stringify(data))),
);
}
}