import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarrelloDto } from '../Dto/CarrelloDto';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService extends AbstractService<CarrelloDto> {
  private carrelloUrl = `${this.baseUrl}/Carrello`;

  constructor(http: HttpClient) {
    super(http);
    this.type = 'Carrello';
  }

  findById(id: number): Observable<CarrelloDto> {
    return this.http.get<CarrelloDto>(`${this.carrelloUrl}/findById`, {
      params: new HttpParams().set('id', id),
    });
  }

  findByQuantita(quantita: number): Observable<CarrelloDto[]> {
    return this.http.get<CarrelloDto[]>(`${this.carrelloUrl}/findByQuantita`, {
      params: new HttpParams().set('quantita', quantita),
    });
  }

  cercaPerPrezzoTotale(prezzo: number): Observable<CarrelloDto[]> {
    return this.http.get<CarrelloDto[]>(`${this.getFullUrl()}/cercaPerPrezzoTotale`, {
      params: new HttpParams().set('prezzoTotale', prezzo), // Deve corrispondere a @RequestParam("prezzoTotale")
    });
  }

  cercaPerQuantitaAndPrezzoTotale(qta: number, prezzo: number): Observable<CarrelloDto[]> {
    let params = new HttpParams().set('quantita', qta).set('prezzoTotale', prezzo);
    return this.http.get<CarrelloDto[]>(`${this.getFullUrl()}/cercaPerQuantitaAndPrezzoTotale`, {
      params,
    });
  }

  cercaPerIdAndQuantita(id: number, quantita: number): Observable<CarrelloDto> {
    let params = new HttpParams().set('id', id).set('quantita', quantita);
    return this.http.get<CarrelloDto>(`${this.carrelloUrl}/cercaPerIdAndQuantita`, { params });
  }
}
