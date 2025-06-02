import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './calculadora.html',
  styleUrls: ['./calculadora.css'],
})
export class CalculadoraComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('resultados') resultadosRef!: ElementRef;
  resaltarResultados = false;

  // Escenario 1
  montoInicial1 = 1000;
  porcentaje1 = 5;
  repeticiones1 = 10;
  resultados1: string[] = [];

  // Escenario 2
  montoInicial2 = 1000;
  porcentaje2 = 5;
  repeticiones2 = 10;
  resultados2: string[] = [];
  public lineChartType: 'line' = 'line';


  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Escenario 1',
        borderColor: 'blue',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.3,
      },
      {
        data: [],
        label: 'Escenario 2',
        borderColor: 'red',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Iteraciones' },
      },
      y: {
        title: { display: true, text: 'Monto' },
        beginAtZero: false,
      }
    }
  };

  calcularInteres() {
    this.resultados1 = [];
    this.resultados2 = [];

    const datos1 = this.calcular(this.montoInicial1, this.porcentaje1, this.repeticiones1, this.resultados1);
    const datos2 = this.calcular(this.montoInicial2, this.porcentaje2, this.repeticiones2, this.resultados2);

    const maxIter = Math.max(this.repeticiones1, this.repeticiones2);
    this.chartData.labels = Array.from({ length: maxIter }, (_, i) => `${i + 1}`);
    this.chartData.datasets[0].data = this.fillDataWithNulls(datos1, maxIter);
    this.chartData.datasets[1].data = this.fillDataWithNulls(datos2, maxIter);
    console.log('Escenario 1:', datos1);
    console.log('Escenario 2:', datos2);
    console.log('Labels:', this.chartData.labels);

  
  setTimeout(() => {
      this.resultadosRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }); // un pequeño delay si necesitás esperar a que los datos se rendericen

    this.resaltarResultados = true;
    setTimeout(() => this.resaltarResultados = false);


    this.chart?.update();
  }

  private calcular(montoInicial: number, porcentaje: number, repeticiones: number, resultadoTexto: string[]): number[] {
    const resultados: number[] = [];
    let monto = montoInicial;
    resultadoTexto.push(`Monto Inicial: $${monto.toFixed(2)}`);
    for (let i = 1; i <= repeticiones; i++) {
      monto *= (1 + porcentaje / 100);
      const interes = monto * (porcentaje / 100);
      resultados.push(Number(monto.toFixed(2)));
      resultadoTexto.push(`Iteración ${i}: Interés generado $${interes.toFixed(2)} → Total: $${monto.toFixed(2)}`);
    }
    resultadoTexto.push(`---`);
    resultadoTexto.push(`Total Final: $${monto.toFixed(2)}`);
    return resultados;
  }

  private fillDataWithNulls(data: number[], length: number): (number | null)[] {
    return Array.from({ length }, (_, i) => i < data.length ? data[i] : null);
  }
}
