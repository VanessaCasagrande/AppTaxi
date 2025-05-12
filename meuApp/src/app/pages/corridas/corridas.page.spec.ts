import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorridasPage } from './corridas.page';

describe('CorridasPage', () => {
  let component: CorridasPage;
  let fixture: ComponentFixture<CorridasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
