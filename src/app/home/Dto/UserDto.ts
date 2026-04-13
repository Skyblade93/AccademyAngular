
export class UserDto {

  nome!: string;

  cognome !: string;

  constructor(nome : string, cognome: string){
    this.nome = nome;
    this.cognome = cognome;
  }
}
