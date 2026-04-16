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
  listaDroni: DroneDto[] = [];
  listaFiltrata: DroneDto[] = []; 
  
  droneInModifica: DroneDto = {
    modello: '', marca: '', livelloBatteria: 0, codiceSeriale: ''
  };

  isModifica: boolean = false;
  isPopupOpen: boolean = false; 
  filtroMarca: string = '';     

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
      error: (err) => console.error("Verifica IntelliJ!", err)
    });
  }

  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
  }

  applicaFiltro(): void {
    if (this.filtroMarca.trim() !== '') {
      this.listaFiltrata = this.listaDroni.filter(d => 
        d.marca.toLowerCase().includes(this.filtroMarca.toLowerCase())
      );
    } else {
      this.listaFiltrata = this.listaDroni;
    }
    this.isPopupOpen = false; 
  }

  selezionaPerModifica(drone: DroneDto): void {
    this.droneInModifica = { ...drone };
    this.isModifica = true;
  }

  annulla(): void {
    this.droneInModifica = { modello: '', marca: '', livelloBatteria: 0, codiceSeriale: '' };
    this.isModifica = false;
    this.filtroMarca = '';
    this.listaFiltrata = this.listaDroni;
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
        error: () => alert("Errore! Verifica il Backend.")
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