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
  listaDroni: DroneDto[] = [];      // Dati originali dal DB
  listaFiltrata: DroneDto[] = [];   // Dati visualizzati dopo il filtro
  filtroMarca: string = '';         // Testo inserito dall'utente nel popup
  isPopupOpen: boolean = false; 
  isModifica: boolean = false;

  // Corretto: aggiunto 'marca' per evitare errore TS2741
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
      next: (data) => { 
        this.listaDroni = data; 
        this.listaFiltrata = data; 
      },
      error: (err) => console.error("Errore comunicazione Backend!", err)
    });
  }

  // --- LOGICA DEL FILTRO ---
  applicaFiltro(): void {
    const termine = this.filtroMarca.toLowerCase().trim();
    
    if (termine) {
      // Filtriamo sulla proprietà 'modello' (dove nel DB hai i nomi come Sony/DJI)
      this.listaFiltrata = this.listaDroni.filter(d => 
        (d.modello && d.modello.toLowerCase().includes(termine)) || 
        (d.marca && d.marca.toLowerCase().includes(termine))
      );
    } else {
      this.listaFiltrata = this.listaDroni;
    }
    this.isPopupOpen = false; 
  }

  togglePopup() { 
    this.isPopupOpen = !this.isPopupOpen; 
  }

  salvaDrone(): void {
    const operazione = this.isModifica 
      ? this.droneService.update(this.droneInModifica)
      : this.droneService.insert(this.droneInModifica);

    operazione.subscribe(() => {
      this.caricaDroni();
      this.annulla();
    });
  }

  eliminaDrone(id?: number): void {
    if (id && confirm("Sei sicuro di voler eliminare questo drone?")) {
      this.droneService.delete(id).subscribe(() => this.caricaDroni());
    }
  }

  selezionaPerModifica(d: DroneDto) {
    this.droneInModifica = { ...d };
    this.isModifica = true;
  }

  annulla() {
    this.isModifica = false;
    // Corretto: aggiunto 'marca' anche qui
    this.droneInModifica = { 
      modello: '', 
      marca: '', 
      codiceSeriale: '', 
      livelloBatteria: 0 
    };
  }
}