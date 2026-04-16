import { UserDto } from "./UserDto";

export class OrdineDto {

  id: number;

  costo_totale: number;

  numero_prodotti : number;

  indirizzo_spedizione: string;

  user!: UserDto;

/*
  ListUser: OrdineProductDto[] = [];

  parcel!: parcelDto;

  pagamento!: pagamentoDto;
*/

  constructor(id : number, costo_totale: number, numero_prodotti: number, indirizzo_spedizione:string, user: UserDto) {
    this.id = id;
    this.costo_totale = costo_totale;
    this.numero_prodotti = numero_prodotti;
    this.indirizzo_spedizione=indirizzo_spedizione;
    this.user=user;
  }
}
