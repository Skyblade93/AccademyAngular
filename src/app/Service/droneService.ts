import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DroneDto } from '../Dto/DroneDto';

@Injectable({
  providedIn: 'root'
})
export class DroneService {
  // 1. URL BASE: Deve essere ESATTAMENTE come il @RequestMapping in Java
  private apiUrl = 'http://localhost:8080/Drone'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<DroneDto[]> {
    // Chiama GET http://localhost:8080/Drone/getall
    return this.http.get<DroneDto[]>(`${this.apiUrl}/getall`);
  }

  insert(drone: DroneDto): Observable<DroneDto> {
    // Chiama POST http://localhost:8080/Drone/insert
    return this.http.post<DroneDto>(`${this.apiUrl}/insert`, drone);
  }

  update(id: number, drone: DroneDto): Observable<DroneDto> {
    // Il tuo Java accetta il DTO nel corpo della PUT senza ID nell'URL
    // Chiama PUT http://localhost:8080/Drone/update
    return this.http.put<DroneDto>(`${this.apiUrl}/update`, drone);
  }

  delete(id: number): Observable<void> {
    // Il tuo Java usa @RequestParam("id"), quindi serve il punto interrogativo
    // Chiama DELETE http://localhost:8080/Drone/delete?id=X
    return this.http.delete<void>(`${this.apiUrl}/delete?id=${id}`);
  }
}