import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService<DTO> {
  type: string = ''; // Inizializza come stringa vuota
  port: string = '8080';
  baseUrl = 'http://localhost:' + this.port;

  constructor(protected http: HttpClient) {}

  // Metodo helper per costruire l'URL base del controller
  protected getFullUrl(): string {
    return `${this.baseUrl}/${this.type}`;
  }

  getAll(): Observable<DTO[]> {
    // Aggiunto lo slash prima di getall
    return this.http.get<DTO[]>(`${this.getFullUrl()}/getall`);
  }

  read(id: number): Observable<DTO> {
    return this.http.get<DTO>(`${this.getFullUrl()}/read?id=${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.getFullUrl()}/delete?id=${id}`);
  }

  insert(dto: DTO): Observable<any> {
    return this.http.post(`${this.getFullUrl()}/insert`, dto);
  }

  update(dto: DTO): Observable<DTO> {
    return this.http.put<DTO>(`${this.getFullUrl()}/update`, dto);
  }
}
