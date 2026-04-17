import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ElettricistaDto } from '../Dto/ElettricistaDto';
import { AbstractService } from './abstract-service';


@Injectable({
  providedIn: 'root'
})
export class ElettricistaService extends AbstractService<ElettricistaDto> {


  constructor( http: HttpClient) {
    super(http);
    this.type = 'elettricisti';
  }

/*
  //1nome
  getByNome(nome: string): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>(`${this.type}/nome/${nome}`);
  }

  //2disponibili
  getDisponibili(): Observable<ElettricistaDto[]> {
    return this.http.get<ElettricistaDto[]>((this.baseUrl + '/' + this.type )+ '/disponibili');
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
    */
}
