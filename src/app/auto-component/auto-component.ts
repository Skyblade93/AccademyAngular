import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoDto } from '../Dto/AutoDto';
import { AddAutoComponent } from '../addOn/add-auto-component/add-auto-component';
import { SearchAutoComponent } from '../addOn/search-auto-component/search-auto-component';
import { autoService } from '../Service/autoService';
import { userService } from '../Service/userService';
import { UserDto } from '../Dto/UserDto';
import { AziendaDto } from '../Dto/AziendaDto';
import { DipendenteDto } from '../Dto/DipendenteDto';
import { aziendaService } from '../Service/aziendaService';
import { DipendenteService } from '../Service/dipendenteService';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

type SearchAutoFilters = {
  id: number | null;
  targa: string;
  marca: string;
  modello: string;
  carburante: string;
  searchType: 'exact' | 'containing' | 'starting' | 'ending';
};

@Component({
  selector: 'app-auto-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AddAutoComponent, SearchAutoComponent],
  templateUrl: './auto-component.html',
  styleUrls: ['./auto-component.css'],
})
export class AutoComponent implements OnInit, OnDestroy {
  service: autoService;
  userSrv: userService;
  aziendaSrv: aziendaService;
  dipendenteSrv: DipendenteService;
  listAuto: AutoDto[] = [];
  userList: UserDto[] = [];
  aziendaList: AziendaDto[] = [];
  dipendenteList: DipendenteDto[] = [];
  carburanteOptions = ['BENZINA', 'DIESEL', 'GPL', 'METANO', 'ELETTRICA', 'IBRIDA'];
  isToggleAddAuto = false;
  isToggleSearchAuto = false;
  selectedAutoForEdit: AutoDto | null = null;
  showAutoList = false;

confirmDeleteId: number | null = null;
popupVisible: boolean = false;
popupType: 'create' | 'update' | 'delete' = 'create';
popupMessage = '';
private popupTimer: ReturnType<typeof setTimeout> | null = null;


  constructor(service: autoService, userSrv: userService, aziendaSrv: aziendaService, dipendenteSrv: DipendenteService) {
    this.service = service;
    this.userSrv = userSrv;
    this.aziendaSrv = aziendaSrv;
    this.dipendenteSrv = dipendenteSrv;
  }

  ngOnInit() {
    this.loadUsers();
    this.loadAziende();
    this.loadDipendenti();
  }

  loadAll() {
    this.service.getAll().subscribe((autos) => {
      this.listAuto = Array.isArray(autos) ? autos : [autos];
      this.showAutoList = true;
    });
  }

  mostraTutti() {
    this.loadAll();
  }

  loadUsers() {
    this.userSrv.getAll().subscribe((users) => {
      this.userList = users;
    });
  }

  loadAziende() {
    this.aziendaSrv.getAll().subscribe((aziende) => {
      this.aziendaList = aziende;
    });
  }

  loadDipendenti() {
    this.dipendenteSrv.getAll().subscribe((dipendenti) => {
      this.dipendenteList = dipendenti;
    });
  }

  toggleAddAuto() {
    this.isToggleAddAuto = !this.isToggleAddAuto;
    if (!this.isToggleAddAuto) {
      this.selectedAutoForEdit = null;
    }
  }

  onSaveAuto(auto: AutoDto) {
    const isEditMode = !!auto.id;
    const request = isEditMode ? this.service.update(auto) : this.service.insert(auto);

    request.subscribe(() => {
      this.loadAll();
      this.showPopup(
        isEditMode ? 'update' : 'create',
        isEditMode ? 'Modifica auto completata con successo.' : 'Creazione auto completata con successo.'
      );
      this.selectedAutoForEdit = null;
      this.isToggleAddAuto = false;
    });
  }

  onCancelAutoForm() {
    this.selectedAutoForEdit = null;
    this.isToggleAddAuto = false;
  }

  toggleSearchAuto() {
    this.isToggleSearchAuto = !this.isToggleSearchAuto;
  }

  onSearchFilters(filters: SearchAutoFilters) {
    this.showAutoList = true;
    this.applyFilters(filters);
  }

  onClearSearchFilters() {
    this.clearFilters();
  }

  editAuto(auto: AutoDto) {
    this.selectedAutoForEdit = auto;
    this.isToggleAddAuto = true;
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getDipendenteLabel(dipendente: DipendenteDto | null | undefined) {
    if (!dipendente) {
      return 'Nessuno';
    }

    return `${dipendente.nomeDipendente} ${dipendente.cognomeDipendente}`.trim();
  }

  applyFilters(filters: SearchAutoFilters) {

const id = filters.id ?? null;
const targa = (filters.targa || '').trim();
const marca = (filters.marca || '').trim();
const modello = (filters.modello || '').trim();
const carburante = (filters.carburante || '').trim();
const searchType = filters.searchType || 'exact';


    console.log('Applying filters:', { id, targa, marca, modello, carburante, searchType });

    // Priorità: id > targa > marca+modello > marca > modello > carburante > marca+carburante
    if (id && id > 0) {
      console.log('Filtering by ID:', id);
      this.service.read(id).pipe(
        catchError(error => {
          console.error('Error filtering by ID:', error);
          this.listAuto = [];
          return throwError(error);
        })
      ).subscribe((auto) => {
        console.log('Found auto by ID:', auto);
        this.listAuto = [auto];
      });
    } else if (targa) {
      console.log('Filtering by targa:', targa);
      this.service.findByTarga(targa).pipe(
        catchError(error => {
          console.error('Error filtering by targa:', error);
          this.listAuto = [];
          return throwError(error);
        })
      ).subscribe((autos) => {
        console.log('Found autos by targa:', autos);
        this.listAuto = Array.isArray(autos) ? autos : [autos];

      });
    } else if (marca && modello) {
      console.log('Filtering by marca and modello:', marca, modello);
      this.service.findByMarcaAndModello(marca, modello).pipe(
        catchError(error => {
          console.error('Error filtering by marca and modello:', error);
          this.listAuto = [];
          return throwError(error);
        })
      ).subscribe((autos) => {
        console.log('Found autos by marca and modello:', autos);
        this.listAuto = Array.isArray(autos) ? autos : [autos];

      });
    } else if (marca && carburante) {
      console.log('Filtering by marca and carburante:', marca, carburante);
      this.service.findByMarcaAndCarburante(marca, carburante).pipe(
        catchError(error => {
          console.error('Error filtering by marca and carburante:', error);
          this.listAuto = [];
          return throwError(error);
        })
      ).subscribe((autos) => {
        console.log('Found autos by marca and carburante:', autos);
        this.listAuto = Array.isArray(autos) ? autos : [autos];

      });
    } else if (marca) {
      if (searchType === 'starting') {
        console.log('Filtering by marca starting with:', marca);
        this.service.findByMarcaStartingWith(marca).pipe(
          catchError(error => {
            console.error('Error filtering by marca starting with:', error);
            this.listAuto = [];
            return throwError(error);
          })
        ).subscribe((autos) => {
          console.log('Found autos by marca starting with:', autos);
          this.listAuto = Array.isArray(autos) ? autos : [autos];

        });
      } else if (searchType === 'ending') {
        console.log('Filtering by marca ending with:', marca);
        this.service.findByMarcaEndingWith(marca).pipe(
          catchError(error => {
            console.error('Error filtering by marca ending with:', error);
            this.listAuto = [];
            return throwError(error);
          })
        ).subscribe((autos) => {
          console.log('Found autos by marca ending with:', autos);
         this.listAuto = Array.isArray(autos) ? autos : [autos];

        });
      } else {
        console.log('Filtering by marca exact:', marca);
        this.service.findByMarca(marca).pipe(
          catchError(error => {
            console.error('Error filtering by marca exact:', error);
            this.listAuto = [];
            return throwError(error);
          })
        ).subscribe((autos) => {
          console.log('Found autos by marca exact:', autos);
          this.listAuto = Array.isArray(autos) ? autos : [autos];

        });
      }
    } else if (modello) {
      if (searchType === 'containing') {
        console.log('Filtering by modello containing:', modello);
        this.service.findByModelloContaining(modello).pipe(
          catchError(error => {
            console.error('Error filtering by modello containing:', error);
            this.listAuto = [];
            return throwError(error);
          })
        ).subscribe((autos) => {
          console.log('Found autos by modello containing:', autos);
          this.listAuto = Array.isArray(autos) ? autos : [autos];

        });
      } else {
        console.log('Filtering by modello exact:', modello);
        this.service.findByModello(modello).pipe(
          catchError(error => {
            console.error('Error filtering by modello exact:', error);
            this.listAuto = [];
            return throwError(error);
          })
        ).subscribe((autos) => {
          console.log('Found autos by modello exact:', autos);
          this.listAuto = Array.isArray(autos) ? autos : [autos];

        });
      }
    } else if (carburante) {
      console.log('Filtering by carburante:', carburante);
      this.service.findByCarburante(carburante).pipe(
        catchError(error => {
          console.error('Error filtering by carburante:', error);
          this.listAuto = [];
          return throwError(error);
        })
      ).subscribe((autos) => {
        console.log('Found autos by carburante:', autos);
        this.listAuto = Array.isArray(autos) ? autos : [autos];

      });
    } else {
      console.log('No filters applied, loading all');
      this.loadAll();
    }
  }

requestDeleteAuto(id: number) {
  this.confirmDeleteId = id;
}

confirmDelete() {
  if (this.confirmDeleteId === null) return;
  const id = this.confirmDeleteId;
  this.confirmDeleteId = null;
  this.service.delete(id).subscribe(() => {
    this.listAuto = this.listAuto.filter(a => a.id !== id);
    this.showPopup('delete', 'Eliminazione auto completata con successo.');
  });
}

cancelDelete() {
  this.confirmDeleteId = null;
}

  clearFilters() {
    this.listAuto = [];
    this.showAutoList = false;
  }

  ngOnDestroy() {
    this.clearPopupTimer();
  }

  closePopup() {
    this.popupVisible = false;
    this.clearPopupTimer();
  }

  private showPopup(type: 'create' | 'update' | 'delete', message: string) {
    this.popupType = type;
    this.popupMessage = message;
    this.popupVisible = true;
    this.clearPopupTimer();

    this.popupTimer = setTimeout(() => {
      this.popupVisible = false;
    }, 2800);
  }

  private clearPopupTimer() {
    if (this.popupTimer) {
      clearTimeout(this.popupTimer);
      this.popupTimer = null;
    }
  }
}

