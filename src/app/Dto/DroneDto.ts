export class DroneDto {
  id?: number;
  marca: string;
  modello: string;
  codiceSeriale: string;
  livelloBatteria: number;

  constructor(marca: string, modello: string, codiceSeriale: string, livelloBatteria: number, id?: number) {
    this.id = id;
    this.marca = marca;
    this.modello = modello;
    this.codiceSeriale = codiceSeriale;
    this.livelloBatteria = livelloBatteria;
  }
}