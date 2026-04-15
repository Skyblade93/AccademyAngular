export interface DroneDto {
  id?: number;
  modello: string;
  marca: string;
  livelloBatteria: number;
  codiceSeriale: string; // <--- AGGIUNTO: Senza questo il backend esplode
}