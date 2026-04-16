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

<<<<<<< HEAD
=======
  toggleAddNotifica(): void {
    this.istoggleAddNotifica.update(v => !v);
  }

  // Metodo per gestire l'output del componente figlio
  onNotificaAggiunta(nuovaNotifica: NotificaDto): void {
    this.listNotifica = [nuovaNotifica, ...this.listNotifica];
    this.istoggleAddNotifica.set(false);
  }

>>>>>>> ff30a49 (aggiunto l'add on)
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
