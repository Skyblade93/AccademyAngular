import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrdineComponent } from './add-ordine-component';

describe('AddOrdineComponent', () => {
  let component: AddOrdineComponent;
  let fixture: ComponentFixture<AddOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrdineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrdineComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
