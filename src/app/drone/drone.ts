import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DroneService } from '../Service/droneService'; 
import { DroneDto } from '../Dto/DroneDto';

@Component({
  selector: 'app-drone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drone.html',
  styleUrl: './drone.css'
})
export class DroneComponent implements OnInit {
  listaDroni: DroneDto[] = [];
  
  droneInModifica: DroneDto = {
    modello: '',
    marca: '',
    livelloBatteria: 0,
    codiceSeriale: '' // <--- Inizializzato vuoto
  };

  isModifica: boolean = false;

  constructor(private readonly droneService: DroneService) {}

  ngOnInit(): void {
    this.caricaDroni();
  }

  caricaDroni(): void {
    this.droneService.getAll().subscribe({
      next: (data: DroneDto[]) => { this.listaDroni = data; },
      error: (err: any) => console.error("Errore caricamento:", err)
    });
  }

  selezionaPerModifica(drone: DroneDto): void {
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
          this.caricaDroni();
          this.annulla();
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
    if (id !== undefined && confirm("Eliminare questo drone?")) {
      this.droneService.delete(id).subscribe({
        next: () => this.caricaDroni()
      });
    }
  }
}