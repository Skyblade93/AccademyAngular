import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrelloService } from '../Service/CarrelloService';
import { CarrelloDto } from '../Dto/CarrelloDto';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carrello.html',
  styleUrl: './carrello.css',
})
export class Carrello implements OnInit {
  listCarrello: CarrelloDto[] = [];

  constructor(private carrelloService: CarrelloService) {}

  ngOnInit(): void {
    this.caricaTutti();
  }

  caricaTutti(): void {
    this.carrelloService.getAll().subscribe({
      next: (data) => (this.listCarrello = data),
      error: (err) => console.error('Errore nel caricamento carrello', err),
    });
  }

  cercaPerId(id: number): void {
    this.carrelloService.findById(id).subscribe((item) => {
      this.listCarrello = [item];
    });
  }

  filtraPerPrezzo(prezzo: number): void {
    if (!prezzo) return;
    this.carrelloService.cercaPerPrezzoTotale(prezzo).subscribe({
      next: (data) => (this.listCarrello = data),
      error: (err) => console.error('Errore ricerca prezzo', err),
    });
  }
}
