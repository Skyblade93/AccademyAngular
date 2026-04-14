import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drone } from './drone';

describe('Drone', () => {
  let component: Drone;
  let fixture: ComponentFixture<Drone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drone],
    }).compileComponents();

    fixture = TestBed.createComponent(Drone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
