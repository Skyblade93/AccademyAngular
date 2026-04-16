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

  onNotificaAggiunta(nuovaNotifica: NotificaDto): void {
    this.listNotifica = [nuovaNotifica, ...this.listNotifica];
    this.istoggleAddNotifica.set(false);
  }

  caricaTutte(): void {
    this.notificaService.getAll().subscribe({
      next: (data) => this.listNotifica = data,
      error: (err) => {
        console.error('Errore nel caricamento totale:', err);
        this.listNotifica = [];
      }
    });
  }

  cercaPerTitolo(titolo: string): void {
    if (!titolo) {
      this.caricaTutte();
      return;
    }
    this.notificaService.getNotificaByTitolo(titolo).subscribe({
      next: (data) => this.listNotifica = data ? [data] : [],
      error: (err) => {
        console.error('Errore nella ricerca per titolo:', err);
        this.listNotifica = [];
      }
    });
  }

  cercaPerStato(letta: boolean): void {
    this.notificaService.getNotificheByLetta(letta).subscribe({
      next: (data) => this.listNotifica = data,
      error: (err) => {
        console.error('Errore nella ricerca per stato:', err);
        this.listNotifica = [];
      }
    });
  }

  cercaPerTipoEPriorita(tipo: string, priorita: string): void {
    if (!tipo && !priorita) {
      this.caricaTutte();
      return;
    }
    this.notificaService.getNotificheByTipoAndPriorita(tipo, priorita).subscribe({
      next: (data) => this.listNotifica = data,
      error: (err) => {
        console.error('Errore nella ricerca per tipo e priorità:', err);
        this.listNotifica = [];
      }
    });
  }
}