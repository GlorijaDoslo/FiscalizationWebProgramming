import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseReceiptDialogComponent } from './close-receipt-dialog.component';

describe('CloseReceiptDialogComponent', () => {
  let component: CloseReceiptDialogComponent;
  let fixture: ComponentFixture<CloseReceiptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseReceiptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseReceiptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
