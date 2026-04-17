
export class DipendenteDto {

id: number;
nomeDipendente: string;
cognomeDipendente: string;
eta : number;
email: string;
numeroTelefono: number;
/*
nomeAzienda: string;
user: string;
contact: string;
dorne: string;
auto: string;
  */

constructor (nomeDipendente : string, cognomeDipendente: string, eta : number, email: string, numeroTelefono: number, id: number) {
    this.nomeDipendente = nomeDipendente;
    this.cognomeDipendente = cognomeDipendente;
    this.eta = eta;
    this.email = email;
    this.numeroTelefono = numeroTelefono;
    this.id = id;
}
}