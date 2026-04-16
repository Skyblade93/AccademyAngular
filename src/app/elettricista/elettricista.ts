import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElettricistaService } from '../Service/elettricista.service';
import { ElettricistaDto } from '../Dto/elettricistadto';

@Component({
  selector: 'app-elettricista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elettricista.html',
  styleUrls: ['./elettricista.css']
})
export class ElettricistaComponent implements OnInit {

  elettricisti: ElettricistaDto[] = [];
  elettricistiFiltrati: ElettricistaDto[] = [];
  elettricistaSelezionato: ElettricistaDto | null = null;

  popupMessaggio: string = '';
  showPopup: boolean = false;

  constructor(private service: ElettricistaService) {}

  ngOnInit(): void {
    this.caricaTutti();
  }

  caricaTutti(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.elettricisti = data;
        this.elettricistiFiltrati = data;
      },
      error: () => this.apriPopup('Errore caricamento dati')
    });
  }

  filtraPerSpec(spec: string): void {
    this.elettricistiFiltrati = this.elettricisti.filter(e =>
      e.specializzazione.toLowerCase() === spec.toLowerCase()
    );
  }

  resetFiltro(): void {
    this.elettricistiFiltrati = this.elettricisti;
  }

  seleziona(e: ElettricistaDto): void {
    this.elettricistaSelezionato = e;
  }

  verificaDisponibilita(e: ElettricistaDto): void {
    alert(e.disponibile ? "Disponibile ✔" : "Non disponibile ❌");
  }

  chiama(e: ElettricistaDto): void {
    alert("Chiamata a " + e.nome + " " + e.cognome);
  }

  elimina(id: number): void {
    this.elettricisti = this.elettricisti.filter(e => e.id !== id);
    this.elettricistiFiltrati = this.elettricistiFiltrati.filter(e => e.id !== id);
    this.apriPopup('Utente eliminato');
  }

  apriPopup(msg: string): void {
    this.popupMessaggio = msg;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 2000);
  }
}