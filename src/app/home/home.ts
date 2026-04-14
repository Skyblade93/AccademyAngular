import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DroneService } from '../Service/droneService'; 
import { DroneDto } from '../Dto/DroneDto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  listaDroni: DroneDto[] = [];
  
  // Oggetto sempre inizializzato per evitare l'errore NG5002 nel template
  droneInModifica: DroneDto = {
    modello: '',
    marca: '',
    livelloBatteria: 0
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
        console.log("Dati caricati:", data);
      },
      error: (err: any) => console.error("Errore caricamento:", err)
    });
  }

  selezionaPerModifica(drone: DroneDto): void {
    // Cloniamo l'oggetto per non modificare la riga della tabella mentre scriviamo
    this.droneInModifica = { ...drone };
    this.isModifica = true;
  }

  annulla(): void {
    this.droneInModifica = { modello: '', marca: '', livelloBatteria: 0 };
    this.isModifica = false;
  }

  salvaDrone(droneForm: any): void {
    if (droneForm.valid) {
      if (this.isModifica) {
        // Chiamata UPDATE (PUT)
        this.droneService.update(this.droneInModifica).subscribe({
          next: () => {
            this.caricaDroni();
            this.annulla();
          },
          error: (err: any) => console.error("Errore update:", err)
        });
      } else {
        // Chiamata INSERT (POST)
        this.droneService.insert(this.droneInModifica).subscribe({
          next: () => {
            this.caricaDroni();
            this.annulla();
          },
          error: (err: any) => console.error("Errore insert:", err)
        });
      }
    }
  }

  eliminaDrone(id: number | undefined): void {
    if (id !== undefined && confirm("Eliminare definitivamente il drone?")) {
      this.droneService.delete(id).subscribe({
        next: () => this.caricaDroni(),
        error: (err: any) => console.error("Errore delete:", err)
      });
    }
  }
}