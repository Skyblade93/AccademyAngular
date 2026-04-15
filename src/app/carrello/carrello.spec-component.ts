import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  CarrelloComponent } from './carrello-component';
import { describe, beforeEach, it } from 'node:test';

describe('CarrelloComponent', () => {
  let component: CarrelloComponent;
  let fixture: ComponentFixture<CarrelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrelloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrelloComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
  });
});
