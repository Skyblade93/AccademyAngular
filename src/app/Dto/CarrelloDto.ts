export class CarrelloDto {
  id: number;

  quantita: number;

  prezzoTotale: number;

  constructor(id: number, prezzoTotale: number, quantita: number) {
    this.quantita = quantita;
    this.prezzoTotale = prezzoTotale;
    this.id = id;
  }
}
