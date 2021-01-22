import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogInService {
    baseUrl = "http://localhost/Coneccion/";
    jasonSesion = "http://localhost/Coneccion/tokens.json";
    jason = "http://localhost/Coneccion/se.json";
    
    constructor(private http: HttpClient, private cookies: CookieService) {}

    iniciarSesión(logIn: any): Observable<any>{
        console.log("Entre a la funcion de enviar sesión");
        //console.log(logIn);
        return this.http.get(`${this.baseUrl}inicioSesion.php?hola=${JSON.stringify(logIn)}`);
        /*
        console.log("voy por el json");
        return this.http.get<string>(this.jasonSesion).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
          );   */
    }

    setToken(token: string) {
        this.cookies.set("token", token);
        console.log("Guarde el token");
        console.log(token);
      }
      getToken() {
        console.log("Recupero el token");
        return this.cookies.get("token");
    }

    getUserLogged(){
        const token = this.getToken();
        console.log("Le envie el token a funcion decode ");
        console.log(token);
        return this.http.get(`${this.baseUrl}/decodeToken.php?id=${token}`);
        /*
        
        console.log("tomo el json ");
        return this.http.get(this.jason).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
        );*/
      }
    cerrarSesion(){
      this.cookies.delete("token");
      console.log("Cerrando sessión");
      console.log(this.getUserLogged());
      window.location.href="http://localhost:8080/";
    }






    registrarUsuario(registrar: any): Observable<any>{
        console.log("Entre a la funcion de registrar usuario");
        console.log(registrar);
        return this.http.post(`${this.baseUrl}postPaciente.php?`, registrar)
    }
}
