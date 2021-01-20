import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ifarmacia } from './farmacia';
import { FarmaciaService } from './farmacia.service';
import { VentasService } from '../ventas/ventas.service';
import { IVentas } from '../ventas/ventas';
@Component({
  selector: 'pm-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {
  agregarMedicamento = false;
  viewVentas = false;
  viewVentas2 = false;
  farmaciaForm: FormGroup;
  fechaForm: FormGroup;
  farmacia: Ifarmacia;
  viewTable = false;
  n: number=1;
  constructor(private fb: FormBuilder,private fb1: FormBuilder, public farmaciaService: FarmaciaService, public ventasService: VentasService) { }
  farmaciaTable: Ifarmacia [] = [];
  ventasTable: Ifarmacia [] = [];
  farmaciaTableCad: Ifarmacia[] = [];
  ventasTable2: IVentas[];
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
      CantidadProd: [0],
      NomProd: ["", [Validators.required]],
      CadProd: ["", [Validators.required]],
      PrecioProd: ["", [Validators.required]],
      ExistenciaProd: ["",[Validators.required]],
    });
    console.log(this.farmaciaTable);
    this.fechaForm = this.fb1.group({
      fecha: [""],
    })
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
    alert("La compra se realizó con exito");
    this.ventasService.addVenta(this.ventasTable);
  }
  verCad(){
    alert("Mostrando los medicamentos con tres meses próximos a caducar.");
    this.viewTable = !this.viewTable;

    this.farmaciaService
      .getfarmaciaCad()
      .subscribe({
        next: farmaciaTableCad => {
          this.farmaciaTableCad = farmaciaTableCad;
        }
    })
  }
  aumento(venta: Ifarmacia){
    if(venta.CantidadProd > 1)
    { 
      venta.CantidadProd = venta.CantidadProd+1;
    }
    else if(venta.CantidadProd == 1)
    {
      venta.CantidadProd = venta.CantidadProd+1;
    }
     else
    {
      venta.CantidadProd = 1;
      
    }
  }
  decremento(venta: Ifarmacia){
    if(venta.CantidadProd == 0)
    {
      return;
    }
    else{
      venta.CantidadProd = venta.CantidadProd - 1;
    }
  }
  verVentas(){
    this.viewVentas2 = true;
    console.log(this.fechaForm.value + "Entrando a consultar ventas");
    this.farmaciaService
      .getVentas(this.fechaForm.value)
      .subscribe({
        next: ventasTable2 => {
          this.ventasTable2 = ventasTable2;
        }
    })
  }
  Pruebaphp(){
    this.farmaciaService.prueba();
  }
}
