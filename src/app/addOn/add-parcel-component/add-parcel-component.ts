import { ParcelDto } from './../../Dto/ParcelDto';
import { Component, input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { parcelService } from '../../Service/parcelService';

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
    receiverName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    receiverSurname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    senderName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    senderSurname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    weight: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    height: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    width: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    length: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    fragile: new FormControl(false, {
      nonNullable: true,
    }),
  });

  count = input<number>(0);

  @Output() countValue = new EventEmitter<ParcelDto>();

  sendCount(parcelDto: ParcelDto) {
    this.countValue.emit(parcelDto);
  }

  onSubmit(): void {
    if (this.parcelForm.invalid) return;

    const formValue = this.parcelForm.getRawValue();

    const newParcel = new ParcelDto(
      0,
      formValue.receiverName,
      formValue.receiverSurname,
      formValue.senderName,
      formValue.senderSurname,
      formValue.weight,
      formValue.height,
      formValue.width,
      formValue.length,
      formValue.fragile,
    );

    this.service.insert(newParcel).subscribe({
      next: () =>
        this.parcelForm.reset({
          receiverName: '',
          receiverSurname: '',
          senderName: '',
          senderSurname: '',
          weight: 0,
          height: 0,
          width: 0,
          length: 0,
          fragile: false,
        }),
      error: (err: any) => console.error(err),
    });
    newParcel.id = this.count().valueOf() + 1;
    this.sendCount(newParcel);
  }
}
