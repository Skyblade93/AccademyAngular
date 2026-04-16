import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElettricistaDto } from '../Dto/elettricistadto';
//controllare bene il service
@Injectable({
  providedIn: 'root'
})
export class ElettricistaService {

  private apiUrl = 'http://localhost:8080/elettricisti';

  constructor(private http: HttpClient) {}

 getAll(): Observable<ElettricistaDto[]> {
  return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/all`);
}
//manc è can
  getById(id: number): Observable<ElettricistaDto> {
  return this.http.get<ElettricistaDto>(`${this.apiUrl}/${id}`);
 }

  //1nome
  getByNome(nome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/nome/${nome}`);
  }

  //2disponibili
  getDisponibili(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/disponibili`);
  }

  //3cognome
  getByCognome(cognome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/cognome/${cognome}`);
  }

  //4specializzazione
  getBySpecializzazione(spec: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/specializzazione/${spec}`);
  }

  //5JPQL nome
  jpqlByNome(nome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/jpql/${nome}`);
  }

  //6JPQLdisponibili
  jpqlDisponibili(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/jpql/disponibili`);
  }

  //7native nome
  nativeByNome(nome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/native/${nome}`);
  }

  //8native disponibili
  nativeDisponibili(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/native/disponibili`);
  }

  //9cognome + disponibile
  getByCognomeDisponibile(cognome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/cognome-disponibile/${cognome}`);
  }

  //10specializz. non disponibili
  getSpecNonDisponibili(spec: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.apiUrl}/spec-non-disponibili/${spec}`);
  }
}