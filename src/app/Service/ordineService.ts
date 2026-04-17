
import { OrdineDto } from "../Dto/OrdineDto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AbstractService } from "./abstract-service";

@Injectable({
  providedIn: 'root'
})
export class ordineService extends AbstractService<OrdineDto>{

  constructor(http: HttpClient) {
    super(http);
    this.type = 'Ordine';
     const baseProjectUrl = this.baseUrl + '/' + this.type;

  }

    findById(id: number): Observable<OrdineDto> {
        return this.http.get<OrdineDto>(this.baseUrl + '/' + this.type + '/findById?id='+ id);
    }

    deleteById(id: number): Observable<OrdineDto> {
        return this.http.delete<OrdineDto>(this.baseUrl + '/' + this.type + '/delete?id='+ id);
    }

    trovaConCostoUguale(costo: number): Observable<OrdineDto[]> {
        return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/trovaConCostoUguale?costo='+ costo);
    }

    trovaConNumeroProdottiMaggiore(num_prodotti: number): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/trovaConNumeroProdottiMaggiore?num_prodotti='+ num_prodotti);
  }

  trovaConIndirizzo(indirizzo: string): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/trovaConIndirizzo?indirizzo=' + indirizzo);
  }

  trovaConCostoMaggiore(costo: number): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/trovaConCostoMaggiore?costo='+ costo);
  }

  trovaConCostoMinore(costo: number): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/trovaConCostoMinore?costo='+ costo);
  }

  trovaPerUtente(utente: number): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/trovaPerUtente?utente='+ utente);
  }

  filtro(numero: number, costo: number): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/filtro?numero='+ numero +'&costo='+ costo);
  }

  ordinaPerCostoDecrescente(): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/ordinaPerCostoDecrescente');
  }

  trovaTraDueCosti(min: number, max: number): Observable<OrdineDto[]> {
    return this.http.get<OrdineDto[]>(this.baseUrl + '/' + this.type + '/trovaTraDueCosti?min='+ min +'&max='+ max);
  }

}
