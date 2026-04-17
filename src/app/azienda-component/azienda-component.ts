import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { AziendaDto } from '../Dto/AziendaDto';
import { aziendaService } from '../Service/aziendaService';
import { UserDto } from '../Dto/UserDto';
import { AutoDto } from '../Dto/AutoDto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddAziendaComponent } from '../addOn/add-azienda-component/add-azienda-component';

@Component({
  selector: 'app-azienda',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AddAziendaComponent],
  templateUrl: './azienda-component.html',
  styleUrl: './azienda-component.css',
})
export class AziendaComponent implements OnInit {
  /* 🔥 SERVICE */
  private service = inject(aziendaService);

  /* 🔥 STATE (SIGNALS) */

  aziende = signal<AziendaDto[]>([]);

  azienda = signal<AziendaDto>(
    new AziendaDto('', '', 0, new UserDto('', '', 0), new AutoDto('', '', '', '', null, null)),
  );

  showErrorPopup = signal(false);
  showEditPopup = signal(false);
  showAddAzienda = signal(false);
  showResultPopup = signal(false);
  showDeletePopup = signal(false);

  page = signal(0);
  size = signal(5);
  totalPages = signal(0);

  /* 🔥 COMPUTED */

  sortedAziende = computed(() => [...this.aziende()].sort((a, b) => a.id - b.id));

  count = computed(() => {
    const list = this.aziende();
    return list.length ? Math.max(...list.map((a) => a.id)) : 0;
  });

  /* 🔥 FORM */

  aziendaForm = new FormGroup({
    id: new FormControl(''),
    nomeAzienda: new FormControl(''),
    descrizione: new FormControl(''),
    titolareId: new FormControl(''),
  });

  /* ================= INIT ================= */

  ngOnInit() {
    this.loadPage();
  }

  /* ================= LOAD ================= */

  loadPage() {
    this.service.getPage(this.page(), this.size()).subscribe((res) => {
      this.aziende.set(res.content);

      this.totalPages.set(res.totalPages);
    });
  }

  canGoNext = computed(() => this.page() < this.totalPages() - 1);

  canGoPrev = computed(() => this.page() > 0);

  next() {
    if (!this.canGoNext()) return;
    this.page.update((p) => p + 1);
    this.loadPage();
  }

  prev() {
    if (!this.canGoPrev()) return;
    this.page.update((p) => p - 1);
    this.loadPage();
  }

  /* ================= CRUD ================= */

  ottieniAzienda(id: number) {
    this.service.read(id).subscribe({
      next: (azienda) => {
        this.azienda.set(azienda);
        this.showResultPopup.set(true);
      },
      error: () => {
        this.showErrorPopup.set(true);
      },
    });
  }

  salvaModifica() {
    this.service.update(this.azienda()).subscribe({
      next: () => {
        this.closeEditPopup();
        this.loadPage();
      },
    });
  }

deleteAzienda(id: number) {
  this.service.delete(id).subscribe({
    next: () => {
      this.showDeletePopup.set(false);
      this.closeResultPopup();
      this.loadPage();
    },
    error: (err) => {
      console.error(err);
      this.showErrorPopup.set(true);
    },
  });
}

  /* ================= SEARCH ================= */

  cerca() {
    const id = this.aziendaForm.get('id')?.value;
    const nomeAzienda = this.aziendaForm.get('nomeAzienda')?.value?.trim();

    const descrizione = this.aziendaForm.get('descrizione')?.value?.trim();

    const titolareId = this.aziendaForm.get('titolareId')?.value;

    if (id) {
      this.service.read(Number(id)).subscribe({
        next: (azienda) => {
          let risultato: AziendaDto[] = [azienda];

          if (nomeAzienda) {
            risultato = risultato.filter((a) =>
              a.nomeAzienda.toLowerCase().includes(nomeAzienda.toLowerCase()),
            );
          }

          if (descrizione) {
            risultato = risultato.filter((a) =>
              a.descrizioneAzienda.toLowerCase().includes(descrizione.toLowerCase()),
            );
          }

          if (titolareId) {
            risultato = risultato.filter((a) => a.titolare.id === Number(titolareId));
          }

          if (risultato.length === 0) {
            this.aziende.set([]);
            this.showErrorPopup.set(true);
            return;
          }

          this.aziende.set(risultato);
        },

        error: () => {
          this.aziende.set([]);
          this.showErrorPopup.set(true);
        },
      });

      return;
    }

    this.service.getAll().subscribe((lista) => {
      let risultato = lista;

      if (nomeAzienda) {
        risultato = risultato.filter((a) =>
          a.nomeAzienda.toLowerCase().includes(nomeAzienda.toLowerCase()),
        );
      }

      if (descrizione) {
        risultato = risultato.filter((a) =>
          a.descrizioneAzienda.toLowerCase().includes(descrizione.toLowerCase()),
        );
      }

      if (titolareId) {
        risultato = risultato.filter((a) => a.titolare.id === Number(titolareId));
      }

      if (risultato.length === 0) {
        this.aziende.set([]);
        this.showErrorPopup.set(true);
        return;
      }

      this.aziende.set(risultato);
    });
  }

  resetRicerca() {
    this.aziendaForm.reset();
    this.page.set(0);
    this.loadPage();
  }

  /* ================= SORT ================= */

  ordinaPerId() {
    this.aziende.update((list) => [...list].sort((a, b) => a.id - b.id));
  }

  ordinaPerIniziale() {
    this.aziende.update((list) =>
      [...list].sort((a, b) =>
        a.nomeAzienda.charAt(0).toLowerCase().localeCompare(b.nomeAzienda.charAt(0).toLowerCase()),
      ),
    );
  }

  /* ================= UI ================= */

  closeErrorPopup() {
    this.showErrorPopup.set(false);
  }

  openEditPopup() {
    this.showEditPopup.set(true);
  }

  closeEditPopup() {
    this.showEditPopup.set(false);
  }

  toggleAddAzienda() {
    this.showAddAzienda.update((v) => !v);
  }

  closeResultPopup() {
    this.showResultPopup.set(false);
  }

  onAziendaCreated(azienda: AziendaDto) {
    this.page.set(0);

    this.loadPage();
  }

  openDeletePopup() {
    this.showDeletePopup.set(true);
  }

  closeDeletePopup() {
    this.showDeletePopup.set(false);
  }
}
