import { AutoDto } from '../Dto/AutoDto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root',
})
export class autoService extends AbstractService<AutoDto> {
  constructor(http: HttpClient) {
    super(http);
    this.type = 'Auto';
  }

  findByTarga(targa: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('targa', targa.trim());
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByTarga`, { params });
  }

  findByMarca(marca: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('marca', marca.trim());
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByMarca`, { params });
  }

  findByModello(modello: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('modello', modello);
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByModello`, { params });
  }

  findByMarcaAndModello(marca: string, modello: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('marca', marca).set('modello', modello);
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByMarcaAndModello`, { params });
  }

  findByModelloContaining(modello: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('modello', modello);
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByModelloContaining`, { params });
  }

  findByMarcaStartingWith(marca: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('marca', marca);
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByMarcaStartingWith`, { params });
  }

  findByMarcaEndingWith(marca: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('marca', marca);
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByMarcaEndingWith`, { params });
  }

  findByCarburante(carburante: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('carburante', carburante);
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByCarburante`, { params });
  }

  findByMarcaAndCarburante(marca: string, carburante: string): Observable<AutoDto[]> {
    const params = new HttpParams().set('marca', marca).set('carburante', carburante);
    return this.http.get<AutoDto[]>(`${this.baseUrl}/${this.type}/findByMarcaAndCarburante`, { params });
  }
}
