import { Component, OnInit } from '@angular/core';
import { IVentas } from './ventas';
import { VentasService } from './ventas.service';
import { FarmaciaComponent } from '../farmacia/farmacia.component';

@Component({
  selector: 'pm-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(public ventasService: VentasService) { }
  ventasTable: IVentas[];
  dia = new Date(2021,1,5)
  ngOnInit(): void {
    this.ventasService
      .getVentas(this.dia)
      .subscribe({
        next: ventasTable => {
          this.ventasTable = ventasTable;
        }
    })
    
  }

}
