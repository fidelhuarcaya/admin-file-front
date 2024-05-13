import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:9090/api/documentos';

  constructor(private http: HttpClient) { }

  registrarDocumento(documento: FormData): Observable<Documento> {
    return this.http.post<Documento>(this.apiUrl, documento);
  }

  obtenerDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.apiUrl);
  }

  obtenerDocumentoPorId(id: number): Observable<Documento> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Documento>(url);
  }

  actualizarDocumento(documento: Documento): Observable<Documento> {
    const url = `${this.apiUrl}/${documento.id}`;
    return this.http.put<Documento>(url, documento);
  }

  eliminarDocumento(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
