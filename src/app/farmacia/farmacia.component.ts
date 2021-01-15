import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ifarmacia } from './farmacia';
import { FarmaciaService } from './farmacia.service';
import { VentasService } from '../ventas/ventas.service';
@Component({
  selector: 'pm-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {
  agregarMedicamento = false;
  viewVentas = false;
  farmaciaForm: FormGroup;
  farmacia: Ifarmacia;
  
  constructor(private fb: FormBuilder, public farmaciaService: FarmaciaService, public ventasService: VentasService) { }
  farmaciaTable: Ifarmacia [] = [];
  ventasTable: Ifarmacia [] = [];
  ngOnInit(): void {
    
    this.farmaciaService
      .getfarmaciaAll()
      .subscribe({
        next: farmaciaTable => {
          this.farmaciaTable = farmaciaTable;
        }
    })
    console.log(this.farmaciaTable);
    this.farmaciaForm   = this.fb.group({
      NomProd: ["", [Validators.required]],
      CadProd: ["", [Validators.required]],
      PrecioProd: ["", [Validators.required]],
      ExistenciaProd: ["",[Validators.required]],
    });
    console.log(this.farmaciaTable);
    /*  */
  }
  Agregar(): void {
    this.agregarMedicamento = !this.agregarMedicamento;
  }
  save(): void{
    console.log(this.farmaciaForm.value);
    alert("Se agregó a la bd");
    this.farmacia = this.farmaciaForm.value;
    this.farmacia.Farmacia_idFarmacia = 1;
    this.farmacia.Farmacia_Sucursal_idSucursal = 1;
    this.farmacia.idProductos = 2;
    this.farmaciaService.addFarmacia(this.farmacia);
  }
  venta(farmacia: Ifarmacia): void{
    alert("Se agregó al carrito");
    this.viewVentas = true;
    this.ventasTable.push(farmacia);    
  }
  enviar(){
    this.ventasService.addVenta(this.ventasTable);
  }
}
