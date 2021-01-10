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
    //jasonPaciente = "C:\xampp\htdocs\Coneccion";
    private productUrl = 'api/products/expedientes.json';
  
    constructor(private http: HttpClient) {}
addReceta(receta: IReceta[]) {
    return this.http.post(`${this.baseUrl}/post.php`, receta);
  }
}