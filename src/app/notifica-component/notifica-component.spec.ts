import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notifica } from './notifica-component';

describe('Notifica', () => {
  let component: Notifica;
  let fixture: ComponentFixture<Notifica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notifica],
    }).compileComponents();

    fixture = TestBed.createComponent(Notifica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
