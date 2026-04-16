import { AutoDto } from "./AutoDto";
import { UserDto } from "./UserDto";

export class AziendaDto{

  id: number;

  titolare: UserDto;

  nomeAzienda: string;

  descrizioneAzienda: string;

  auto: AutoDto;

  //elettricista: ElettricistaDto;

  constructor(nomeAzienda : string, descrizioneAzienda: string, id: number, titolare: UserDto, auto: AutoDto){
    this.nomeAzienda=nomeAzienda;
    this.descrizioneAzienda=descrizioneAzienda;
    this.id=id;
    this.titolare=titolare;
    this.auto=auto;
  }
}
