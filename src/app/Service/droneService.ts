import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service";
import { DroneDto } from "../Dto/DroneDto";

@Injectable({
  providedIn: 'root'
})
export class DroneService extends AbstractService<DroneDto> {

  constructor(http: HttpClient) {
    // Inizializziamo la classe padre AbstractService
    super(http);
    
    /**
     * IMPORTANTE: 
     * Impostiamo 'Drone' con la D MAIUSCOLA perché il tuo 
     * controller Java ha @RequestMapping("Drone")
     */
    this.type = 'Drone'; 
  }

  /**
   * Se vuoi usare i metodi specifici che hai nel controller Java 
   * (quelli che non sono nell'Abstract), puoi aggiungerli qui sotto.
   * Ad esempio findByModello:
   */
  findByModello(modello: string) {
    return this.http.get<DroneDto>(`${this.baseUrl}/${this.type}/findByModello?modello=${modello}`);
  }
}