import { UserDto } from './UserDto';

export class AutoDto {
  id: number;
  modello: string;
  marca: string;
  targa: string;
  carburante: string;
  user?: UserDto | null;

  constructor(
    modello: string,
    marca: string,
    targa: string,
    carburante: string,
    user?: UserDto | null,
    id = 0
  ) {
    this.id = id;
    this.modello = modello;
    this.marca = marca;
    this.targa = targa;
    this.carburante = carburante;
    this.user = user ?? null;
  }
}
