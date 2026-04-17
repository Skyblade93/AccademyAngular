import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DroneDto } from '../Dto/DroneDto';

@Injectable({
  providedIn: 'root'
})
export class DroneService {
  private baseUrl = 'http://localhost:8080/Drone';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DroneDto[]> {
    return this.http.get<DroneDto[]>(`${this.baseUrl}/getall`);
  }

  insert(dto: DroneDto): Observable<DroneDto> {
    return this.http.post<DroneDto>(`${this.baseUrl}/insert`, dto);
  }

  update(dto: DroneDto): Observable<DroneDto> {
    return this.http.put<DroneDto>(`${this.baseUrl}/update`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete?id=${id}`);
  }
}