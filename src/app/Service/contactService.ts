import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactDto } from '../Dto/ContactDto';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root',
})

export class ContactService extends AbstractService<ContactDto> {
  
  constructor(http: HttpClient) {
    super(http);
    this.type = 'Contact';  // Deve corrispondere a @RequestMapping("Contact")
  }

  // 🔹 INSERT -> @PostMapping("/insert")
  override insert(dto: ContactDto): Observable<ContactDto> {
    return this.http.post<ContactDto>(`${this.baseUrl}/${this.type}/insert`, dto);
  }

  // 🔹 GET ALL -> @GetMapping("/getAll")
  override getAll(): Observable<ContactDto[]> {
    return this.http.get<ContactDto[]>(`${this.baseUrl}/${this.type}/getAll`);
  }

  // 🔹 GET BY ID -> @GetMapping("/read") con @RequestParam("id")
  override read(id: number): Observable<ContactDto> {
    return this.http.get<ContactDto>(`${this.baseUrl}/${this.type}/read`, {
      params: new HttpParams().set('id', id.toString())
    });
  }

  // 🔹 UPDATE -> @PutMapping("/update")
  override update(dto: ContactDto): Observable<ContactDto> {
    return this.http.put<ContactDto>(`${this.baseUrl}/${this.type}/update`, dto);
  }

  // 🔹 DELETE -> @DeleteMapping("/delete") con @RequestParam("id")
  override delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.type}/delete`, {
      params: new HttpParams().set('id', id.toString())
    });
  }

  // 🔹 CERCA PER EMAIL -> @GetMapping("/findByEmail") con @RequestParam("email")
  findByEmail(email: string): Observable<ContactDto> {
    return this.http.get<ContactDto>(`${this.baseUrl}/${this.type}/findByEmail`, {
      params: new HttpParams().set('email', email)
    });
  }

  // 🔹 CERCA PER NOME -> @GetMapping("/findByNome") con @RequestParam("nome")
  findByNome(nome: string): Observable<ContactDto[]> {
    return this.http.get<ContactDto[]>(`${this.baseUrl}/${this.type}/findByNome`, {
      params: new HttpParams().set('nome', nome)
    });
  }
}