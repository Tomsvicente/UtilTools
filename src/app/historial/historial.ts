import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Registro {
  monto: number;
  fecha: Date;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class HistorialComponent {
  registros: Registro[] = [];
  nuevoMonto: number | null = null;

  constructor() {
    const guardado = localStorage.getItem('historial');
    if (guardado) {
      this.registros = JSON.parse(guardado);
    }
  }

  agregarRegistro() {
    if (this.nuevoMonto === null) return;

    const nuevo = {
      monto: this.nuevoMonto,
      fecha: new Date()
    };
    this.registros.push(nuevo);
    this.nuevoMonto = null;
    this.guardar();
  }

  eliminarRegistro(index: number) {
    this.registros.splice(index, 1);
    this.guardar();
  }

  get balanceTotal(): number {
    return this.registros.reduce((acc, r) => acc + r.monto, 0);
  }

  guardar() {
    localStorage.setItem('historial', JSON.stringify(this.registros));
  }
}
