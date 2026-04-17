import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service";
import { HttpClient } from "@angular/common/http";
import { AziendaDto } from "../Dto/AziendaDto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class aziendaService extends AbstractService<AziendaDto>{
  private baseProjectUrl: string;

  constructor(http: HttpClient){
    super(http);
    this.type = 'Azienda';
    this.baseProjectUrl = this.baseUrl + '/' + this.type;
  }

  findByNomeAzienda(nome: string): Observable<AziendaDto>{
   return this.http.get<AziendaDto>(
    `${this.baseProjectUrl}/findByNomeAzienda`, {params: {nome:nome}}
   );
  }

  findByNomeAziendaContainingIgnoreCase(parola: string): Observable<AziendaDto[]>{
    return this.http.get<AziendaDto[]>(
      `${this.baseProjectUrl}/findByNomeAziendaContainingIgnoreCase`, {params: {parola: parola}}
    );
  }

  findByDescrizioneAziendaContainingIgnoreCase(descrizione: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseProjectUrl}/findByDescrizioneAziendaContainingIgnoreCase`, {params: {descrizione: descrizione}}
    );
  }

  findByTitolareId(titolare: number): Observable<AziendaDto> {
    return this.http.get<AziendaDto>(
      `${this.baseProjectUrl}/findByTitolare_Id`, {params: {titolare: titolare}}
    );
  }

  findByNomeAziendaContaining(parola: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseProjectUrl}/findByNomeAziendaContaining`, {params: {parola: parola}}
    );
  }

   cercaPerNome(nome: string): Observable<AziendaDto> {
    return this.http.get<AziendaDto>(
      `${this.baseProjectUrl}/CercaPerNome`, {params: {nome: nome}}
    );
  }

  cercaPerDescrizione(descrizione: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseProjectUrl}/CercaPerDescrizione`, {params: {descrizione: descrizione}}
    );
  }

  trovaPerDescrizioneNative(descrizione: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseUrl}/trovaPerDescrizioneNative`, {params: {descrizione: descrizione}}
    );
  }

  getPage(page: number, size: number) {
  return this.http.get<any>(
    `${this.baseProjectUrl}/page`,
    { params: { page, size } }
  );
}


}
