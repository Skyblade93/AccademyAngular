import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service";
import { Observable } from "rxjs";
import { DipendenteDto } from "../Dto/DipendenteDto";

@Injectable({
    providedIn: 'root'
})
export class DipendenteService extends AbstractService<DipendenteDto>{

    private baseProjectUrl: string;

    constructor(http: HttpClient) {
        super(http);
        this.type = 'Dipendente';
        this.baseProjectUrl = this.baseUrl + '/' + this.type;
    }

    getAllDipendenti(): Observable<string> {
        return this.http.get<string>(this.baseUrl + '/' + this.type + '/getall');
    }

    findByNomeDipendenteAndCognomeDipendenteAndNumeroTelefono(
        nome: string, cognome: string, telefono: number
    ): Observable<DipendenteDto> {

        let params = new HttpParams()
            .set('nomeDipendente', nome)
            .set('cognomeDipendente', cognome)
            .set('numeroTelefono', telefono);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByNomeDipendenteAndCognomeDipendenteAndNumeroTelefono`,
            { params }
        );
    }

    findByNomeDipendenteAndCognomeDipendente(
        nome: string, cognome: string
    ): Observable<DipendenteDto> {

        let params = new HttpParams()
            .set('nomeDipendente', nome)
            .set('cognomeDipendente', cognome);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByNomeDipendenteAndCognomeDipendente`,
            { params }
        );
    }

    findByEta(eta: number): Observable<DipendenteDto[]> {
        let params = new HttpParams().set('eta', eta);

        return this.http.get<DipendenteDto[]>(
            `${this.baseProjectUrl}/findByEta`,
            { params }
        );
    }

    findByNumeroTelefono(telefono: number): Observable<DipendenteDto[]> {
        let params = new HttpParams().set('numeroTelefono', telefono);

        return this.http.get<DipendenteDto[]>(
            `${this.baseProjectUrl}/findByNumeroTelefono`,
            { params }
        );
    }

    findByEmail(email: string): Observable<DipendenteDto> {
        let params = new HttpParams().set('email', email);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByEmail`,
            { params }
        );
    }

    findByEmailAndEta(email: string, eta: number): Observable<DipendenteDto> {
        let params = new HttpParams()
            .set('email', email)
            .set('eta', eta);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByEmailAndEta`,
            { params }
        );
    }

    findByNomeDipendenteAndEta(nome: string, eta: number): Observable<DipendenteDto> {
        let params = new HttpParams()
            .set('nomeDipendente', nome)
            .set('eta', eta);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByNomeDipendenteAndEta`,
            { params }
        );
    }

    findByCognomeDipendente(cognome: string): Observable<DipendenteDto> {
        let params = new HttpParams()
            .set('cognomeDipendente', cognome);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByCognomeDipendente`,
            { params }
        );
    }

    findByEmailAndNumeroTelefono(email: string, telefono: number): Observable<DipendenteDto> {
        let params = new HttpParams()
            .set('email', email)
            .set('numeroTelefono', telefono);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByEmailAndNumeroTelefono`,
            { params }
        );
    }

    findByNomeDipendente(nome: string): Observable<DipendenteDto> {
        let params = new HttpParams()
            .set('nomeDipendente', nome);

        return this.http.get<DipendenteDto>(
            `${this.baseProjectUrl}/findByNomeDipendente`,
            { params }
        );
    }

}