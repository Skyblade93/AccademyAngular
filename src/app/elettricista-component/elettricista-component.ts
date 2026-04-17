import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElettricistaService } from '../Service/elettricistaService';
import { ElettricistaDto } from '../Dto/ElettricistaDto';

@Component({
  selector: 'app-elettricista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './elettricista-component.html',
  styleUrls: ['./elettricista-component.css']
})
export class ElettricistaComponent /*implements OnInit*/ {

  elettricisti: ElettricistaDto[] = [];
  elettricistiFiltrati: ElettricistaDto[] = [];
  elettricistaSelezionato: ElettricistaDto | null = null;

  // FORM
  nome = '';
  cognome = '';
  telefono = '';
  indirizzo = '';

  // POPUP GENERICO
  mostraPopup = false;

  // POPUP AZIONI
  popupCall = false;
  popupCallMessage = '';

  constructor(private service: ElettricistaService) {}
/*
  ngOnInit(): void {
    this.caricaTutti();
  }

  // =========================
  // CRUD / LOAD
  // =========================
  /*
  caricaTutti(): void {
    this.service().subscribe({
      next: (data) => {
        this.elettricisti = data;
        this.elettricistiFiltrati = data;
      },
      error: () => {
        this.mostraMessaggio('Errore caricamento dati');
      }
    });
  }
*/
  // =========================
  // FILTRI
  // =========================
  filtraPerSpec(spec: string): void {
    if (!spec.trim()) {
      this.resetFiltro();
      return;
    }

    this.elettricistiFiltrati = this.elettricisti.filter(e =>
      e.specializzazione?.toLowerCase().includes(spec.toLowerCase())
    );
  }

  resetFiltro(): void {
    this.elettricistiFiltrati = [...this.elettricisti];
  }

  seleziona(e: ElettricistaDto): void {
    this.elettricistaSelezionato = e;
  }

  // =========================
  // AZIONI
  // =========================
  verificaDisponibilita(e: ElettricistaDto): void {
    const msg = e.disponibile
      ? `✔ ${e.nome} ${e.cognome} è DISPONIBILE`
      : `❌ ${e.nome} ${e.cognome} NON è disponibile`;

    this.mostraMessaggio(msg, 2500);
  }

  chiama(e: ElettricistaDto): void {
    const msg = `📞 Chiamata in corso a ${e.nome} ${e.cognome} - ${e.telefono}`;
    this.mostraMessaggio(msg, 4000);
  }

  // =========================
  // FORM
  // =========================
  invia(): void {
    if (!this.nome || !this.cognome || !this.telefono || !this.indirizzo) {
      this.mostraMessaggio('⚠ Compila tutti i campi!');
      return;
    }

    this.mostraPopup = true;

    setTimeout(() => {
      this.chiudiPopup();
    }, 3000);
  }

  chiudiPopup(): void {
    this.mostraPopup = false;

    this.nome = '';
    this.cognome = '';
    this.telefono = '';
    this.indirizzo = '';
  }

  // =========================
  // UTILITY POPUP
  // =========================
  mostraMessaggio(msg: string, durata: number = 3000): void {
    this.popupCallMessage = msg;
    this.popupCall = true;

    setTimeout(() => {
      this.popupCall = false;
    }, durata);
  }
}
