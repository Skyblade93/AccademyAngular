import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoDto } from '../../Dto/AutoDto';
import { AziendaDto } from '../../Dto/AziendaDto';
import { DipendenteDto } from '../../Dto/DipendenteDto';
import { UserDto } from '../../Dto/UserDto';

@Component({
  selector: 'app-add-auto-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-auto-component.html',
  styleUrl: './add-auto-component.css',
})
export class AddAutoComponent {
  auto = input<AutoDto | null>(null);
  carburanteOptions = input<string[]>([]);
  userList = input<UserDto[]>([]);
  aziendaList = input<AziendaDto[]>([]);
  dipendenteList = input<DipendenteDto[]>([]);

  saveAuto = output<AutoDto>();
  cancelForm = output<void>();

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
    aziendaId: new FormControl<number | null>(null),
    dipendenteId: new FormControl<number | null>(null),
  });

  constructor() {
    effect(() => {
      const autoInEdit = this.auto();
      if (autoInEdit && autoInEdit.id) {
        this.autoForm.patchValue({
          modello: autoInEdit.modello,
          marca: autoInEdit.marca,
          targa: autoInEdit.targa,
          carburante: autoInEdit.carburante,
          userId: autoInEdit.user?.id ?? null,
          aziendaId: autoInEdit.azienda?.id ?? null,
          dipendenteId: autoInEdit.dipendente?.id ?? null,
        });
      } else {
        this.resetLocalForm();
      }
    });
  }

  isEditMode() {
    return !!this.auto()?.id;
  }

  submitForm() {
    if (this.autoForm.invalid) {
      return;
    }

    const formValue = this.autoForm.value as {
      modello: string;
      marca: string;
      targa: string;
      carburante: string;
      userId: number | null;
      aziendaId: number | null;
      dipendenteId: number | null;
    };

    const selectedUser = formValue.userId === 0
      ? null
      : this.userList().find((user) => user.id === formValue.userId) ?? null;

    const selectedAzienda = formValue.aziendaId === 0
      ? null
      : this.aziendaList().find((azienda) => azienda.id === formValue.aziendaId) ?? null;

    const selectedDipendente = formValue.dipendenteId === 0
      ? null
      : this.dipendenteList().find((dipendente) => dipendente.id === formValue.dipendenteId) ?? null;

    const autoToSave = new AutoDto(
      formValue.modello,
      formValue.marca,
      formValue.targa,
      formValue.carburante,
      selectedUser,
      selectedAzienda,
      selectedDipendente,
      this.auto()?.id ?? 0
    );

    this.saveAuto.emit(autoToSave);
  }

  clearForm() {
    this.resetLocalForm();
  }

  cancel() {
    this.resetLocalForm();
    this.cancelForm.emit();
  }

  getDipendenteLabel(dipendente: DipendenteDto | null | undefined) {
    if (!dipendente) {
      return 'Nessuno';
    }

    return `${dipendente.nomeDipendente} ${dipendente.cognomeDipendente}`.trim();
  }

  private resetLocalForm() {
    this.autoForm.reset({
      modello: '',
      marca: '',
      targa: '',
      carburante: '',
      userId: null,
      aziendaId: null,
      dipendenteId: null,
    });
  }
}
