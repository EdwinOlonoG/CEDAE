import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrarForm: FormGroup;
  constructor(private fb2:FormBuilder) { }

  ngOnInit(): void {

    this.registrarForm = this.fb2.group
    ({
     Nomb:["",[Validators.required]],
     Apelli:["",[Validators.required]],
     Ed:["",[Validators.required,Validators.min(18)]],
     Tel:["",[Validators.required,Validators.pattern(/^([0-9])*$/)]]
    });
  }
  save(event: Event): void
 {
   event.preventDefault();
   console.log(this.registrarForm.value);
  }
}
