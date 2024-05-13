// Primero, creamos el servicio. Vamos a llamarlo MiServicio.
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private accionRealizadaSource = new Subject<string>();

  // Observable string streams
  accionRealizada$ = this.accionRealizadaSource.asObservable();

  // Método para ejecutar la acción
  realizarAccion(mensaje: string) {
    this.accionRealizadaSource.next(mensaje);
  }
}
