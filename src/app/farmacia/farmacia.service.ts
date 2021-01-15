import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Ifarmacia } from './farmacia';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';



@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {
    baseUrl = "http://localhost/Coneccion/";
    jasonfarmacia = "http://localhost/Coneccion/productos.json"
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
}