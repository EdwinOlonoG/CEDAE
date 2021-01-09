import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpedientesComponent } from './expedientes.component';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  baseUrl = "http://localhost/Coneccion/"

  constructor(private http: HttpClient) { }

  getExpedienteAll() {
    return this.http.get(`${this.baseUrl}/getAll.php`);
  }

  getExpediente(id: string | number) {
    return this.http.get(`${this.baseUrl}/get.php?Paciente_idPaciente=${id}`);
  }

  addExpediente(paciente: ExpedientesComponent) {
    return this.http.post(`${this.baseUrl}/post.php`, paciente);
  }

  deleteExpediente(paciente: ExpedientesComponent) {
    return this.http.delete(`${this.baseUrl}/delete.php?Paciente_idPaciente=${paciente.id}`);
  }

  updateExpediente(paciente: ExpedientesComponent) {
    return this.http.put(`${this.baseUrl}/update.php`, paciente);
  }
}