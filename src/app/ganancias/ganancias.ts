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
  return this.precioCompra > 0 ? this.truncarDosDecimales(this.montoCompra / this.precioCompra) : 0;
  }

  get montoVenta(): number {
    return this.truncarDosDecimales(this.precioVenta * this.cantidadVenta);
  }

  get ganancia(): number {
    return this.truncarDosDecimales(this.montoVenta - this.montoCompra);
  }

  get porcentajeGanancia(): number {
    const inversion = this.montoCompra;
    if (inversion === 0) return 0;
    return this.truncarDosDecimales(((this.ganancia) / inversion) * 100);
  }

  venderTodo() {
  this.cantidadVenta = this.cantidadComprada;
  }

  private truncarDosDecimales(valor: number): number {
    return Math.round(valor * 100) / 100;
  }


}
