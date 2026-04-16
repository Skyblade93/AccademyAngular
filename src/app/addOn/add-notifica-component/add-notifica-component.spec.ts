import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotificaComponent } from './add-notifica-component';

describe('AddNotificaComponent', () => {
  let component: AddNotificaComponent;
  let fixture: ComponentFixture<AddNotificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNotificaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNotificaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
