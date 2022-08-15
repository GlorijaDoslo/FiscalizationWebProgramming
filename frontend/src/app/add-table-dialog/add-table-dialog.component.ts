import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Table } from '../models/table';

@Component({
  selector: 'app-add-table-dialog',
  templateUrl: './add-table-dialog.component.html',
  styleUrls: ['./add-table-dialog.component.css']
})
export class AddTableDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTableDialogComponent>) { }

  ngOnInit(): void {
    this.shape = "circle";
  }

  shape: string;
  radius: number;
  width: number;
  length: number;
  message: string;
  
  addTable() {
    if (this.shape == "circle") {
      if (this.radius <= 0 || this.radius > 100) this.message = "Value of radius is bad!";
      else {
        this.message = "Circle added successfully!"; 
        this.dialogRef.close({data: {shape: this.shape, radius: this.radius}})
      } 
    } 
    else {  // if it is rectangle
      if (this.width <= 0 || this.width > 100) this.message = "Value of width is bad!";
      else if (this.length <= 0 || this.length > 100) this.message = "Value of length is bad!";
      else {
        this.message = "Rectangle added successfully!";
        this.dialogRef.close({data: {shape: this.shape, width: this.width, length: this.length}})
      }
      
    }
    
  }

  onCancel(): void {
    this.dialogRef.close({event:'Cancel'});
  }

}
