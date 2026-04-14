export interface DroneDto {
  id?: number;
  modello: string;
  marca: string;           // Fondamentale per l'HTML
  livelloBatteria: number; // Deve coincidere con l'HTML
}