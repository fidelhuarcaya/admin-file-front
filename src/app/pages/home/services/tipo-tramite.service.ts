import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTramite } from '../interfaces/home.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoTramiteService {
  private apiUrl = 'http://localhost:9090/api/tipos-tramites';

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<TipoTramite[]> {
    return this.http.get<TipoTramite[]>(this.apiUrl);
  }

}