import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelComponent } from './parcel-component';

describe('ParcelComponent', () => {
  let component: ParcelComponent;
  let fixture: ComponentFixture<ParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
