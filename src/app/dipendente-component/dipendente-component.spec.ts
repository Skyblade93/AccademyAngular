import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DipendenteComponent } from './dipendente-component';

describe('Dipendente', () => {
  let component: DipendenteComponent;
  let fixture: ComponentFixture<DipendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DipendenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DipendenteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
