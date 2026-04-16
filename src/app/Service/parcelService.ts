import { Injectable } from '@angular/core';
import { ParcelDto } from '../Dto/ParcelDto';
import { AbstractService } from './abstract-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class parcelService extends AbstractService<ParcelDto> {
  constructor(http: HttpClient) {
    super(http);
    this.type = 'Parcel';
  }

  findByWeight(weight: number): Observable<ParcelDto> {
    let params = new HttpParams().set('weight', weight);

    return this.http.get<ParcelDto>(this.baseUrl + '/' + this.type + '/FindByWeight', { params });
  }

  findByHeight(height: number): Observable<ParcelDto> {
    let params = new HttpParams().set('height', height);

    return this.http.get<ParcelDto>(this.baseUrl + '/' + this.type + '/FindByHeight', { params });
  }

  findByReceiverName(receiverName: string): Observable<ParcelDto> {
    let params = new HttpParams().set('receiverName', receiverName);

    return this.http.get<ParcelDto>(this.baseUrl + '/' + this.type + '/FindByReceiverName', {
      params,
    });
  }

  findByReceiverSurname(receiverSurname: string): Observable<ParcelDto[]> {
    let params = new HttpParams().set('receiverSurname', receiverSurname);

    return this.http.get<ParcelDto[]>(this.baseUrl + '/' + this.type + '/FindByReceiverSurname', {
      params,
    });
  }

  findBySenderName(senderName: string): Observable<ParcelDto> {
    let params = new HttpParams().set('senderName', senderName);

    return this.http.get<ParcelDto>(this.baseUrl + '/' + this.type + '/FindBySenderName', {
      params,
    });
  }

  findBySenderSurname(senderSurname: string): Observable<ParcelDto> {
    let params = new HttpParams().set('senderSurname', senderSurname);

    return this.http.get<ParcelDto>(this.baseUrl + '/' + this.type + '/FindBySenderSurname', {
      params,
    });
  }
}
