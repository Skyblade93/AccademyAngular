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
export class ElettricistaComponent implements OnInit {

  elettricisti: ElettricistaDto[] = [];
  elettricistiFiltrati: ElettricistaDto[] = [];
  elettricistaSelezionato: ElettricistaDto | null = null;

  // FORM
  nome: string = '';
  cognome: string = '';
  telefono: string = '';
  indirizzo: string = '';

  // POPUP
  mostraPopup: boolean = false;

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
      error: () => alert('Errore caricamento dati')
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

  popupCall = false;
popupCallMessage = '';

verificaDisponibilita(e: ElettricistaDto): void {
  this.popupCallMessage = e.disponibile
    ? `✔ ${e.nome} ${e.cognome} è DISPONIBILE`
    : `❌ ${e.nome} ${e.cognome} NON è disponibile`;

  this.popupCall = true;

  setTimeout(() => {
    this.popupCall = false;
  }, 2500);
}

chiama(e: ElettricistaDto): void {
  this.popupCallMessage =
    `📞 Chiamata in corso a ${e.nome} ${e.cognome} - ${e.telefono}`;

  this.popupCall = true;

  setTimeout(() => {
    this.popupCall = false;
  }, 4000);
}
  invia(): void {
    if (!this.nome || !this.cognome || !this.telefono || !this.indirizzo) {
      alert("Compila tutti i campi!");
      return;
    }

    this.mostraPopup = true;

    setTimeout(() => {
      this.mostraPopup = false;
    }, 3000);
  }

  chiudiPopup(): void {
    this.mostraPopup = false;

    this.nome = '';
    this.cognome = '';
    this.telefono = '';
    this.indirizzo = '';
  }
}
