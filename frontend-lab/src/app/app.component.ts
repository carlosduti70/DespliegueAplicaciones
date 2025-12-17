import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nombreUsuario: string = '';
  respuestaServidor: string = '';
  apiUrl = 'http://localhost:3000/api/saludar';
  // apiUrl = '/api/saludar'; // NOTA: No ponemos localhost:3000, usamos ruta relativa gracias a Nginx

  constructor(private http: HttpClient) { }

  enviarSaludo() {
    const body = { nombre: this.nombreUsuario };
    this.http.post<any>(this.apiUrl, body).subscribe({
      next: (res) => {
        this.respuestaServidor = res.mensaje;
      },
      error: (err) => {
        this.respuestaServidor = 'Error conectando con el backend';
        console.error(err);
      }
    });
  }
}
