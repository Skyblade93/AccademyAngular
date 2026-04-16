import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchDipendenteComponent } from './search-dipendente-component';

describe('SearchDipendenteComponent', () => {
  let component: SearchDipendenteComponent;
  let fixture: ComponentFixture<SearchDipendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDipendenteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDipendenteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
