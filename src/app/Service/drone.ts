import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service'; // Controlla che il percorso sia giusto
import { DroneDto } from '../Dto/DroneDto';          // Importa il DTO che hai creato

@Injectable({
  providedIn: 'root'
})
export class DroneService extends AbstractService<DroneDto> {
  
  // Fondamentale: sovrascrivi 'type' per dire al backend 
  // che l'indirizzo è http://localhost:8080/drone
  override type = 'drone'; 

}