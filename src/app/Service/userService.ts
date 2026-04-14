
import { UserDto } from "../Dto/UserDto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";;
import { AbstractService } from "./abstract-service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class userService extends AbstractService<UserDto>{

=======

export class userService extends AbstractService<UserDto>{
>>>>>>> develop
  constructor(http: HttpClient) {
    super(http);
    this.type = 'User';
  }

   // GET /findByNome?nome=...
  findByNome(nome: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/findByNome`+ nome );
  }


  // GET /trovaTramiteiniziale?find=...
  trovaTramiteIniziale(lettera: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/trovaTramiteiniziale`+lettera);
  }

  // GET /urldb
  getUrlDb(): Observable<string> {
    return this.http.get(`${this.baseUrl}/urldb`, { responseType: 'text' });
  }



}
