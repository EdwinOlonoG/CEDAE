import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IReceta } from './Receta';
import { RecetaService } from "./receta.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



@Component({
  selector: 'pm-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  
  RecetaForm: FormGroup;
  Receta: IReceta[];
  n: number;
  titulo = 'Generar PDF con Angular JS 5';
  imagen1 = 'assets/images/cedae.png';
  imagen2 = 'assets/images/flecha.png';
  imagen3 = 'assets/images/hammer.png';
  constructor(private fb: FormBuilder, public recetaService: RecetaService) { this.Receta = [], this.n=-1}

  ngOnInit(): void {
    this.RecetaForm   = this.fb.group({
      Medicamento: ["", [Validators.required,]],
      Dosis: ["", [Validators.required]],
      Indicaciones: ["", [Validators.required]],
      Correo: ["",[Validators.required]],
    });
  }
  save(): void{
    this.n = this.n+1;
   
    this.Receta.push(this.RecetaForm.value);
    this.Receta[this.n].id = this.n;
    console.log(JSON.stringify(this.RecetaForm.value));
  }
  clear(): void{
    this.RecetaForm   = this.fb.group({
      Medicamento: ["", [Validators.required,]],
      Dosis: ["", [Validators.required]],
      Indicaciones: ["", [Validators.required]],
    });
  }
  enviar(): void{
    alert('Enviando la receta a la BD');
    console.log(this.Receta);
    this.recetaService.addReceta(this.Receta);
  }
  eliminar(id:number): void{
    console.log(id);
    this.Receta.splice(id);
    
  }
  generarPDF(){
    html2canvas(document.getElementById('contenido'),{

        allowTaint: true,
        useCORS: false,
        scale: 1
    }).then(function(canvas){
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'PNG',7, 20, 195, 105);
      doc.save('Receta.pdf');
    });
  }
  enviarCorreo(): void{
    alert('enviando al correo');
    this.recetaService.enviar(this.RecetaForm.value);
  }
}
