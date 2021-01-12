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
    jasonReceta = "http://localhost/Coneccion/pacientesReceta.json";
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



  getReceta(id: number) { 
    //console.log("Entre a la funcion de receta");
    return this.http.get(`${this.baseUrl}getRecetas.php?id=${id}`);
  }


  getRecetaAll(id:number) { //aqui poner lo get de la receta id----------------------------------------
    console.log("Entre a la funcion de receta");
    this.http.get(`${this.baseUrl}getRecetas.php?id=${id}`).subscribe(id => {
      console.log(id);
    });
   
    return this.http.get<IReceta[]>(this.jasonReceta).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
    );
  }

  enviar(receta: IReceta[]) {
    console.log("Entre a la funcion de enviar receta al correo");
    console.log(receta);
    return this.http.post(`${this.baseUrl}correo.php`, receta).subscribe();
  }
}