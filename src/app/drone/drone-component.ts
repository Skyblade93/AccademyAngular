import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DroneService } from '../Service/droneService'; 
import { DroneDto } from '../Dto/DroneDto';

@Component({
  selector: 'app-drone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drone-component.html',
  styleUrl: './drone-component.css'
})
export class DroneComponent implements OnInit {
  listaDroni: DroneDto[] = [];      
  listaFiltrata: DroneDto[] = [];   
  filtroMarca: string = '';         
  isPopupOpen: boolean = false; 
  isModifica: boolean = false;

  droneInModifica: DroneDto = {
    id: undefined,
    modello: '', 
    marca: '', 
    codiceSeriale: '',
    livelloBatteria: 0
  };

  constructor(private readonly droneService: DroneService) {}

  ngOnInit(): void {
    this.caricaDroni();
  }

  caricaDroni(): void {
    this.droneService.getAll().subscribe({
      next: (data: DroneDto[]) => { 
        this.listaDroni = data; 
        this.listaFiltrata = data; 
      },
      error: (err) => console.error("Errore comunicazione Backend!", err)
    });
  }

  applicaFiltro(): void {
    const termine = this.filtroMarca.toLowerCase().trim();
    if (termine) {
      this.listaFiltrata = this.listaDroni.filter(d => 
        (d.modello && d.modello.toLowerCase().includes(termine)) || 
        (d.marca && d.marca.toLowerCase().includes(termine))
      );
    } else {
      this.listaFiltrata = this.listaDroni;
    }
    this.isPopupOpen = false; 
  }

  resetFiltro(): void {
    this.filtroMarca = ''; 
    this.listaFiltrata = this.listaDroni;
  }

  togglePopup() { 
    this.isPopupOpen = !this.isPopupOpen; 
  }

  salvaDrone(): void {
    // Caso MODIFICA
    if (this.isModifica && this.droneInModifica.id !== undefined && this.droneInModifica.id !== null) {
      // CORREZIONE: Passiamo solo l'oggetto come richiesto dall'AbstractService
      this.droneService.update(this.droneInModifica).subscribe({
        next: () => {
          this.caricaDroni();
          this.annulla();
        },
        error: (err) => console.error("Errore durante l'aggiornamento!", err)
      });
    } 
    // Caso INSERIMENTO
    else {
      this.droneService.insert(this.droneInModifica).subscribe({
        next: () => {
          this.caricaDroni();
          this.annulla();
        },
        error: (err) => console.error("Errore durante l'inserimento!", err)
      });
    }
  }

  eliminaDrone(id?: number): void {
    if (id && confirm("Sei sicuro di voler eliminare questo drone?")) {
      this.droneService.delete(id).subscribe({
        next: () => this.caricaDroni(),
        error: (err) => console.error("Errore durante l'eliminazione!", err)
      });
    }
  }

  selezionaPerModifica(d: DroneDto) {
    this.droneInModifica = { ...d };
    this.isModifica = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  annulla() {
    this.isModifica = false;
    this.droneInModifica = { 
      id: undefined, modello: '', marca: '', codiceSeriale: '', livelloBatteria: 0 
    };
  }
}