import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Operacion {
  fecha: string;
  montoCompra: number;
  precioCompra: number;
  precioVenta: number;
  cantidad: number;
  ganancia: number;
}

@Component({
  selector: 'app-registro-operaciones',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './ganancias.html',
  styleUrls: ['./ganancias.css']
})
export class GananciasComponent implements OnInit {
  operaciones: Operacion[] = [];

  // Campos del formulario
  montoCompra: number = 0;
  precioCompra: number = 0;
  precioVenta: number = 0;

  ngOnInit() {
    const data = localStorage.getItem('operaciones');
    if (data) {
      this.operaciones = JSON.parse(data);
    }
  }

  agregarOperacion() {
    const cantidad = this.montoCompra / this.precioCompra;
    const montoVenta = cantidad * this.precioVenta;
    const ganancia = montoVenta - this.montoCompra;

    const nuevaOperacion: Operacion = {
      fecha: new Date().toISOString(),
      montoCompra: this.montoCompra,
      precioCompra: this.precioCompra,
      precioVenta: this.precioVenta,
      cantidad,
      ganancia
    };

    this.operaciones.push(nuevaOperacion);
    localStorage.setItem('operaciones', JSON.stringify(this.operaciones));

    // Limpiar
    this.montoCompra = 0;
    this.precioCompra = 0;
    this.precioVenta = 0;
  }

  borrarTodo() {
    if (confirm('¿Estás seguro de borrar todas las operaciones?')) {
      this.operaciones = [];
      localStorage.removeItem('operaciones');
    }
  }

  get balanceTotal(): number {
    return this.operaciones.reduce((acc, op) => acc + op.ganancia, 0);
  }
}
