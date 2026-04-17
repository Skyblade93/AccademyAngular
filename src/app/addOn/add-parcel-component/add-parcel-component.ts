import { Component, input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { parcelService } from '../../Service/parcelService';
import { ParcelDto } from '../../Dto/ParcelDto';

@Component({
  selector: 'app-add-parcel-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-parcel-component.html',
  styleUrl: './add-parcel-component.css',
})
export class AddParcelComponent {
  constructor(private service: parcelService) {}

  parcelForm = new FormGroup({
    receiverName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    receiverSurname: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    senderName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    senderSurname: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    weight: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    height: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    width: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    length: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    fragile: new FormControl(false, { nonNullable: true }),
  });

  @Output() parcelAdded = new EventEmitter<ParcelDto>();

  onSubmit(): void {
    if (this.parcelForm.invalid) return;

    const newParcel = new ParcelDto(
      0,
      this.parcelForm.get('receiverName')!.value,
      this.parcelForm.get('receiverSurname')!.value,
      this.parcelForm.get('senderName')!.value,
      this.parcelForm.get('senderSurname')!.value,
      this.parcelForm.get('weight')!.value,
      this.parcelForm.get('height')!.value,
      this.parcelForm.get('width')!.value,
      this.parcelForm.get('length')!.value,
      this.parcelForm.get('fragile')!.value,
    );

    this.service.insert(newParcel).subscribe({
      next: () => {
        this.parcelForm.reset();
        this.parcelAdded.emit(newParcel);
      },
      error: (err: any) => console.error(err),
    });
  }
}
