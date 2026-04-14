
import { NotificaDto } from "../Dto/NotificaDto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AbstractService } from "./abstract-service";

@Injectable({
  providedIn: 'root'
})
export class NotificaService extends AbstractService<NotificaDto>{
  
  constructor(http: HttpClient) {
    super(http);
    this.type = 'Notifica';
     const baseProjectUrl = this.baseUrl + '/' + this.type;
  }

  getNotificaByTitolo(titolo: string): Observable<NotificaDto> {
    const url = `${this.baseUrl}/${this.type}/FindByTitolo?titolo=${titolo}`;
    return this.http.get<NotificaDto>(url);
  }

  getCountMessaggioLength(titolo: string): Observable<number> {
    const url = `${this.baseUrl}/${this.type}/CountMessaggioLength?titolo=${titolo}`;
    return this.http.get<number>(url);
  }

  getNotificheByTipo(tipo: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByTipo?tipo=${tipo}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByPriorita(priorita: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByPriorita?priorita=${priorita}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByLetta(letta: boolean): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByLetta?letta=${letta}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByTitoloAndTipo(titolo: string, tipo: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByTitoloAndTipo?titolo=${titolo}&tipo=${tipo}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByDataCreazioneAfter(data: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByDataCreazioneAfter?data=${data}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByMessaggioContaining(messaggio: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByMessaggioContaining?messaggio=${messaggio}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByLettaNative(letta: boolean): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByLettaNative?letta=${letta}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByDataCreazioneAfterNative(data: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByDataCreazioneAfterNative?data=${data}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByTitoloContaining(titolo: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByTitoloContaining?titolo=${titolo}`;
    return this.http.get<NotificaDto[]>(url);
  }

  getNotificheByTipoAndPriorita(tipo: string, priorita: string): Observable<NotificaDto[]> {
    const url = `${this.baseUrl}/${this.type}/FindByTipoAndPriorita?tipo=${tipo}&priorita=${priorita}`;
    return this.http.get<NotificaDto[]>(url);
  }
}
