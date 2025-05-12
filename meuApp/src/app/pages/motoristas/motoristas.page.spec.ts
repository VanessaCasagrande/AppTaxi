import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotoristasPage } from './motoristas.page';

describe('MotoristasPage', () => {
  let component: MotoristasPage;
  let fixture: ComponentFixture<MotoristasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoristasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
