import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDipendenteComponent } from './add-dipendente-component';

describe('AddDipendenteComponent', () => {
  let component: AddDipendenteComponent;
  let fixture: ComponentFixture<AddDipendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDipendenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDipendenteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
