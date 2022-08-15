import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChpassComponent } from './chpass.component';

describe('ChpassComponent', () => {
  let component: ChpassComponent;
  let fixture: ComponentFixture<ChpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChpassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
