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
    modello: '', marca: '', livelloBatteria: 0, codiceSeriale: ''
  };

  constructor(private readonly droneService: DroneService) {}

  ngOnInit(): void {
    this.caricaDroni();
  }

  caricaDroni(): void {
    this.droneService.getAll().subscribe({
      next: (data) => { 
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
        d.marca.toLowerCase().includes(termine)
      );
    } else {
      this.listaFiltrata = this.listaDroni;
    }
    this.isPopupOpen = false; 
  }

  togglePopup() { this.isPopupOpen = !this.isPopupOpen; }

  salvaDrone(form: any): void {
    const operazione = this.isModifica 
      ? this.droneService.update(this.droneInModifica)
      : this.droneService.insert(this.droneInModifica);

    operazione.subscribe(() => {
      this.caricaDroni();
      this.annulla();
    });
  }

  eliminaDrone(id?: number): void {
    if (id && confirm("Eliminare drone?")) {
      this.droneService.delete(id).subscribe(() => this.caricaDroni());
    }
  }

  selezionaPerModifica(d: DroneDto) {
    this.droneInModifica = { ...d };
    this.isModifica = true;
  }

  annulla() {
    this.isModifica = false;
    this.droneInModifica = { modello: '', marca: '', livelloBatteria: 0, codiceSeriale: '' };
  }
}