import { Component } from '@angular/core';
import { CalculadoraComponent } from './calculadora/calculadora';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculadoraComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  darkMode = false;

  constructor(){
    const savedTheme = localStorage.getItem('theme');
    this.darkMode = savedTheme === 'dark';

    document.body.className = this.darkMode ? 'dark' : 'light';
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.className = this.darkMode ? 'dark' : 'light';

    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }
}
