import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './abstract-service'; // Prova con le minuscole se non va
import { DroneDto } from '../Dto/DroneDto';

@Injectable({
  providedIn: 'root'
})
export class DroneService extends AbstractService<DroneDto> {
  // DICHIARA DI NUOVO LA PROPRIETÀ QUI SOPRA
  // Questo risolve l'errore ts(2339) senza toccare l'Abstract
  override type: string = 'Drone'; 

  constructor(http: HttpClient) {
    super(http);
    // Non serve scrivere altro nel costruttore
  }
}