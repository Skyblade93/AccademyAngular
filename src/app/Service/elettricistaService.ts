import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElettricistaDto } from '../Dto/ElettricistaDto';


@Injectable({
  providedIn: 'root'
})
export class ElettricistaService {

  private apiUrl = 'http://localhost:8080/elettricisti';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<ElettricistaDto> {
    return this.http.get<ElettricistaDto>(`${this.apiUrl}/${id}`);
  }

  getByNome(nome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/nome/${nome}`);
  }

  getDisponibili(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/disponibili`);
  }

  getByCognome(cognome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/cognome/${cognome}`);
  }

  getBySpecializzazione(spec: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/specializzazione/${spec}`);
  }

  jpqlByNome(nome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/jpql/${nome}`);
  }

  jpqlDisponibili(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/jpql/disponibili`);
  }

  nativeByNome(nome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/native/${nome}`);
  }

  nativeDisponibili(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/native/disponibili`);
  }

  getByCognomeDisponibile(cognome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/cognome-disponibile/${cognome}`);
  }

  getSpecNonDisponibili(spec: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/spec-non-disponibili/${spec}`);
  }
}
