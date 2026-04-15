import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DroneService } from '../Service/droneService'; 
import { DroneDto } from '../Dto/DroneDto';

@Component({
  selector: 'app-drone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drone.component.html',
  styleUrl: './drone.component.css'
})
export class DroneComponent implements OnInit {
  // Questa è la lista che l'HTML deve scorrere con *ngFor="let d of listaDroni"
  listaDroni: DroneDto[] = [];
  
  // Modello per il Two-Way Data Binding [(ngModel)]
  droneInModifica: DroneDto = {
    modello: '',
    marca: '',
    livelloBatteria: 0,
    codiceSeriale: ''
  };

  isModifica: boolean = false;

  constructor(private readonly droneService: DroneService) {}

  ngOnInit(): void {
    this.caricaDroni();
  }

  caricaDroni(): void {
    this.droneService.getAll().subscribe({
      next: (data: DroneDto[]) => { 
        this.listaDroni = data; 
      },
      error: (err: any) => console.error("Errore caricamento:", err)
    });
  }

  selezionaPerModifica(drone: DroneDto): void {
    // Creiamo una copia per non modificare l'originale nella lista finché non salviamo
    this.droneInModifica = { ...drone };
    this.isModifica = true;
  }

  annulla(): void {
    this.droneInModifica = { modello: '', marca: '', livelloBatteria: 0, codiceSeriale: '' };
    this.isModifica = false;
  }

  salvaDrone(droneForm: any): void {
    if (droneForm.valid) {
      const call = this.isModifica 
        ? this.droneService.update(this.droneInModifica)
        : this.droneService.insert(this.droneInModifica);

      call.subscribe({
        next: () => {
          this.caricaDroni(); // Ricarica la lista aggiornata dal DB
          this.annulla();     // Pulisce i campi
          alert("Operazione riuscita!");
        },
        error: (err) => {
          console.error(err);
          alert("Errore nel salvataggio! Controlla il codice seriale.");
        }
      });
    }
  }

  eliminaDrone(id: number | undefined): void {
    if (id !== undefined && confirm("Sei sicuro di voler eliminare questo drone?")) {
      this.droneService.delete(id).subscribe({
        next: () => {
          this.caricaDroni(); // Aggiorna la vista dopo l'eliminazione
        },
        error: (err) => console.error("Errore eliminazione:", err)
      });
    }
  }
}