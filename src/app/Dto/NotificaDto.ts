export class NotificaDto {
    
    id: number;
    titolo: string;
    messaggio: string;
    tipo: string;
    priorita: string;
    dataCreazione: string;
    letta: boolean;

    constructor(titolo : string, messaggio: string, id: number, tipo: string, priorita: string, datacreazione: string, letta: boolean) {
        this.titolo = titolo;
        this.messaggio = messaggio;
        this.id = id;
        this.tipo = tipo;
        this.priorita = priorita;
        this.dataCreazione = datacreazione;
        this.letta = letta;
  }
}
