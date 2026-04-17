import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { parcelService } from '../Service/parcelService';
import { ParcelDto } from '../Dto/ParcelDto';
import { AddParcelComponent } from '../addOn/add-parcel-component/add-parcel-component';

@Component({
  selector: 'app-parcel-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AddParcelComponent],
  templateUrl: './parcel-component.html',
  styleUrl: './parcel-component.css',
})
export class ParcelComponent implements OnInit {

  ListParcel: ParcelDto[] = [];
  searchResults: ParcelDto[] = [];
  isSearching = false;

  parcel: ParcelDto = new ParcelDto(0,'', '', '', '', 0, 0, 0, 0, false);

  ParcelSignal = signal<ParcelDto[]>([]);

  isPopupVisible = false;

  constructor(private service: parcelService) {}

  ngOnInit() {
    this.loadParcels();
  }

  loadParcels() {
    this.service.getAll().subscribe(parcels => {
      this.ListParcel = parcels;
      this.ParcelSignal.set(parcels);
    });
  }

  deleteParcel(id: number) {
    this.service.delete(id).subscribe(() => {
      this.ListParcel = this.ListParcel.filter(p => p.id !== id);
      this.ParcelSignal.set(this.ListParcel);
    });
  }

  findByReceiverSurname(receiverSurname: string) {
    if (!receiverSurname.trim()) return;

    this.isSearching = true;

    this.service.findByReceiverSurname(receiverSurname).subscribe({
      next: (parcel) => {
        this.searchResults = Array.isArray(parcel) ? parcel : [parcel];
      },
      error: () => {
        this.isPopupVisible = true;
      }
    });
  }

  resetSearch() {
    this.isSearching = false;
    this.searchResults = [];
  }

  togglePopup() {
    this.isPopupVisible = false;
  }

  onParcelAdded(_: ParcelDto) {
    this.loadParcels();
  }
}
