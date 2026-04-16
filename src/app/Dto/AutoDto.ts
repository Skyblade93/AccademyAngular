import { UserDto } from './UserDto';
import { AziendaDto } from './AziendaDto';
import { DipendenteDto } from './DipendenteDto';

export class AutoDto {
  id: number;
  modello: string;
  marca: string;
  targa: string;
  carburante: string;
  user?: UserDto | null;
  azienda?: AziendaDto | null;
  dipendente?: DipendenteDto | null;

  constructor(
    modello: string,
    marca: string,
    targa: string,
    carburante: string,
    user?: UserDto | null,
    azienda?: AziendaDto | null,
    dipendente?: DipendenteDto | null,
    id = 0
  ) {
    this.id = id;
    this.modello = modello;
    this.marca = marca;
    this.targa = targa;
    this.carburante = carburante;
    this.user = user ?? null;
    this.azienda = azienda ?? null;
    this.dipendente = dipendente ?? null;
  }
}
