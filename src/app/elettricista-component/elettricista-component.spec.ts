import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElettricistaComponent } from './elettricista-component';

describe('ElettricistaComponent', () => {
  let component: ElettricistaComponent;
  let fixture: ComponentFixture<ElettricistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElettricistaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ElettricistaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});