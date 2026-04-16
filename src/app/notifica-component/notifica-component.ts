import { Component, OnInit, signal } from '@angular/core';
import { NotificaDto } from '../Dto/NotificaDto';
import { DatePipe } from '@angular/common';
import { NotificaService } from '../Service/NotificaService';
import { AddNotificaComponent } from '../addOn/add-notifica-component/add-notifica-component';

@Component({
  selector: 'app-notifica',
  standalone: true,
  imports: [DatePipe, AddNotificaComponent],
  templateUrl: './notifica-component.html',
  styleUrl: './notifica-component.css',
})
export class NotificaComponent implements OnInit {
  listNotifica: NotificaDto[] = [];

  istoggleAddNotifica = signal(false);

  constructor(private notificaService: NotificaService) {}

  ngOnInit(): void {
    this.caricaTutte();
  }

  toggleAddNotifica(): void {
    this.istoggleAddNotifica.update(v => !v);
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