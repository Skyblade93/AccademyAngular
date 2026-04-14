
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

constructor(id: number, nomeDipendente : string, cognomeDipendente: string, eta : number, email: string, numeroTelefono: number) {
    this.id = id;
    this.nomeDipendente = nomeDipendente;
    this.cognomeDipendente = cognomeDipendente;
    this.eta = eta;
    this.email = email;
    this.numeroTelefono = numeroTelefono;
}
}