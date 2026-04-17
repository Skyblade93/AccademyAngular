import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneComponent } from './drone-component';

describe('Drone', () => {
  let component: DroneComponent;
  let fixture: ComponentFixture<DroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DroneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DroneComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
