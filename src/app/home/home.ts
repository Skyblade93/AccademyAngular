import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DroneService } from '../Service/drone.service'; // Controlla il percorso
import { DroneDto } from '../Dto/DroneDto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  // Questo array conterrà i droni che arrivano dal backend
  listaDroni: DroneDto[] = [];

  constructor(private droneService: DroneService) {}

  ngOnInit(): void {
    // Appena la pagina si carica, leggiamo i droni
    this.caricaDroni();
  }

  caricaDroni(): void {
    this.droneService.getAll().subscribe({
      next: (data) => {
        this.listaDroni = data;
        console.log("Droni caricati:", data);
      },
      error: (err) => console.error("Errore nel caricamento droni", err)
    });
  }

  salvaDrone(droneForm: any): void {
    if (droneForm.valid) {
      this.droneService.insert(droneForm.value).subscribe(() => {
        this.caricaDroni(); // Ricarica la lista dopo l'inserimento
        droneForm.reset();
      });
    }
  }

  eliminaDrone(id: number | undefined): void {
    if (id) {
      this.droneService.delete(id).subscribe(() => {
        this.caricaDroni(); // Aggiorna la lista dopo l'eliminazione
      });
    }
  }
}