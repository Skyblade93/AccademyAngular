import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoDto } from '../Dto/AutoDto';
import { autoService } from '../Service/autoService';
import { userService } from '../Service/userService';
import { UserDto } from '../Dto/UserDto';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-auto-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auto-component.html',
  styleUrls: ['./auto-component.css'],
})
export class AutoComponent implements OnInit {
  service: autoService;
  userSrv: userService;

  listAuto: AutoDto[] = [];
  userList: UserDto[] = [];
  searchResults: AutoDto[] = [];
  carburanteOptions = ['BENZINA', 'DIESEL', 'GPL', 'ELETTRICA', 'IBRIDA'];

  auto: AutoDto = new AutoDto('', '', '', '', null);

  autoForm = new FormGroup({
    modello: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    marca: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    targa: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    carburante: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    userId: new FormControl<number | null>(null),
  });

  searchForm = new FormGroup({
    targa: new FormControl(''),
    marca: new FormControl(''),
    modello: new FormControl(''),
    carburante: new FormControl(''),
  });

filterForm!: FormGroup;


  constructor(service: autoService, userSrv: userService) {
    this.service = service;
    this.userSrv = userSrv;
  }

  ngOnInit() {
      this.filterForm = new FormGroup({
    id: new FormControl<number | null>(null),
    targa: new FormControl(''),
    marca: new FormControl(''),
    modello: new FormControl(''),
    carburante: new FormControl(''),
    searchType: new FormControl(''),
  });
    this.loadAll();
    this.loadUsers();
  }

  loadAll() {
    this.service.getAll().subscribe((autos) => {
      this.listAuto = Array.isArray(autos) ? autos : [autos];
    });
  }

  loadUsers() {
    this.userSrv.getAll().subscribe((users) => {
      this.userList = users;
    });
  }

  ottieniElemento(id: number) {
    if (!id) {
      return;
    }

    this.service.read(id).subscribe((auto) => {
      this.auto = auto;
      this.autoForm.patchValue({
        modello: auto.modello,
        marca: auto.marca,
        targa: auto.targa,
        carburante: auto.carburante,
        userId: auto.user?.id ?? null,
      });
    });
  }

  save() {
    if (this.autoForm.invalid) {
      return;
    }

    const formValue = this.autoForm.value as {
      modello: string;
      marca: string;
      targa: string;
      carburante: string;
      userId: number | null;
    };

    const selectedUser = formValue.userId === 0
      ? null
      : this.userList.find((u) => u.id === formValue.userId) ?? null;

    // Aggiorna l'oggetto auto esistente con i valori del form
    this.auto.modello = formValue.modello;
    this.auto.marca = formValue.marca;
    this.auto.targa = formValue.targa;
    this.auto.carburante = formValue.carburante;
    this.auto.user = selectedUser;

    const request = this.auto.id
      ? this.service.update(this.auto)
      : this.service.insert(this.auto);

    request.subscribe(() => {
      this.loadAll();
      this.resetForm();
    });
  }

  resetForm() {
    this.auto = new AutoDto('', '', '', '', null);
    this.autoForm.reset({
      modello: '',
      marca: '',
      targa: '',
      carburante: '',
      userId: null,
    });
  }

  editAuto(auto: AutoDto) {
    this.auto = auto;
    this.autoForm.patchValue({
      modello: auto.modello,
      marca: auto.marca,
      targa: auto.targa,
      carburante: auto.carburante,
      userId: auto.user?.id ?? null,
    });
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  applyFilters() {
    if (!this.filterForm) {
      console.error('filterForm non inizializzato');
      return;
    }

const filters = this.filterForm.value;

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

  deleteAuto(id: number) {
    if (confirm('Sei sicuro di voler eliminare questa auto?')) {
      this.service.delete(id).subscribe(() => {
        this.listAuto = this.listAuto.filter(a => a.id !== id);
      });
    }
  }

  clearFilters() {
    this.filterForm.reset({
      id: null,
      targa: '',
      marca: '',
      modello: '',
      carburante: '',
      searchType: 'exact',
    });
    this.loadAll();
  }
}

