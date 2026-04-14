import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service";
import { HttpClient } from "@angular/common/http";
import { AziendaDto } from "../Dto/AziendaDto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class aziendaService extends AbstractService<AziendaDto>{

  constructor(http: HttpClient){
    super(http);
    this.type = 'Azienda';
    const baseProjectUrl = this.baseUrl + '/' + this.type;
  }

  findByNomeAzienda(nome: string): Observable<AziendaDto>{
   return this.http.get<AziendaDto>(
    `${this.baseUrl}/findByNomeAzienda`+nome
   );
  }

  findByNomeAziendaContainingIgnoreCase(parola: string): Observable<AziendaDto[]>{
    return this.http.get<AziendaDto[]>(
      `${this.baseUrl}/findByNomeAziendaContainingIgnoreCase`+ parola
    );
  }

  findByDescrizioneAziendaContainingIgnoreCase(descrizione: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseUrl}/findByDescrizioneAziendaContainingIgnoreCase`+descrizione
    );
  }

  findByTitolareId(titolare: number): Observable<AziendaDto> {
    return this.http.get<AziendaDto>(
      `${this.baseUrl}/findByTitolare_Id?titolare=${titolare}`
    );
  }

  findByNomeAziendaContaining(parola: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseUrl}/findByNomeAziendaContaining?parola=${parola}`
    );
  }

   cercaPerNome(nome: string): Observable<AziendaDto> {
    return this.http.get<AziendaDto>(
      `${this.baseUrl}/CercaPerNome?nome=${nome}`
    );
  }

  cercaPerDescrizione(descrizione: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseUrl}/CercaPerDescrizione?descrizione=${descrizione}`
    );
  }

  trovaPerDescrizioneNative(descrizione: string): Observable<AziendaDto[]> {
    return this.http.get<AziendaDto[]>(
      `${this.baseUrl}/trovaPerDescrizioneNative?descrizione=${descrizione}`
    );
  }

}
