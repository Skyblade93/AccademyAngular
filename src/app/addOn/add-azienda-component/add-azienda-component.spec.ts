import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAziendaComponent } from './add-azienda-component';

describe('AddAziendaComponent', () => {
  let component: AddAziendaComponent;
  let fixture: ComponentFixture<AddAziendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAziendaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAziendaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
