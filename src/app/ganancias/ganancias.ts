import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ganancias',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './ganancias.html',
  styleUrls: ['./ganancias.css']
})
export class GananciasComponent {
  // Compra
  precioCompra: number = 0;
  montoCompra: number = 0;

  // Venta
  precioVenta: number = 0;
  cantidadVenta: number = 0;

  // Calculados
  get cantidadComprada(): number {
    return this.precioCompra > 0 ? this.montoCompra / this.precioCompra : 0;
  }

  get montoVenta(): number {
    return this.precioVenta * this.cantidadVenta;
  }

  get ganancia(): number {
    return this.montoVenta - this.montoCompra;
  }
}
