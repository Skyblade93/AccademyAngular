import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Azienda } from './azienda';

describe('Azienda', () => {
  let component: Azienda;
  let fixture: ComponentFixture<Azienda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Azienda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Azienda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
