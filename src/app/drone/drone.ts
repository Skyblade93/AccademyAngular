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
  
  // Inizializziamo l'oggetto per il form
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
        console.log("Droni caricati nel tuo componente:", data);
      },
      error: (err: any) => console.error("Errore caricamento:", err)
    });
  }

  selezionaPerModifica(drone: DroneDto): void {
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
        this.droneService.update(this.droneInModifica).subscribe({
          next: () => {
            this.caricaDroni();
            this.annulla();
          }
        });
      } else {
        this.droneService.insert(this.droneInModifica).subscribe({
          next: () => {
            this.caricaDroni();
            this.annulla();
          }
        });
      }
    }
  }

  eliminaDrone(id: number | undefined): void {
    if (id !== undefined && confirm("Eliminare definitivamente questo drone?")) {
      this.droneService.delete(id).subscribe({
        next: () => this.caricaDroni()
      });
    }
  }
}