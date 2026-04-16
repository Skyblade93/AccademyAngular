import { Component, OnInit} from '@angular/core';
import { NotificaDto } from '../Dto/NotificaDto';
import { DatePipe } from '@angular/common';
import { NotificaService } from '../Service/NotificaService';

@Component({
  selector: 'app-notifica',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './notifica-component.html',
  styleUrl: './notifica-component.css',
})

export class NotificaComponent implements OnInit {
  listNotifica: NotificaDto[] = [];


  constructor(private notificaService: NotificaService) {
  }

  ngOnInit(): void {
    this.caricaTutte();
  }

  caricaTutte(): void {
    this.notificaService.getAll().subscribe(data => {
      this.listNotifica = data;
    });
  }

  cercaPerTitolo(titolo: string): void {
    if(!titolo) return;
    this.notificaService.getNotificaByTitolo(titolo).subscribe(data => {
      this.listNotifica = data ? [data] : [];
    });
  }

  cercaPerStato(letta: boolean): void {
    this.notificaService.getNotificheByLetta(letta).subscribe(data => {
      this.listNotifica = data;
    });
  }

  cercaPerTipoEPriorita(tipo: string, priorita: string): void {
    this.notificaService.getNotificheByTipoAndPriorita(tipo, priorita).subscribe(data => {
      this.listNotifica = data;
    });
  }
}
