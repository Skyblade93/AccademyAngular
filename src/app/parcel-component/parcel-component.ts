import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { parcelService } from '../Service/parcelService';
import { ParcelDto } from '../Dto/ParcelDto';
import { signal } from '@angular/core';
import { AddParcelComponent } from '../addOn/add-parcel-component/add-parcel-component';

@Component({
  selector: 'app-parcel-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AddParcelComponent],
  templateUrl: './parcel-component.html',
  styleUrl: './parcel-component.css',
})
export class ParcelComponent implements OnInit {

  service: parcelService;

  ListParcel: ParcelDto[] = [];
  searchResults: ParcelDto[] = [];
  isSearching = false;

  parcel: ParcelDto = new ParcelDto(0,'', '', '', '', 0, 0, 0, 0, false);

  ParcelSignal = signal<ParcelDto[]>([]);
  parcel2: ParcelDto = new ParcelDto(
    0,
    'Nessun',
    'Destinatario',
    'Nessun',
    'Mittente',
    0,
    0,
    0,
    0,
    false,
  );

  isPopupVisible = false;

  ngOnInit() {}

  constructor(service: parcelService) {
    this.service = service;
    service.getAll().subscribe(parcels => {
      this.ListParcel = parcels;
    });
  }

  haveParcel(id: number) {
    this.service.read(id).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  deleteParcel(id: number) {
    this.service.delete(id).subscribe(() => {
      this.ListParcel = this.ListParcel.filter((p) => p.id !== id);
      this.ParcelSignal.set(this.ListParcel);
    });
  }

  findByWeight(weight: number) {
    this.service.findByWeight(weight).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }
  findByHeight(height: number) {
    this.service.findByHeight(height).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  findByReceiverName(receiverName: string) {
    this.service.findByReceiverName(receiverName).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  findByReceiverSurname(receiverSurname: string) {
    this.isSearching = true;
    this.service.findByReceiverSurname(receiverSurname).subscribe({
      next: (parcel) => {
        this.searchResults = Array.isArray(parcel) ? parcel : [parcel];
      },
      error: (_err) => {
        this.isPopupVisible = !this.isPopupVisible;
      },
    });
  }

  findBySenderName(senderName: string) {
    this.service.findBySenderName(senderName).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }

  findBySenderSurname(senderSurname: string) {
    this.service.findBySenderSurname(senderSurname).subscribe((parcel) => {
      this.parcel = parcel;
    });
  }
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  resetSearch() {
    this.isSearching = false;
    this.searchResults = [];
  }

  onParcelAdded(newParcel: ParcelDto) {
    this.service.getAll().subscribe((parcels) => {
      this.ListParcel = parcels;
    });
  }
}
