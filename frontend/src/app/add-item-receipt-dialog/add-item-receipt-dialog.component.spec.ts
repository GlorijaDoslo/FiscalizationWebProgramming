import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemReceiptDialogComponent } from './add-item-receipt-dialog.component';

describe('AddItemReceiptDialogComponent', () => {
  let component: AddItemReceiptDialogComponent;
  let fixture: ComponentFixture<AddItemReceiptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemReceiptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemReceiptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
