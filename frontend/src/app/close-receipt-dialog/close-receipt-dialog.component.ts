import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/services/company.service';
import { ReceiptService } from 'src/services/receipt.service';
import { TableService } from 'src/services/table.service';
import { Orderer } from '../models/orderer';
import { User } from '../models/user';

@Component({
  selector: 'app-close-receipt-dialog',
  templateUrl: './close-receipt-dialog.component.html',
  styleUrls: ['./close-receipt-dialog.component.css']
})
export class CloseReceiptDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CloseReceiptDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService, private receiptService: ReceiptService, private tableService: TableService) { }

  ngOnInit(): void {
    this.companyService.getCompany(this.data.idCom).subscribe((company1: User)=>{
      this.allOrderers = company1[0].orderers;
      this.company = company1;
      for (let i in this.allOrderers) {
        this.companyService.getCompany(this.allOrderers[i].idCom).subscribe((company: User)=>{
          this.allCompanies.push(company);
        })
      }
    })
  }

  company: User = new User();
  allCompanies: User[] = []
  allOrderers: Orderer[] = [];
  methodOfPayment: string;
  message: string;
  value: number;
  idCard: number;
  change: number;
  slip: string;
  ordererId: number;
  firstname: string;
  lastname: string;

  closeReceipt() {
    let date = new Date();
    // let changedDate = '';
    // let pipe = new DatePipe('en-US');
    // let ChangedFormat = pipe.transform(date, 'dd.MM.YYYY');
    // changedDate = ChangedFormat;
    this.receiptService.updateReceipt(this.data.receipt.idRec, this.data.receipt.totalValue, this.company[0].isPDV, this.methodOfPayment, 
      this.value, this.value - this.data.receipt.totalValue, this.idCard, this.firstname, this.lastname, this.slip, this.ordererId, date,
      this.company[0].comname, this.company[0].idCom, true).subscribe(resp=>{
        if (resp["message"] == "ok") {
          this.tableService.deleteTable(this.data.receipt.tableId).subscribe(resp=>{
            if (resp["message"] == "ok") {
              this.message = "Receipt closed successfully!";
              this.dialogRef.close({event: "Ok"});
            }
            else this.message = "Error!";
          })
        }
      })
  }

  onCancel() {
    this.dialogRef.close({event: "Cancel"});
  }

}
